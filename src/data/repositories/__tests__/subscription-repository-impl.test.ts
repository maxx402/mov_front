import { describe, it, expect, vi, beforeEach } from "vitest";
import { SubscriptionRepositoryImpl } from "../subscription-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MySubscriptionsDocument: { kind: "Document" },
  AddSubscriptionDocument: { kind: "Document" },
  RemoveSubscriptionDocument: { kind: "Document" },
  RemoveSubscriptionsDocument: { kind: "Document" },
  UpdateSubscriptionDocument: { kind: "Document" },
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

describe("SubscriptionRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: SubscriptionRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new SubscriptionRepositoryImpl(client);
  });

  describe("getSubscriptions", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { mySubscriptions: { data: [{ id: "1", created_at: "2024-01-01", movie: { id: "m1" } }], paginatorInfo: {} } } });
      const result = await repo.getSubscriptions();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getSubscriptions();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("addSubscription", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: { addSubscription: { id: "1", movie_id: "m1", created_at: "2024-01-01" } } });
      const result = await repo.addSubscription({ movieId: "m1" });
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("removeSubscription", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.removeSubscription("m1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("removeSubscriptions", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.removeSubscriptions(["m1"]);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("updateSubscription", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: { updateSubscription: { id: "1", movie_id: "m1", created_at: "2024-01-01", notify_update: false } } });
      const result = await repo.updateSubscription({ movieId: "m1", notifyUpdate: false });
      expect(result.isSuccess).toBe(true);
    });
  });
});
