import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { NetworkFailure } from "@/core/errors/failure";
import { MyStore } from "../my-store";
import { UserStore } from "../user-store";

vi.mock("@/core/storage/storage", () => ({
  storage: { getToken: vi.fn(() => null), setToken: vi.fn(), removeToken: vi.fn(), setCachedUser: vi.fn(), removeCachedUser: vi.fn(), clear: vi.fn() },
}));

function createMockAuthRepo() {
  return { login: vi.fn(), register: vi.fn(), getCurrentUser: vi.fn(), getUser: vi.fn(), getMyInvitationCode: vi.fn(), getMyInvitationRecords: vi.fn(), bindInvitationCode: vi.fn(), getMyInviter: vi.fn() };
}
function createMockHistoryRepo() {
  return { getWatchHistories: vi.fn(), addWatchHistory: vi.fn(), removeWatchHistories: vi.fn() };
}
function createMockNotifRepo() {
  return { getNotifications: vi.fn(), getUnreadCount: vi.fn(), markAsRead: vi.fn(), markAllAsRead: vi.fn() };
}
function createMockAppConfigRepo() {
  return { getAppConfig: vi.fn(), checkUpdate: vi.fn() };
}

const defaultPaginator = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };

const mockWatchHistory = {
  id: "1",
  movieId: "m1",
  movieTitle: "M",
  movieCover: "c.jpg",
  episodeNumber: 1,
  progress: 50,
  duration: 100,
  watchedAt: "2024-01-01",
  movieStatus: 1,
  movieCurrentEpisode: 5,
  movieTotalEpisodes: 12,
};

