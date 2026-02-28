import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IAdRepository } from "@/domain/repositories/ad-repository";
import type { Ad, AdSlot, Advertisement, AdvertisementType } from "@/domain/entities/ad";
import { AdvertisementsDocument } from "@/data/graphql/__generated__/graphql";

function mapAdvertisement(data: any): Advertisement {
  return {
    id: data.id,
    name: data.name ?? undefined,
    image: data.image ?? undefined,
    link: data.link ?? undefined,
    type: data.type as AdvertisementType,
  };
}

export class AdRepositoryImpl implements IAdRepository {
  constructor(private readonly client: ApolloClient) {}

  async getAds(_slot: string): Promise<Result<Ad[]>> {
    // ads/adSlots queries were removed from schema
    return Result.success([]);
  }

  async getAdSlots(): Promise<Result<AdSlot[]>> {
    // ads/adSlots queries were removed from schema
    return Result.success([]);
  }

  async getAdvertisements(type?: AdvertisementType): Promise<Result<Advertisement[]>> {
    try {
      const { data } = await this.client.query({
        query: AdvertisementsDocument,
        variables: { type: type as any },
      });
      return Result.success(data!.advertisements.map(mapAdvertisement));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async recordAdImpression(_adId: string): Promise<Result<boolean>> {
    // recordAdImpression mutation was removed from schema
    return Result.success(true);
  }

  async recordAdClick(_adId: string): Promise<Result<boolean>> {
    // recordAdClick mutation was removed from schema
    return Result.success(true);
  }
}
