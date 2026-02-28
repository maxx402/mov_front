import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopicRepositoryImpl } from "../topic-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  TopicGroupsDocument: { kind: "Document" },
  TopicsDocument: { kind: "Document" },
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

describe("TopicRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: TopicRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new TopicRepositoryImpl(client);
  });

  describe("getTopicGroups", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { topicGroups: { data: [{ id: "1", name: "G", topics: [] }], paginatorInfo: {} } } });
      const result = await repo.getTopicGroups();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getTopicGroups();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getTopics", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { topics: { data: [{ id: "1", name: "T" }], paginatorInfo: {} } } });
      const result = await repo.getTopics();
      expect(result.isSuccess).toBe(true);
    });
  });
});
