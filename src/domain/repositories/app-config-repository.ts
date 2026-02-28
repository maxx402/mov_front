import type { Result } from "@/core/errors/result";
import type { AppConfig, CheckUpdateResult } from "@/domain/entities/app-config";

export interface IAppConfigRepository {
  getAppConfig(): Promise<Result<AppConfig>>;
  checkUpdate(): Promise<Result<CheckUpdateResult>>;
}
