import { describe, it, expect, vi, beforeEach } from "vitest";
import { FeedbackRepositoryImpl } from "../feedback-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  FeedbackTypesDocument: { kind: "Document" },
  MyFeedbacksDocument: { kind: "Document" },
  FeedbackDocument: { kind: "Document" },
  CreateFeedbackDocument: { kind: "Document" },
  CreateFeedbackCommentDocument: { kind: "Document" },
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("FeedbackRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: FeedbackRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new FeedbackRepositoryImpl(client);
  });

  describe("getFeedbackTypes", () => {
    it("returns types", async () => {
      client.query.mockResolvedValue({ data: { feedbackTypes: [{ id: "1", name: "Bug" }] } });
      const result = await repo.getFeedbackTypes();
      expect(result.length).toBe(1);
    });

    it("returns empty on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getFeedbackTypes();
      expect(result).toEqual([]);
    });

    it("caches results", async () => {
      client.query.mockResolvedValue({ data: { feedbackTypes: [{ id: "1", name: "Bug" }] } });
      await repo.getFeedbackTypes();
      await repo.getFeedbackTypes();
      expect(client.query).toHaveBeenCalledTimes(1);
    });
  });

  describe("getMyFeedbacks", () => {
    it("returns feedbacks", async () => {
      client.query.mockResolvedValue({
        data: { myFeedbacks: { data: [{ id: "1", content: "test", created_at: "2024-01-01", feedbackType: { name: "Bug" } }] } },
      });
      const result = await repo.getMyFeedbacks();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMyFeedbacks();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getFeedbackDetail", () => {
    it("returns detail", async () => {
      client.query.mockResolvedValue({
        data: {
          feedback: {
            id: "1", content: "test", created_at: "2024-01-01", status: 0,
            feedbackType: { name: "Bug" }, comments: [], images: [], video: null,
          },
        },
      });
      const result = await repo.getFeedbackDetail("1");
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("createFeedbackComment", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.createFeedbackComment({ feedbackId: "1", content: "reply" });
      expect(result.isSuccess).toBe(true);
    });
  });

  describe("createFeedback", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({ data: {} });
      const result = await repo.createFeedback({ feedbackTypeId: "1", content: "bug report" });
      expect(result.isSuccess).toBe(true);
    });
  });
});
