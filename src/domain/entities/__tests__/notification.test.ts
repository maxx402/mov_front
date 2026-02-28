import { describe, it, expect } from "vitest";
import { isNotificationRead, isNotificationUnread } from "../notification";
import type { AppNotification } from "../notification";

function makeNotification(overrides: Partial<AppNotification> = {}): AppNotification {
  return { id: "1", title: "Test", createdAt: "2024-01-01", ...overrides };
}

describe("isNotificationRead", () => {
  it("returns true when readAt is set", () => {
    expect(isNotificationRead(makeNotification({ readAt: "2024-01-02" }))).toBe(true);
  });
  it("returns false when readAt is undefined", () => {
    expect(isNotificationRead(makeNotification())).toBe(false);
  });
});

describe("isNotificationUnread", () => {
  it("returns true when readAt is undefined", () => {
    expect(isNotificationUnread(makeNotification())).toBe(true);
  });
  it("returns false when readAt is set", () => {
    expect(isNotificationUnread(makeNotification({ readAt: "2024-01-02" }))).toBe(false);
  });
});
