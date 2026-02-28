import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IAppConfigRepository } from "@/domain/repositories/app-config-repository";
import type { AppConfig, CheckUpdateResult } from "@/domain/entities/app-config";
import {
  SettingsDocument,
  CheckUpdateDocument,
  MarqueeNoticesDocument,
} from "@/data/graphql/__generated__/graphql";

export class AppConfigRepositoryImpl implements IAppConfigRepository {
  constructor(private readonly client: ApolloClient) {}

  async getAppConfig(): Promise<Result<AppConfig>> {
    try {
      const [settingsResult, marqueeResult] = await Promise.all([
        this.client.query({ query: SettingsDocument }),
        this.client.query({ query: MarqueeNoticesDocument }),
      ]);
      const settings = settingsResult.data!.settings ?? [];
      const marqueeTexts = marqueeResult.data!.marqueeNotices ?? [];

      const getValue = (key: string): string | undefined => {
        const s = settings.find((s: any) => s.key === key);
        return s?.value ?? undefined;
      };

      return Result.success({
        appName: getValue("app_name"),
        appLogo: getValue("app_logo"),
        customerService: getValue("customer_service"),
        userAgreementUrl: getValue("user_agreement_url"),
        privacyPolicyUrl: getValue("privacy_policy_url"),
        aboutUsUrl: getValue("about_us_url"),
        defaultSearchKeyword: getValue("default_search_keyword"),
        splashImageUrl: getValue("splash_image_url"),
        marqueeTexts: marqueeTexts as string[],
        shareLink: getValue("share_link"),
        shareText: getValue("share_text"),
        adConfig: {
          enabled: getValue("ad_enabled") === "1",
          splashDuration: parseInt(getValue("ad_splash_duration") ?? "5"),
          prerollAdUrl: getValue("ad_preroll_url"),
          interstitialInterval: parseInt(getValue("ad_interstitial_interval") ?? "10"),
        },
        website: getValue("website"),
        officialTelegram: getValue("official_telegram"),
        officialBizTelegram: getValue("official_biz_telegram"),
        officialBizTelegramLink: getValue("official_biz_telegram_link"),
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async checkUpdate(): Promise<Result<CheckUpdateResult>> {
    try {
      const { data } = await this.client.query({ query: CheckUpdateDocument });
      const result = data!.checkUpdate;
      return Result.success({
        hasUpdate: result.has_update,
        forceUpdate: result.force_update,
        latestVersion: result.latest_version
          ? {
              title: result.latest_version.title ?? "",
              description: result.latest_version.description ?? undefined,
              downloadUrl: result.latest_version.download_url ?? undefined,
              fileSize: result.latest_version.file_size ?? undefined,
              createdAt: result.latest_version.created_at ?? undefined,
            }
          : undefined,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
