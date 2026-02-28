import { describe, it, expect } from "vitest";
import { getUserDisplayName, Gender } from "../user";
import type { User } from "../user";

function makeUser(overrides: Partial<User> = {}): User {
  return { id: "1", name: "test", gender: Gender.Unknown, isGuest: false, ...overrides };
}

describe("getUserDisplayName", () => {
  it("returns nickname when present", () => {
    expect(getUserDisplayName(makeUser({ nickname: "Nick" }))).toBe("Nick");
  });
  it("returns name when no nickname", () => {
    expect(getUserDisplayName(makeUser({ name: "TestUser" }))).toBe("TestUser");
  });
});
