import { describe, it, expect, vi, beforeEach } from "vitest";
import { ActorRepositoryImpl } from "../actor-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  ActorDocument: { kind: "Document" },
  ActorsDocument: { kind: "Document" },
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

describe("ActorRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: ActorRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new ActorRepositoryImpl(client);
  });

  describe("getActor", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({ data: { actor: { id: "1", name: "Actor" } } });
      const result = await repo.getActor("1");
      expect(result.isSuccess).toBe(true);
      expect(result.value!.name).toBe("Actor");
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getActor("1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getActors", () => {
    it("returns paginated actors", async () => {
      client.query.mockResolvedValue({ data: { actors: { data: [{ id: "1", name: "A" }], paginatorInfo: {} } } });
      const result = await repo.getActors();
      expect(result.isSuccess).toBe(true);
    });
  });
});