describe("MyStore", () => {
  let authRepo: ReturnType<typeof createMockAuthRepo>;
  let userStore: UserStore;
  let historyRepo: ReturnType<typeof createMockHistoryRepo>;
  let notifRepo: ReturnType<typeof createMockNotifRepo>;
  let configRepo: ReturnType<typeof createMockAppConfigRepo>;
  let store: MyStore;

  beforeEach(() => {
    authRepo = createMockAuthRepo();
    userStore = new UserStore(authRepo);
    historyRepo = createMockHistoryRepo();
    notifRepo = createMockNotifRepo();
    configRepo = createMockAppConfigRepo();
    store = new MyStore(userStore, historyRepo, notifRepo, configRepo);
  });

  describe("isLoggedIn", () => {
    it("returns false when user is not authenticated", () => {
      expect(store.isLoggedIn).toBe(false);
    });

    it("returns true when user is authenticated", async () => {
      authRepo.login.mockResolvedValue(Result.success({
        token: "tok",
        user: { id: "u1", name: "User", nickname: "Nick" },
      }));
      await userStore.login({ account: "test", password: "pass" });
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("hasWatchHistory", () => {
    it("returns false when watchHistories is empty", () => {
      expect(store.hasWatchHistory).toBe(false);
    });

    it("returns true when watchHistories has items", async () => {
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({
        items: [mockWatchHistory],
        paginator: defaultPaginator,
      }));
      await store.loadWatchHistories();
      expect(store.hasWatchHistory).toBe(true);
    });
  });

  describe("hasUnreadNotification", () => {
    it("returns false when unreadNotificationCount is 0", () => {
      expect(store.hasUnreadNotification).toBe(false);
    });

    it("returns true when unreadNotificationCount is > 0", async () => {
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(5));
      await store.loadUnreadNotificationCount();
      expect(store.hasUnreadNotification).toBe(true);
    });
  });

  describe("unreadNotificationText", () => {
    it("returns '0' when count is 0", () => {
      expect(store.unreadNotificationText).toBe("0");
    });

    it("returns count as string when <= 99", async () => {
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(5));
      await store.loadUnreadNotificationCount();
      expect(store.unreadNotificationText).toBe("5");
    });

    it("returns '99+' when count > 99", async () => {
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(150));
      await store.loadUnreadNotificationCount();
      expect(store.unreadNotificationText).toBe("99+");
    });

    it("returns '99' when count is exactly 99", async () => {
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(99));
      await store.loadUnreadNotificationCount();
      expect(store.unreadNotificationText).toBe("99");
    });
  });

  describe("init", () => {
    it("calls loadWatchHistories, loadUnreadNotificationCount, and loadAppConfig in parallel", async () => {
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({
        items: [mockWatchHistory],
        paginator: defaultPaginator,
      }));
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(3));
      configRepo.getAppConfig.mockResolvedValue(Result.success({ marqueeTexts: ["hello"] }));

      await store.init();

      expect(historyRepo.getWatchHistories).toHaveBeenCalledTimes(1);
      expect(notifRepo.getUnreadCount).toHaveBeenCalledTimes(1);
      expect(configRepo.getAppConfig).toHaveBeenCalledTimes(1);
      expect(store.watchHistories).toHaveLength(1);
      expect(store.unreadNotificationCount).toBe(3);
      expect(store.appConfig).toEqual({ marqueeTexts: ["hello"] });
    });
  });

  describe("loadWatchHistories", () => {
    it("loads watch histories and sets isLoadingHistory", async () => {
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({
        items: [mockWatchHistory],
        paginator: defaultPaginator,
      }));

      const promise = store.loadWatchHistories();
      expect(store.isLoadingHistory).toBe(true);
      await promise;

      expect(store.isLoadingHistory).toBe(false);
      expect(store.watchHistories).toEqual([mockWatchHistory]);
      expect(historyRepo.getWatchHistories).toHaveBeenCalledWith({ pageSize: 10 });
    });

    it("does not update watchHistories on failure", async () => {
      historyRepo.getWatchHistories.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "history error" })),
      );
      await store.loadWatchHistories();

      expect(store.isLoadingHistory).toBe(false);
      expect(store.watchHistories).toEqual([]);
    });
  });

  describe("loadUnreadNotificationCount", () => {
    it("loads unread count on success", async () => {
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(7));
      await store.loadUnreadNotificationCount();
      expect(store.unreadNotificationCount).toBe(7);
    });

    it("does not update count on failure", async () => {
      notifRepo.getUnreadCount.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "notif error" })),
      );
      await store.loadUnreadNotificationCount();
      expect(store.unreadNotificationCount).toBe(0);
    });
  });

  describe("loadAppConfig", () => {
    it("loads app config on success", async () => {
      configRepo.getAppConfig.mockResolvedValue(Result.success({ marqueeTexts: ["test"] }));
      await store.loadAppConfig();
      expect(store.appConfig).toEqual({ marqueeTexts: ["test"] });
    });

    it("does not update appConfig on failure", async () => {
      configRepo.getAppConfig.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "config error" })),
      );
      await store.loadAppConfig();
      expect(store.appConfig).toBeNull();
    });
  });

  describe("refresh", () => {
    it("calls loadWatchHistories and loadUnreadNotificationCount", async () => {
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({
        items: [mockWatchHistory],
        paginator: defaultPaginator,
      }));
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(10));

      await store.refresh();

      expect(historyRepo.getWatchHistories).toHaveBeenCalledTimes(1);
      expect(notifRepo.getUnreadCount).toHaveBeenCalledTimes(1);
      expect(store.watchHistories).toHaveLength(1);
      expect(store.unreadNotificationCount).toBe(10);
    });

    it("does not call loadAppConfig", async () => {
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(0));
      await store.refresh();
      expect(configRepo.getAppConfig).not.toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("cleans up the auth reaction", () => {
      store.dispose();
      // After dispose, logging out should not clear watchHistories
      // We need to verify the reaction is disposed by checking it no longer fires
    });

    it("does not throw when called multiple times", () => {
      store.dispose();
      expect(() => store.dispose()).not.toThrow();
    });
  });

  describe("authReaction", () => {
    it("clears watchHistories and unreadNotificationCount when user logs out", async () => {
      // First, load some data
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({
        items: [mockWatchHistory],
        paginator: defaultPaginator,
      }));
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(5));
      configRepo.getAppConfig.mockResolvedValue(Result.success({ marqueeTexts: [] }));
      await store.init();

      expect(store.watchHistories).toHaveLength(1);
      expect(store.unreadNotificationCount).toBe(5);

      // Login first so isAuthenticated becomes true
      authRepo.login.mockResolvedValue(Result.success({
        token: "tok",
        user: { id: "u1", name: "User", nickname: "Nick" },
      }));
      await userStore.login({ account: "test", password: "pass" });
      expect(userStore.isAuthenticated).toBe(true);

      // Now logout, which triggers the reaction
      await userStore.logout();
      expect(userStore.isAuthenticated).toBe(false);

      expect(store.watchHistories).toEqual([]);
      expect(store.unreadNotificationCount).toBe(0);
    });

    it("does not clear data after dispose", async () => {
      // Load data
      historyRepo.getWatchHistories.mockResolvedValue(Result.success({
        items: [mockWatchHistory],
        paginator: defaultPaginator,
      }));
      notifRepo.getUnreadCount.mockResolvedValue(Result.success(5));
      configRepo.getAppConfig.mockResolvedValue(Result.success({ marqueeTexts: [] }));
      await store.init();

      // Login
      authRepo.login.mockResolvedValue(Result.success({
        token: "tok",
        user: { id: "u1", name: "User", nickname: "Nick" },
      }));
      await userStore.login({ account: "test", password: "pass" });

      // Dispose the reaction
      store.dispose();

      // Logout - should NOT clear data because reaction is disposed
      await userStore.logout();

      expect(store.watchHistories).toHaveLength(1);
      expect(store.unreadNotificationCount).toBe(5);
    });
  });
});
