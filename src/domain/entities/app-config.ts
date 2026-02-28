import type { AdConfig } from "./ad";

export interface AppConfig {
  readonly appName?: string;
  readonly appLogo?: string;
  readonly customerService?: string;
  readonly userAgreementUrl?: string;
  readonly privacyPolicyUrl?: string;
  readonly aboutUsUrl?: string;
  readonly defaultSearchKeyword?: string;
  readonly splashImageUrl?: string;
  readonly marqueeTexts: readonly string[];
  readonly shareLink?: string;
  readonly shareText?: string;
  readonly adConfig?: AdConfig;
  readonly website?: string;
  readonly officialTelegram?: string;
  readonly officialBizTelegram?: string;
  readonly officialBizTelegramLink?: string;
}

export interface AppVersion {
  readonly title: string;
  readonly description?: string;
  readonly downloadUrl?: string;
  readonly fileSize?: number;
  readonly createdAt?: string;
}

export interface CheckUpdateResult {
  readonly hasUpdate: boolean;
  readonly forceUpdate: boolean;
  readonly latestVersion?: AppVersion;
}
