import { describe, it, expect } from "vitest";
import { formatViewCount, formatDuration, formatProgress } from "../format";

describe("formatViewCount", () => {
  it("returns '1亿' for 100_000_000", () => {
    expect(formatViewCount(100_000_000)).toBe("1亿");
  });

  it("returns '1.5亿' for 150_000_000", () => {
    expect(formatViewCount(150_000_000)).toBe("1.5亿");
  });

  it("returns '2亿' for 200_000_000", () => {
    expect(formatViewCount(200_000_000)).toBe("2亿");
  });

  it("returns '10亿' for 1_000_000_000", () => {
    expect(formatViewCount(1_000_000_000)).toBe("10亿");
  });

  it("returns '1万' for 10_000", () => {
    expect(formatViewCount(10_000)).toBe("1万");
  });

  it("returns '1.5万' for 15_000", () => {
    expect(formatViewCount(15_000)).toBe("1.5万");
  });

  it("returns '99.9万' for 999_000 (below 亿 threshold)", () => {
    expect(formatViewCount(999_000)).toBe("99.9万");
  });

  it("returns '9999万' for 99_990_000 (below 亿 threshold)", () => {
    expect(formatViewCount(99_990_000)).toBe("9999万");
  });

  it("returns plain number string for values below 10_000", () => {
    expect(formatViewCount(9999)).toBe("9999");
  });

  it("returns '0' for 0", () => {
    expect(formatViewCount(0)).toBe("0");
  });

  it("returns '1' for 1", () => {
    expect(formatViewCount(1)).toBe("1");
  });

  it("returns '100' for 100", () => {
    expect(formatViewCount(100)).toBe("100");
  });
});

describe("formatDuration", () => {
  it("formats 0 seconds as 0:00", () => {
    expect(formatDuration(0)).toBe("0:00");
  });

  it("formats 59 seconds as 0:59", () => {
    expect(formatDuration(59)).toBe("0:59");
  });

  it("formats 60 seconds as 1:00", () => {
    expect(formatDuration(60)).toBe("1:00");
  });

  it("formats 90 seconds as 1:30", () => {
    expect(formatDuration(90)).toBe("1:30");
  });

  it("formats 3599 seconds as 59:59", () => {
    expect(formatDuration(3599)).toBe("59:59");
  });

  it("formats 3600 seconds as 1:00:00 (with hours)", () => {
    expect(formatDuration(3600)).toBe("1:00:00");
  });

  it("formats 3661 seconds as 1:01:01", () => {
    expect(formatDuration(3661)).toBe("1:01:01");
  });

  it("formats 7200 seconds as 2:00:00", () => {
    expect(formatDuration(7200)).toBe("2:00:00");
  });

  it("pads minutes and seconds with leading zeros when hours > 0", () => {
    expect(formatDuration(3605)).toBe("1:00:05");
  });

  it("pads seconds with leading zero when < 10", () => {
    expect(formatDuration(5)).toBe("0:05");
  });

  it("handles fractional seconds by flooring", () => {
    expect(formatDuration(65.7)).toBe("1:05");
  });
});

describe("formatProgress", () => {
  it("formats position / duration", () => {
    expect(formatProgress(90, 3600)).toBe("1:30 / 1:00:00");
  });

  it("formats 0 / 0", () => {
    expect(formatProgress(0, 0)).toBe("0:00 / 0:00");
  });

  it("formats both with hours", () => {
    expect(formatProgress(3661, 7200)).toBe("1:01:01 / 2:00:00");
  });

  it("formats position without hours and duration with hours", () => {
    expect(formatProgress(120, 7200)).toBe("2:00 / 2:00:00");
  });
});
