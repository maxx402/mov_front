import { makeAutoObservable, runInAction } from "mobx";
import type { IAdRepository } from "@/domain/repositories/ad-repository";
import type { Advertisement } from "@/domain/entities/ad";
import { AdvertisementType } from "@/domain/entities/ad";

export class AdStore {
  private allAdsCache: Advertisement[] | null = null;
  private isLoadingAds = false;

  constructor(private readonly adRepository: IAdRepository) {
    makeAutoObservable(this);
  }

  get bannerAds(): Advertisement[] {
    return this.allAdsCache?.filter((a) => a.type === AdvertisementType.Banner) ?? [];
  }

  get preRollAds(): Advertisement[] {
    return this.allAdsCache?.filter((a) => a.type === AdvertisementType.PreRoll) ?? [];
  }

  get hasBannerAds(): boolean {
    return this.bannerAds.length > 0;
  }

  get hasPreRollAds(): boolean {
    return this.preRollAds.length > 0;
  }

  async init(): Promise<void> {
    if (this.allAdsCache || this.isLoadingAds) return;
    this.isLoadingAds = true;
    const result = await this.adRepository.getAdvertisements();
    runInAction(() => {
      this.isLoadingAds = false;
      result.fold(
        () => {},
        (ads) => { this.allAdsCache = ads; },
      );
    });
  }

  getBannerAd(index: number): Advertisement | undefined {
    const ads = this.bannerAds;
    if (ads.length === 0) return undefined;
    return ads[index % ads.length];
  }

  getPreRollAd(): Advertisement | undefined {
    const ads = this.preRollAds;
    if (ads.length === 0) return undefined;
    return ads[Math.floor(Math.random() * ads.length)];
  }

  clearCache(): void {
    this.allAdsCache = null;
  }
}
