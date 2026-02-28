import type { Result } from "@/core/errors/result";
import type { Ad, AdSlot, Advertisement, AdvertisementType } from "@/domain/entities/ad";

export interface IAdRepository {
  getAds(slot: string): Promise<Result<Ad[]>>;
  getAdSlots(): Promise<Result<AdSlot[]>>;
  getAdvertisements(type?: AdvertisementType): Promise<Result<Advertisement[]>>;
  recordAdImpression(adId: string): Promise<Result<boolean>>;
  recordAdClick(adId: string): Promise<Result<boolean>>;
}
