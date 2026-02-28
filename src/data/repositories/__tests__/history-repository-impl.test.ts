import { describe, it, expect, vi, beforeEach } from "vitest";
import { HistoryRepositoryImpl } from "../history-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MyWatchHistoriesDocument: { kind: "Document" },
  AddWatchHistoryDocument: { kind: "Document" },
  RemoveWatchHistoriesDocument: { kind: "Document" },
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

describe("HistoryRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: HistoryRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new HistoryRepositoryImpl(client);
  });

  describe("getWatchHistories", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { myWatchHistories: { data: [{ id: "1", watched_at: "2024-01-01", movie: { id: "m1" } }], paginatorInfo: {} } } });
      const result = await repo.getWatchHistories();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getWatchHistories();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("addWatchHistory", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: { addWatchHistory: { id: "1", watched_at: "2024-01-01", movie: { id: "m1" } } } });
      const result = await repo.addWatchHistory({ movieId: "m1", episodeId: "e1", progress: 100, duration: 200 });
      expect(result.isSuccess).toBe(true);
    });

    it("returns null when no data", async () => {
      client.mutate.mockResolvedValue({ data: { addWatchHistory: null } });
      const result = await repo.addWatchHistory({ movieId: "m1", episodeId: "e1", progress: 0, duration: 0 });
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBeNull();
    });
  });

  describe("removeWatchHistories", () => {
    it("returns count", async () => {
      client.mutate.mockResolvedValue({ data: { removeWatchHistories: 3 } });
      const result = await repo.removeWatchHistories(["m1", "m2", "m3"]);
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(3);
    });
  });
});
