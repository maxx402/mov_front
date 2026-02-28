import { describe, it, expect, beforeEach } from "vitest";
import { storage } from "../storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("token", () => {
    it("returns null when no token", () => {
      expect(storage.getToken()).toBeNull();
    });

    it("sets and gets token", () => {
      storage.setToken("abc");
      expect(storage.getToken()).toBe("abc");
    });

    it("removes token", () => {
      storage.setToken("abc");
      storage.removeToken();
      expect(storage.getToken()).toBeNull();
    });
  });

  describe("cachedUser", () => {
    it("returns null when no user", () => {
      expect(storage.getCachedUser()).toBeNull();
    });

    it("sets and gets user", () => {
      storage.setCachedUser({ id: "1", name: "test" });
      expect(storage.getCachedUser()).toEqual({ id: "1", name: "test" });
    });

    it("removes user", () => {
      storage.setCachedUser({ id: "1" });
      storage.removeCachedUser();
      expect(storage.getCachedUser()).toBeNull();
    });
  });

  describe("clear", () => {
    it("clears all", () => {
      storage.setToken("abc");
      storage.setCachedUser({ id: "1" });
      storage.clear();
      expect(storage.getToken()).toBeNull();
      expect(storage.getCachedUser()).toBeNull();
    });
  });
});
