import { describe, it, expect, vi, beforeEach } from "vitest";
import { AppConfigRepositoryImpl } from "../app-config-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  SettingsDocument: { kind: "Document" },
  CheckUpdateDocument: { kind: "Document" },
  MarqueeNoticesDocument: { kind: "Document" },
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("AppConfigRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: AppConfigRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new AppConfigRepositoryImpl(client);
  });

  describe("getAppConfig", () => {
    it("returns config", async () => {
      client.query
        .mockResolvedValueOnce({ data: { settings: [{ key: "app_name", value: "MovieApp" }] } })
        .mockResolvedValueOnce({ data: { marqueeNotices: ["notice1"] } });
      const result = await repo.getAppConfig();
      expect(result.isSuccess).toBe(true);
      expect(result.value!.appName).toBe("MovieApp");
      expect(result.value!.marqueeTexts).toEqual(["notice1"]);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getAppConfig();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("checkUpdate", () => {
    it("returns no update", async () => {
      client.query.mockResolvedValue({
        data: { checkUpdate: { has_update: false, force_update: false, latest_version: null } },
      });
      const result = await repo.checkUpdate();
      expect(result.isSuccess).toBe(true);
      expect(result.value!.hasUpdate).toBe(false);
    });

    it("returns update with version", async () => {
      client.query.mockResolvedValue({
        data: {
          checkUpdate: {
            has_update: true, force_update: false,
            latest_version: { title: "v2.0", description: "New", download_url: "http://dl.com", file_size: 1024, created_at: "2024-01-01" },
          },
        },
      });
      const result = await repo.checkUpdate();
      expect(result.isSuccess).toBe(true);
      expect(result.value!.hasUpdate).toBe(true);
      expect(result.value!.latestVersion!.title).toBe("v2.0");
    });
  });
});
