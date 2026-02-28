import { describe, it, expect, vi, beforeEach } from "vitest";
import { CommentRepositoryImpl } from "../comment-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MovieCommentsDocument: { kind: "Document" },
  CommentRepliesDocument: { kind: "Document" },
  CreateMovieCommentDocument: { kind: "Document" },
  DeleteCommentDocument: { kind: "Document" },
  LikeCommentDocument: { kind: "Document" },
  UnlikeCommentDocument: { kind: "Document" },
}));

vi.mock("@/data/mappers/comment-mapper", () => ({
  mapComment: (d: any) => ({ id: d.id, content: d.content }),
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

describe("CommentRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: CommentRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new CommentRepositoryImpl(client);
  });

  describe("getComments", () => {
    it("returns movie comments when no parentId", async () => {
      client.query.mockResolvedValue({ data: { movieComments: { data: [{ id: "1", content: "hi" }], paginatorInfo: {} } } });
      const result = await repo.getComments({ targetType: "movie", targetId: "m1" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns replies when parentId provided", async () => {
      client.query.mockResolvedValue({ data: { commentReplies: { data: [], paginatorInfo: {} } } });
      const result = await repo.getComments({ targetType: "movie", targetId: "m1", parentId: "c1" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getComments({ targetType: "movie", targetId: "m1" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("createComment", () => {
    it("returns created comment", async () => {
      client.mutate.mockResolvedValue({ data: { createMovieComment: { id: "1", content: "hi" } } });
      const result = await repo.createComment({ targetType: "movie", targetId: "m1", content: "hi" });
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("deleteComment", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.deleteComment("1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("likeComment", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.likeComment("1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("unlikeComment", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.unlikeComment("1");
      expect(result.isSuccess).toBe(true);
    });
  });
});
