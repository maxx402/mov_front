import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchRepositoryImpl } from "../search-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  SearchDocument: { kind: "Document" },
  SearchType: { Movie: "MOVIE" },
  HotKeywordsDocument: { kind: "Document" },
  MySearchHistoriesDocument: { kind: "Document" },
  AddSearchHistoryDocument: { kind: "Document" },
  RemoveSearchHistoryDocument: { kind: "Document" },
  ClearSearchHistoriesDocument: { kind: "Document" },
}));

vi.mock("@/data/mappers/movie-mapper", () => ({
  mapMovieListItem: (d: any) => ({ id: d.id }),
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

describe("SearchRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: SearchRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new SearchRepositoryImpl(client);
  });

  describe("searchMovies", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { search: { movies: [{ id: "1" }], paginatorInfo: { currentPage: 1, hasMorePages: false, total: 1 } } },
      });
      const result = await repo.searchMovies({ keyword: "test" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.searchMovies({ keyword: "test" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getHotKeywords", () => {
    it("returns keywords", async () => {
      client.query.mockResolvedValue({
        data: { hotKeywords: [{ id: "1", keyword: "hot", type: "movie" }] },
      });
      const result = await repo.getHotKeywords();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getHotKeywords();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getSearchHistory", () => {
    it("returns histories", async () => {
      client.query.mockResolvedValue({
        data: { mySearchHistories: [{ id: "1", keyword: "test", created_at: "2024-01-01" }] },
      });
      const result = await repo.getSearchHistory();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getSearchHistory();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("addSearchHistory", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({
        data: { addSearchHistory: { id: "1", keyword: "test", created_at: "2024-01-01" } },
      });
      const result = await repo.addSearchHistory("test");
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.addSearchHistory("test");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("removeSearchHistory", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.removeSearchHistory("1");
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.removeSearchHistory("1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("clearSearchHistory", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.clearSearchHistory();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.clearSearchHistory();
      expect(result.isFailure).toBe(true);
    });
  });
});
