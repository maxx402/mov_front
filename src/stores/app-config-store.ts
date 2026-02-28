import { makeAutoObservable, runInAction } from "mobx";
import type { IAppConfigRepository } from "@/domain/repositories/app-config-repository";
import type { AppConfig } from "@/domain/entities/app-config";

export class AppConfigStore {
  appConfig: AppConfig | null = null;
  isLoading = false;

  constructor(private readonly appConfigRepository: IAppConfigRepository) {
    makeAutoObservable(this);
  }

  get marqueeTexts(): string[] {
    return [...(this.appConfig?.marqueeTexts ?? [])];
  }

  get hasMarqueeTexts(): boolean {
    return this.marqueeTexts.length > 0;
  }

  async loadAppConfig(): Promise<void> {
    this.isLoading = true;
    const result = await this.appConfigRepository.getAppConfig();
    runInAction(() => {
      this.isLoading = false;
      result.fold(
        () => {},
        (config) => { this.appConfig = config; },
      );
    });
  }
}
