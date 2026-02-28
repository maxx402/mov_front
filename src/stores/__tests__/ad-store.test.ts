import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { AdStore } from "../ad-store";
import { AdvertisementType } from "@/domain/entities/ad";

function createMockAdRepo() {
  return { getAds: vi.fn(), getAdSlots: vi.fn(), getAdvertisements: vi.fn(), recordAdImpression: vi.fn(), recordAdClick: vi.fn() };
}

describe("AdStore", () => {
  let repo: ReturnType<typeof createMockAdRepo>;
  let store: AdStore;

  beforeEach(() => {
    repo = createMockAdRepo();
    store = new AdStore(repo);
  });

  describe("init", () => {
    it("loads advertisements", async () => {
      repo.getAdvertisements.mockResolvedValue(Result.success([
        { id: "1", type: AdvertisementType.Banner, image: "img.jpg" },
        { id: "2", type: AdvertisementType.PreRoll, image: "pre.jpg" },
      ]));
      await store.init();
      expect(store.bannerAds.length).toBe(1);
      expect(store.preRollAds.length).toBe(1);
    });

    it("does not reload if already loaded", async () => {
      repo.getAdvertisements.mockResolvedValue(Result.success([]));
      await store.init();
      await store.init();
      expect(repo.getAdvertisements).toHaveBeenCalledTimes(1);
    });
  });

  describe("getBannerAd", () => {
    it("returns undefined when no ads", () => {
      expect(store.getBannerAd(0)).toBeUndefined();
    });

    it("returns ad by index with wraparound", async () => {
      repo.getAdvertisements.mockResolvedValue(Result.success([
        { id: "1", type: AdvertisementType.Banner },
        { id: "2", type: AdvertisementType.Banner },
      ]));
      await store.init();
      expect(store.getBannerAd(0)!.id).toBe("1");
      expect(store.getBannerAd(2)!.id).toBe("1");
    });
  });

  describe("clearCache", () => {
    it("clears ads", async () => {
      repo.getAdvertisements.mockResolvedValue(Result.success([{ id: "1", type: AdvertisementType.Banner }]));
      await store.init();
      store.clearCache();
      expect(store.bannerAds.length).toBe(0);
    });
  });

  describe("hasBannerAds / hasPreRollAds", () => {
    it("returns false when no ads", () => {
      expect(store.hasBannerAds).toBe(false);
      expect(store.hasPreRollAds).toBe(false);
    });
  });
});
