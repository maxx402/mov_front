import { describe, it, expect, vi, beforeEach } from "vitest";
import { MovieRequestRepositoryImpl } from "../movie-request-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  CreateMovieRequestDocument: { kind: "Document" },
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("MovieRequestRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: MovieRequestRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new MovieRequestRepositoryImpl(client);
  });

  describe("createMovieRequest", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({
        data: { createMovieRequest: { id: "1", content: "want movie X", status: 0, created_at: "2024-01-01" } },
      });
      const result = await repo.createMovieRequest("want movie X");
      expect(result.isSuccess).toBe(true);
      expect(result.value!.content).toBe("want movie X");
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.createMovieRequest("test");
      expect(result.isFailure).toBe(true);
    });
  });
});
