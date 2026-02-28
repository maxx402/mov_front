import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatRelativeTime, formatDate } from "../date";

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns '刚刚' for less than 60 seconds ago", () => {
    expect(formatRelativeTime("2025-06-15T11:59:30Z")).toBe("刚刚");
  });

  it("returns '刚刚' for 0 seconds ago", () => {
    expect(formatRelativeTime("2025-06-15T12:00:00Z")).toBe("刚刚");
  });

  it("returns minutes ago for 1-59 minutes", () => {
    expect(formatRelativeTime("2025-06-15T11:55:00Z")).toBe("5分钟前");
  });

  it("returns '1分钟前' for exactly 60 seconds", () => {
    expect(formatRelativeTime("2025-06-15T11:59:00Z")).toBe("1分钟前");
  });

  it("returns '59分钟前' for 59 minutes", () => {
    expect(formatRelativeTime("2025-06-15T11:01:00Z")).toBe("59分钟前");
  });

  it("returns hours ago for 1-23 hours", () => {
    expect(formatRelativeTime("2025-06-15T09:00:00Z")).toBe("3小时前");
  });

  it("returns '1小时前' for exactly 60 minutes", () => {
    expect(formatRelativeTime("2025-06-15T11:00:00Z")).toBe("1小时前");
  });

  it("returns days ago for 1-29 days", () => {
    expect(formatRelativeTime("2025-06-10T12:00:00Z")).toBe("5天前");
  });

  it("returns '1天前' for exactly 24 hours", () => {
    expect(formatRelativeTime("2025-06-14T12:00:00Z")).toBe("1天前");
  });

  it("returns months ago for 30-364 days", () => {
    expect(formatRelativeTime("2025-04-15T12:00:00Z")).toBe("2个月前");
  });

  it("returns '1个月前' for 30 days", () => {
    expect(formatRelativeTime("2025-05-16T12:00:00Z")).toBe("1个月前");
  });

  it("returns years ago for 12+ months", () => {
    expect(formatRelativeTime("2023-06-15T12:00:00Z")).toBe("2年前");
  });

  it("returns '1年前' for exactly 12 months", () => {
    expect(formatRelativeTime("2024-06-15T12:00:00Z")).toBe("1年前");
  });
});

describe("formatDate", () => {
  it("formats ISO date string to YYYY-MM-DD", () => {
    expect(formatDate("2025-06-15T12:00:00Z")).toMatch(/2025-06-15/);
  });

  it("pads single-digit month with zero", () => {
    expect(formatDate("2025-01-05T00:00:00Z")).toMatch(/01/);
  });

  it("pads single-digit day with zero", () => {
    expect(formatDate("2025-01-05T00:00:00Z")).toMatch(/05/);
  });

  it("formats a full date correctly", () => {
    // Note: formatDate uses local timezone, so we test with a date that works universally
    const result = formatDate("2025-12-25T12:00:00Z");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("handles date without time component", () => {
    const result = formatDate("2025-03-08");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
