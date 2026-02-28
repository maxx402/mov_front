import { describe, it, expect, vi, beforeEach } from "vitest";
import { AdRepositoryImpl } from "../ad-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  AdvertisementsDocument: { kind: "Document" },
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("AdRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: AdRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new AdRepositoryImpl(client);
  });

  describe("getAds", () => {
    it("returns empty array (schema removed)", async () => {
      const result = await repo.getAds("slot1");
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual([]);
    });
  });

  describe("getAdSlots", () => {
    it("returns empty array (schema removed)", async () => {
      const result = await repo.getAdSlots();
      expect(result.isSuccess).toBe(true);
      expect(result.value).toEqual([]);
    });
  });

  describe("getAdvertisements", () => {
    it("returns advertisements", async () => {
      client.query.mockResolvedValue({ data: { advertisements: [{ id: "1", type: "BANNER" }] } });
      const result = await repo.getAdvertisements();
      expect(result.isSuccess).toBe(true);
      expect(result.value!.length).toBe(1);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getAdvertisements();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("recordAdImpression", () => {
    it("returns true (stub)", async () => {
      const result = await repo.recordAdImpression("1");
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(true);
    });
  });

  describe("recordAdClick", () => {
    it("returns true (stub)", async () => {
      const result = await repo.recordAdClick("1");
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(true);
    });
  });
});
