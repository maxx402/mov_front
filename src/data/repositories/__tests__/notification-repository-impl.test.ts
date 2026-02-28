import { describe, it, expect, vi, beforeEach } from "vitest";
import { NotificationRepositoryImpl } from "../notification-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MyNotificationsDocument: { kind: "Document" },
  UnreadNotificationCountDocument: { kind: "Document" },
  MarkNotificationAsReadDocument: { kind: "Document" },
  MarkAllNotificationsAsReadDocument: { kind: "Document" },
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

describe("NotificationRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: NotificationRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new NotificationRepositoryImpl(client);
  });

  describe("getNotifications", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { myNotifications: { data: [{ id: "1", created_at: "2024-01-01" }], paginatorInfo: {} } } });
      const result = await repo.getNotifications();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getNotifications();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getUnreadCount", () => {
    it("returns count", async () => {
      client.query.mockResolvedValue({ data: { unreadNotificationCount: 5 } });
      const result = await repo.getUnreadCount();
      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(5);
    });
  });

  describe("markAsRead", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.markAsRead("1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("markAllAsRead", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.markAllAsRead();
      expect(result.isSuccess).toBe(true);
    });
  });
});
