import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getWatchHistoryProgressPercent,
  getWatchHistoryProgressText,
  getWatchProgressDisplayText,
  getWatchHistoryMovieStatusText,
  getWatchedAtText,
} from "../watch-history";
import type { WatchHistory } from "../watch-history";

function makeHistory(overrides: Partial<WatchHistory> = {}): WatchHistory {
  return {
    id: "1", movieId: "m1", movieTitle: "Movie", movieCover: "cover.jpg",
    episodeNumber: 1, progress: 0, duration: 0, watchedAt: "2024-01-01T00:00:00Z",
    movieStatus: 0, movieCurrentEpisode: 0, movieTotalEpisodes: 0, ...overrides,
  };
}

describe("getWatchHistoryProgressPercent", () => {
  it("returns 0 when duration is 0", () => {
    expect(getWatchHistoryProgressPercent(makeHistory())).toBe(0);
  });
  it("returns progress/duration ratio", () => {
    expect(getWatchHistoryProgressPercent(makeHistory({ progress: 50, duration: 100 }))).toBe(0.5);
  });
});

describe("getWatchHistoryProgressText", () => {
  it("formats as 第X集 M:SS", () => {
    expect(getWatchHistoryProgressText(makeHistory({ episodeNumber: 3, progress: 125 }))).toBe("第3集 2:05");
  });
  it("handles 0 progress", () => {
    expect(getWatchHistoryProgressText(makeHistory({ episodeNumber: 1, progress: 0 }))).toBe("第1集 0:00");
  });
});

describe("getWatchProgressDisplayText", () => {
  it("shows percentage", () => {
    expect(getWatchProgressDisplayText(makeHistory({ episodeNumber: 2, progress: 50, duration: 100 }))).toBe("第2集·观看至50%");
  });
  it("shows 不足1% for very small progress", () => {
    expect(getWatchProgressDisplayText(makeHistory({ episodeNumber: 1, progress: 1, duration: 1000 }))).toBe("第1集·观看至不足1%");
  });
  it("shows 0% for zero duration", () => {
    expect(getWatchProgressDisplayText(makeHistory({ episodeNumber: 1, progress: 0, duration: 0 }))).toBe("第1集·观看至不足1%");
  });
});

describe("getWatchHistoryMovieStatusText", () => {
  it("returns 预告 for status 0", () => {
    expect(getWatchHistoryMovieStatusText(makeHistory({ movieStatus: 0 }))).toBe("预告");
  });
  it("returns 更新至X集 for status 1 with episodes", () => {
    expect(getWatchHistoryMovieStatusText(makeHistory({ movieStatus: 1, movieCurrentEpisode: 5 }))).toBe("更新至5集");
  });
  it("returns 更新中 for status 1 without episodes", () => {
    expect(getWatchHistoryMovieStatusText(makeHistory({ movieStatus: 1, movieCurrentEpisode: 0 }))).toBe("更新中");
  });
  it("returns 全X集 for status 2 with total", () => {
    expect(getWatchHistoryMovieStatusText(makeHistory({ movieStatus: 2, movieTotalEpisodes: 12 }))).toBe("全12集");
  });
  it("returns 已完结 for status 2 without total", () => {
    expect(getWatchHistoryMovieStatusText(makeHistory({ movieStatus: 2, movieTotalEpisodes: 0 }))).toBe("已完结");
  });
  it("returns empty string for unknown status", () => {
    expect(getWatchHistoryMovieStatusText(makeHistory({ movieStatus: 99 }))).toBe("");
  });
});

describe("getWatchedAtText", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("returns 刚刚 for less than 1 minute ago", () => {
    vi.setSystemTime(new Date("2024-01-01T00:00:30Z"));
    expect(getWatchedAtText(makeHistory({ watchedAt: "2024-01-01T00:00:00Z" }))).toBe("刚刚");
  });
  it("returns X分钟前 for minutes", () => {
    vi.setSystemTime(new Date("2024-01-01T00:05:00Z"));
    expect(getWatchedAtText(makeHistory({ watchedAt: "2024-01-01T00:00:00Z" }))).toBe("5分钟前");
  });
  it("returns X小时前 for hours", () => {
    vi.setSystemTime(new Date("2024-01-01T03:00:00Z"));
    expect(getWatchedAtText(makeHistory({ watchedAt: "2024-01-01T00:00:00Z" }))).toBe("3小时前");
  });
  it("returns X天前 for days", () => {
    vi.setSystemTime(new Date("2024-01-04T00:00:00Z"));
    expect(getWatchedAtText(makeHistory({ watchedAt: "2024-01-01T00:00:00Z" }))).toBe("3天前");
  });
  it("returns date format for over 7 days", () => {
    vi.setSystemTime(new Date("2024-01-15T00:00:00Z"));
    const result = getWatchedAtText(makeHistory({ watchedAt: "2024-01-01T08:30:00Z" }));
    expect(result).toMatch(/01-01 \d{2}:\d{2}/);
  });
});
