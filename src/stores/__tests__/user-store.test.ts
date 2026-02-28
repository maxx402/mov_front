import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { ApiFailure } from "@/core/errors/failure";
import { UserStore } from "../user-store";

vi.mock("@/core/storage/storage", () => ({
  storage: {
    getToken: vi.fn(() => null),
    setToken: vi.fn(),
    removeToken: vi.fn(),
    setCachedUser: vi.fn(),
    removeCachedUser: vi.fn(),
    clear: vi.fn(),
  },
}));

function createMockAuthRepo() {
  return {
    login: vi.fn(),
    register: vi.fn(),
    getCurrentUser: vi.fn(),
    getUser: vi.fn(),
    getMyInvitationCode: vi.fn(),
    getMyInvitationRecords: vi.fn(),
    bindInvitationCode: vi.fn(),
    getMyInviter: vi.fn(),
  };
}

const mockUser = { id: "1", name: "test", gender: "unknown" as const, isGuest: false };

describe("UserStore", () => {
  let repo: ReturnType<typeof createMockAuthRepo>;
  let store: UserStore;

  beforeEach(() => {
    vi.clearAllMocks();
    repo = createMockAuthRepo();
    store = new UserStore(repo);
  });

  it("starts unauthenticated", () => {
    expect(store.isAuthenticated).toBe(false);
    expect(store.currentUser).toBeNull();
    expect(store.displayName).toBe("未登录");
  });

  describe("login", () => {
    it("sets user and token on success", async () => {
      repo.login.mockResolvedValue(Result.success({ token: "tk", user: mockUser }));
      const error = await store.login({ account: "a", password: "p" });
      expect(error).toBeNull();
      expect(store.isAuthenticated).toBe(true);
      expect(store.token).toBe("tk");
    });

    it("sets error message on failure", async () => {
      repo.login.mockResolvedValue(Result.failure(new ApiFailure({ message: "bad creds" })));
      const error = await store.login({ account: "a", password: "p" });
      expect(error).toBeDefined();
      expect(store.isAuthenticated).toBe(false);
      expect(store.errorMessage).toBeTruthy();
    });
  });

  describe("register", () => {
    it("sets user and token on success", async () => {
      repo.register.mockResolvedValue(Result.success({ token: "tk2", user: mockUser }));
      const error = await store.register({ account: "a", password: "p" });
      expect(error).toBeNull();
      expect(store.isAuthenticated).toBe(true);
    });
  });

  describe("logout", () => {
    it("clears user and token", async () => {
      repo.login.mockResolvedValue(Result.success({ token: "tk", user: mockUser }));
      await store.login({ account: "a", password: "p" });
      await store.logout();
      expect(store.isAuthenticated).toBe(false);
      expect(store.token).toBeNull();
    });
  });

  describe("handleUnauthenticated", () => {
    it("clears auth state and shows login", () => {
      store.handleUnauthenticated();
      expect(store.isAuthenticated).toBe(false);
      expect(store.showLoginSheet).toBe(true);
    });
  });

  describe("restore", () => {
    it("returns false when no saved token", async () => {
      const result = await store.restore();
      expect(result).toBe(false);
    });

    it("restores user when token exists", async () => {
      const { storage } = await import("@/core/storage/storage");
      vi.mocked(storage.getToken).mockReturnValue("saved-tk");
      repo.getCurrentUser.mockResolvedValue(Result.success(mockUser));
      const result = await store.restore();
      expect(result).toBe(true);
      expect(store.isAuthenticated).toBe(true);
    });
  });

  describe("refreshUser", () => {
    it("updates current user", async () => {
      repo.login.mockResolvedValue(Result.success({ token: "tk", user: mockUser }));
      await store.login({ account: "a", password: "p" });
      const updatedUser = { ...mockUser, name: "updated" };
      repo.getCurrentUser.mockResolvedValue(Result.success(updatedUser));
      await store.refreshUser();
      expect(store.currentUser!.name).toBe("updated");
    });
  });

  describe("displayName", () => {
    it("returns nickname when available", async () => {
      repo.login.mockResolvedValue(Result.success({ token: "tk", user: { ...mockUser, nickname: "Nick" } }));
      await store.login({ account: "a", password: "p" });
      expect(store.displayName).toBe("Nick");
    });
  });

  describe("loginSheet", () => {
    it("opens and closes", () => {
      store.openLoginSheet();
      expect(store.showLoginSheet).toBe(true);
      store.closeLoginSheet();
      expect(store.showLoginSheet).toBe(false);
    });
  });
});
