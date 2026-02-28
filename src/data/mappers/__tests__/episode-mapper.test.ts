import { describe, it, expect } from "vitest";
import { mapPlayLine, mapEpisode } from "../episode-mapper";

describe("mapPlayLine", () => {
  it("maps all fields when provided", () => {
    const data = {
      id: "pl1",
      name: "Line A",
      url: "https://example.com/video.m3u8",
      quality: "1080P",
    };

    const result = mapPlayLine(data);

    expect(result).toEqual({
      id: "pl1",
      name: "Line A",
      url: "https://example.com/video.m3u8",
      quality: "1080P",
    });
  });

  it("converts null quality to undefined", () => {
    const data = {
      id: "pl2",
      name: "Line B",
      url: "https://example.com/video2.m3u8",
      quality: null,
    };

    const result = mapPlayLine(data);

    expect(result.quality).toBeUndefined();
  });

  it("converts undefined quality to undefined", () => {
    const data = {
      id: "pl3",
      name: "Line C",
      url: "https://example.com/video3.m3u8",
    };

    const result = mapPlayLine(data);

    expect(result.quality).toBeUndefined();
  });
});

describe("mapEpisode", () => {
  it("maps all fields when fully provided", () => {
    const data = {
      id: "ep1",
      episode_number: 5,
      title: "Episode Title",
      duration: 2400,
      playLines: [
        { id: "pl1", name: "Line A", url: "https://example.com/a.m3u8", quality: "720P" },
      ],
    };

    const result = mapEpisode(data);

    expect(result).toEqual({
      id: "ep1",
      number: 5,
      title: "Episode Title",
      duration: 2400,
      playLines: [
        { id: "pl1", name: "Line A", url: "https://example.com/a.m3u8", quality: "720P" },
      ],
    });
  });

  it("defaults episode_number to 0 when missing", () => {
    const data = {
      id: "ep2",
      title: "No Number",
      duration: 1800,
      playLines: [],
    };

    const result = mapEpisode(data);

    expect(result.number).toBe(0);
  });

  it("converts null title to undefined", () => {
    const data = {
      id: "ep3",
      episode_number: 1,
      title: null,
      duration: 1200,
      playLines: [],
    };

    const result = mapEpisode(data);

    expect(result.title).toBeUndefined();
  });

  it("defaults duration to 0 when missing", () => {
    const data = {
      id: "ep4",
      episode_number: 2,
    };

    const result = mapEpisode(data);

    expect(result.duration).toBe(0);
  });

  it("falls back to play_lines when playLines is missing", () => {
    const data = {
      id: "ep5",
      episode_number: 3,
      title: "Fallback Lines",
      duration: 600,
      play_lines: [
        { id: "pl10", name: "Backup", url: "https://example.com/backup.m3u8", quality: null },
      ],
    };

    const result = mapEpisode(data);

    expect(result.playLines).toHaveLength(1);
    expect(result.playLines[0]).toEqual({
      id: "pl10",
      name: "Backup",
      url: "https://example.com/backup.m3u8",
      quality: undefined,
    });
  });

  it("returns empty playLines when both playLines and play_lines are missing", () => {
    const data = {
      id: "ep6",
      episode_number: 4,
    };

    const result = mapEpisode(data);

    expect(result.playLines).toEqual([]);
  });

  it("prefers playLines over play_lines when both are present", () => {
    const data = {
      id: "ep7",
      episode_number: 1,
      playLines: [
        { id: "pl-a", name: "Primary", url: "https://example.com/primary.m3u8" },
      ],
      play_lines: [
        { id: "pl-b", name: "Secondary", url: "https://example.com/secondary.m3u8" },
      ],
    };

    const result = mapEpisode(data);

    expect(result.playLines).toHaveLength(1);
    expect(result.playLines[0].id).toBe("pl-a");
  });
});
