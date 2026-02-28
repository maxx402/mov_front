import { describe, it, expect, vi, beforeEach } from "vitest";
import { GameRepositoryImpl } from "../game-repository-impl";
import { GameCategory } from "@/domain/entities/game";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  GameBannersDocument: { kind: "Document" },
  GameCategoriesDocument: { kind: "Document" },
  GamesDocument: { kind: "Document" },
}));

vi.mock("@/data/mappers/category-mapper", () => ({
  mapBanner: (d: any) => ({ id: d.id, cover: d.cover }),
}));

vi.mock("@/data/mappers/paginator-mapper", () => ({
  mapPaginatedList: (d: any, fn: any) => ({
    items: d.data.map(fn),
    paginator: { currentPage: 1, lastPage: 1, hasMorePages: false, total: d.data.length },
  }),
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("GameRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: GameRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new GameRepositoryImpl(client);
  });

  describe("getBanners", () => {
    it("returns banners", async () => {
      client.query.mockResolvedValue({ data: { banners: [{ id: "1", cover: "img.jpg" }] } });
      const result = await repo.getBanners();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getBanners();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getCategories", () => {
    it("returns categories", async () => {
      client.query.mockResolvedValue({ data: { gameCategories: [{ category: "hotRecommend", name: "Hot" }] } });
      const result = await repo.getCategories();
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("getGames", () => {
    it("returns games", async () => {
      client.query.mockResolvedValue({ data: { games: { data: [{ id: "1", title: "G", image: "img.jpg", link: "http://g.com" }], paginatorInfo: {} } } });
      const result = await repo.getGames({ category: GameCategory.HotRecommend });
      expect(result.isSuccess).toBe(true);
    });
  });
});
