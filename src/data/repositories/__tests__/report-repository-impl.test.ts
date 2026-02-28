import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReportRepositoryImpl } from "../report-repository-impl";
import { ReportReason } from "@/domain/entities/report";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  CreateReportDocument: { kind: "Document" },
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("ReportRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: ReportRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new ReportRepositoryImpl(client);
  });

  describe("createReport", () => {
    it("returns success", async () => {
      client.mutate.mockResolvedValue({
        data: { createReport: { id: "1", reason: "SPAM", status: "PENDING", created_at: "2024-01-01" } },
      });
      const result = await repo.createReport({ targetType: "comment", targetId: "c1", reason: ReportReason.Spam });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.mutate.mockRejectedValue(new Error("fail"));
      const result = await repo.createReport({ targetType: "comment", targetId: "c1", reason: ReportReason.Spam });
      expect(result.isFailure).toBe(true);
    });
  });
});
