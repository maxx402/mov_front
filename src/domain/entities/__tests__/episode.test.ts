import { describe, it, expect, vi } from "vitest";

vi.mock("@/core/utils/format", () => ({
  formatDuration: vi.fn((s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`),
}));

import { getEpisodeDisplayTitle, getEpisodeDurationText, getDefaultPlayLine } from "../episode";
import type { Episode } from "../episode";

function makeEpisode(overrides: Partial<Episode> = {}): Episode {
  return { id: "1", number: 1, duration: 0, playLines: [], ...overrides };
}

describe("getEpisodeDisplayTitle", () => {
  it("returns title when present", () => {
    expect(getEpisodeDisplayTitle(makeEpisode({ title: "Pilot" }))).toBe("Pilot");
  });
  it("returns 第X集 when no title", () => {
    expect(getEpisodeDisplayTitle(makeEpisode({ number: 5 }))).toBe("第5集");
  });
});

describe("getEpisodeDurationText", () => {
  it("returns empty string when duration is 0", () => {
    expect(getEpisodeDurationText(makeEpisode({ duration: 0 }))).toBe("");
  });
  it("returns empty string when duration is negative", () => {
    expect(getEpisodeDurationText(makeEpisode({ duration: -1 }))).toBe("");
  });
  it("returns formatted duration when positive", () => {
    expect(getEpisodeDurationText(makeEpisode({ duration: 125 }))).toBe("2:05");
  });
});

describe("getDefaultPlayLine", () => {
  it("returns first play line", () => {
    const line = { id: "l1", name: "HD", url: "http://example.com" };
    expect(getDefaultPlayLine(makeEpisode({ playLines: [line] }))).toEqual(line);
  });
  it("returns undefined when empty", () => {
    expect(getDefaultPlayLine(makeEpisode())).toBeUndefined();
  });
});
