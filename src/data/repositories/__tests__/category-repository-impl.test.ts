import { describe, it, expect, vi, beforeEach } from "vitest";
import { CategoryRepositoryImpl } from "../category-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  CategoriesDocument: { kind: "Document" },
  CategoryHomeDocument: { kind: "Document" },
  ChannelsByCategoryDocument: { kind: "Document" },
}));

vi.mock("@/data/mappers/category-mapper", () => ({
  mapCategory: (d: any) => ({ id: d.id, name: d.name }),
  mapCategoryHome: (d: any) => d,
  mapChannel: (d: any) => d,
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

describe("CategoryRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: CategoryRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new CategoryRepositoryImpl(client);
  });

  describe("getCategories", () => {
    it("returns categories", async () => {
      client.query.mockResolvedValue({ data: { categories: [{ id: "1", name: "Action" }] } });
      const result = await repo.getCategories();
      expect(result.isSuccess).toBe(true);
      expect(result.value!.length).toBe(1);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getCategories();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getCategoryHome", () => {
    it("returns category home", async () => {
      client.query.mockResolvedValue({ data: { categoryHome: { banners: [], grids: [], channels: [], hotMovies: [] } } });
      const result = await repo.getCategoryHome("1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("getChannelsByCategory", () => {
    it("returns channels", async () => {
      client.query.mockResolvedValue({ data: { channelsByCategory: { data: [], paginatorInfo: {} } } });
      const result = await repo.getChannelsByCategory({ categoryId: "1" });
      expect(result.isSuccess).toBe(true);
    });
  });
});
