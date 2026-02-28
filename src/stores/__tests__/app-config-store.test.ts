import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { AppConfigStore } from "../app-config-store";

function createMockRepo() {
  return { getAppConfig: vi.fn(), checkUpdate: vi.fn() };
}

describe("AppConfigStore", () => {
  let repo: ReturnType<typeof createMockRepo>;
  let store: AppConfigStore;

  beforeEach(() => {
    repo = createMockRepo();
    store = new AppConfigStore(repo);
  });

  it("starts with null config", () => {
    expect(store.appConfig).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(store.marqueeTexts).toEqual([]);
    expect(store.hasMarqueeTexts).toBe(false);
  });

  describe("loadAppConfig", () => {
    it("loads config on success", async () => {
      const config = { marqueeTexts: ["Welcome"], appName: "App" };
      repo.getAppConfig.mockResolvedValue(Result.success(config));
      await store.loadAppConfig();
      expect(store.appConfig).toEqual(config);
      expect(store.marqueeTexts).toEqual(["Welcome"]);
      expect(store.hasMarqueeTexts).toBe(true);
      expect(store.isLoading).toBe(false);
    });

    it("handles failure gracefully", async () => {
      repo.getAppConfig.mockResolvedValue(Result.failure({ message: "fail" } as any));
      await store.loadAppConfig();
      expect(store.appConfig).toBeNull();
      expect(store.isLoading).toBe(false);
    });
  });
});
