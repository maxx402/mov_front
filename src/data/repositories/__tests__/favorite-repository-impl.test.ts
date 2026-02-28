import { describe, it, expect, vi, beforeEach } from "vitest";
import { FavoriteRepositoryImpl } from "../favorite-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MyFavoritesDocument: { kind: "Document" },
  AddFavoriteDocument: { kind: "Document" },
  RemoveFavoriteDocument: { kind: "Document" },
  RemoveFavoritesDocument: { kind: "Document" },
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

describe("FavoriteRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: FavoriteRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new FavoriteRepositoryImpl(client);
  });

  describe("getFavorites", () => {
    it("returns paginated favorites", async () => {
      client.query.mockResolvedValue({ data: { myFavorites: { data: [{ id: "1", created_at: "2024-01-01", movie: { id: "m1", title: "M" } }], paginatorInfo: {} } } });
      const result = await repo.getFavorites();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getFavorites();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("addFavorite", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: { addFavorite: { id: "1", movie_id: "m1", created_at: "2024-01-01" } } });
      const result = await repo.addFavorite("m1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("removeFavorite", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.removeFavorite("m1");
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(true);
    });
  });

  describe("removeFavorites", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.removeFavorites(["m1", "m2"]);
      expect(result.isSuccess).toBe(true);
    });
  });
});
