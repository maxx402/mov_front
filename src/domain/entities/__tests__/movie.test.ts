import { describe, it, expect, vi } from "vitest";
import {
  isMovieType,
  isMovieCompleted,
  getMovieStatusText,
  getMovieViewCountText,
  getMovieViewCountWatchingText,
  getMovieGenreText,
  getMoviePlainDescription,
  getMovieDirectors,
  getMovieMainActors,
  isMovieFHD,
  getWatchProgressPercent,
  getWatchProgressText,
  MovieStatus,
  ActorRoleType,
  type Movie,
  type WatchProgress,
  type ActorRole,
} from "../movie";

vi.mock("@/core/utils/html", () => ({
  stripHtmlTags: vi.fn((html: string) => html.replace(/<[^>]*>/g, "").trim()),
}));

vi.mock("@/core/utils/format", () => ({
  formatViewCount: vi.fn((count: number) => {
    if (count >= 100_000_000) {
      const value = count / 100_000_000;
      return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}亿`;
    }
    if (count >= 10_000) {
      const value = count / 10_000;
      return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}万`;
    }
    return count.toString();
  }),
}));

function makeMovie(overrides: Partial<Movie> = {}): Movie {
  return {
    id: "movie-1",
    title: "Test Movie",
    cover: "https://example.com/cover.jpg",
    score: 8.5,
    totalEpisodes: 12,
    currentEpisode: 6,
    status: MovieStatus.Ongoing,
    isFavorited: false,
    isSubscribed: false,
    isReserved: false,
    ...overrides,
  };
}

function makeActorRole(overrides: Partial<ActorRole> = {}): ActorRole {
  return {
    actorId: "actor-1",
    name: "Test Actor",
    role: ActorRoleType.Actor,
    ...overrides,
  };
}

function makeWatchProgress(
  overrides: Partial<WatchProgress> = {},
): WatchProgress {
  return {
    episodeId: "ep-1",
    episodeNumber: 3,
    position: 120,
    duration: 3600,
    ...overrides,
  };
}

describe("isMovieType", () => {
  it("returns true when totalEpisodes is 1", () => {
    expect(isMovieType(makeMovie({ totalEpisodes: 1 }))).toBe(true);
  });

  it("returns true when totalEpisodes is 0", () => {
    expect(isMovieType(makeMovie({ totalEpisodes: 0 }))).toBe(true);
  });

  it("returns false when totalEpisodes is greater than 1", () => {
    expect(isMovieType(makeMovie({ totalEpisodes: 2 }))).toBe(false);
  });

  it("returns false for a series with many episodes", () => {
    expect(isMovieType(makeMovie({ totalEpisodes: 24 }))).toBe(false);
  });
});

describe("isMovieCompleted", () => {
  it("returns true when status is Completed", () => {
    expect(
      isMovieCompleted(makeMovie({ status: MovieStatus.Completed })),
    ).toBe(true);
  });

  it("returns false when status is Ongoing", () => {
    expect(isMovieCompleted(makeMovie({ status: MovieStatus.Ongoing }))).toBe(
      false,
    );
  });

  it("returns false when status is Preview", () => {
    expect(isMovieCompleted(makeMovie({ status: MovieStatus.Preview }))).toBe(
      false,
    );
  });
});

describe("getMovieStatusText", () => {
  it('returns "预告" for Preview status', () => {
    expect(
      getMovieStatusText(makeMovie({ status: MovieStatus.Preview })),
    ).toBe("预告");
  });

  it('returns "更新至X集" for Ongoing series with currentEpisode > 0', () => {
    expect(
      getMovieStatusText(
        makeMovie({
          status: MovieStatus.Ongoing,
          totalEpisodes: 12,
          currentEpisode: 6,
        }),
      ),
    ).toBe("更新至6集");
  });

  it('returns "" for Ongoing movie type (totalEpisodes <= 1)', () => {
    expect(
      getMovieStatusText(
        makeMovie({
          status: MovieStatus.Ongoing,
          totalEpisodes: 1,
          currentEpisode: 1,
        }),
      ),
    ).toBe("");
  });

  it('returns "" for Ongoing series with currentEpisode < 1', () => {
    expect(
      getMovieStatusText(
        makeMovie({
          status: MovieStatus.Ongoing,
          totalEpisodes: 12,
          currentEpisode: 0,
        }),
      ),
    ).toBe("");
  });

  it('returns "已完结" for Completed series', () => {
    expect(
      getMovieStatusText(
        makeMovie({ status: MovieStatus.Completed, totalEpisodes: 12 }),
      ),
    ).toBe("已完结");
  });

  it('returns "" for Completed movie type', () => {
    expect(
      getMovieStatusText(
        makeMovie({ status: MovieStatus.Completed, totalEpisodes: 1 }),
      ),
    ).toBe("");
  });
});

describe("getMovieViewCountText", () => {
  it('returns "" when viewCount is undefined', () => {
    expect(getMovieViewCountText(makeMovie({ viewCount: undefined }))).toBe("");
  });

  it('returns "" when viewCount is 0', () => {
    expect(getMovieViewCountText(makeMovie({ viewCount: 0 }))).toBe("");
  });

  it("returns formatted view count for positive values", () => {
    expect(getMovieViewCountText(makeMovie({ viewCount: 50000 }))).toBe("5万");
  });

  it("returns raw count for values under 10000", () => {
    expect(getMovieViewCountText(makeMovie({ viewCount: 999 }))).toBe("999");
  });

  it("returns 亿 format for very large counts", () => {
    expect(
      getMovieViewCountText(makeMovie({ viewCount: 200_000_000 })),
    ).toBe("2亿");
  });
});

describe("getMovieViewCountWatchingText", () => {
  it('returns "" when viewCount is undefined', () => {
    expect(
      getMovieViewCountWatchingText(makeMovie({ viewCount: undefined })),
    ).toBe("");
  });

  it('returns "" when viewCount is 0', () => {
    expect(getMovieViewCountWatchingText(makeMovie({ viewCount: 0 }))).toBe(
      "",
    );
  });

  it('returns "X万人次在看" when viewCount >= 10000', () => {
    expect(
      getMovieViewCountWatchingText(makeMovie({ viewCount: 50000 })),
    ).toBe("5.0万人次在看");
  });

  it('returns "X人次在看" when viewCount < 10000', () => {
    expect(
      getMovieViewCountWatchingText(makeMovie({ viewCount: 999 })),
    ).toBe("999人次在看");
  });

  it("handles exact 10000 boundary", () => {
    expect(
      getMovieViewCountWatchingText(makeMovie({ viewCount: 10000 })),
    ).toBe("1.0万人次在看");
  });

  it("handles viewCount of 1", () => {
    expect(getMovieViewCountWatchingText(makeMovie({ viewCount: 1 }))).toBe(
      "1人次在看",
    );
  });
});

describe("getMovieGenreText", () => {
  it('returns "" when genres is undefined', () => {
    expect(getMovieGenreText(makeMovie({ genres: undefined }))).toBe("");
  });

  it('returns "" when genres is empty', () => {
    expect(getMovieGenreText(makeMovie({ genres: [] }))).toBe("");
  });

  it("returns single genre name", () => {
    expect(
      getMovieGenreText(
        makeMovie({ genres: [{ id: "1", name: "Action" }] }),
      ),
    ).toBe("Action");
  });

  it("joins multiple genres with ' / '", () => {
    expect(
      getMovieGenreText(
        makeMovie({
          genres: [
            { id: "1", name: "Action" },
            { id: "2", name: "Drama" },
            { id: "3", name: "Comedy" },
          ],
        }),
      ),
    ).toBe("Action / Drama / Comedy");
  });
});

describe("getMoviePlainDescription", () => {
  it('returns "" when description is undefined', () => {
    expect(
      getMoviePlainDescription(makeMovie({ description: undefined })),
    ).toBe("");
  });

  it('returns "" when description is empty string', () => {
    expect(getMoviePlainDescription(makeMovie({ description: "" }))).toBe("");
  });

  it("strips HTML tags from description", () => {
    expect(
      getMoviePlainDescription(
        makeMovie({ description: "<p>A great <b>movie</b></p>" }),
      ),
    ).toBe("A great movie");
  });

  it("returns plain text description as-is", () => {
    expect(
      getMoviePlainDescription(makeMovie({ description: "A great movie" })),
    ).toBe("A great movie");
  });
});

describe("getMovieDirectors", () => {
  it("returns empty array when actors is undefined", () => {
    expect(getMovieDirectors(makeMovie({ actors: undefined }))).toEqual([]);
  });

  it("returns empty array when no directors", () => {
    const actors = [makeActorRole({ role: ActorRoleType.Actor })];
    expect(getMovieDirectors(makeMovie({ actors }))).toEqual([]);
  });

  it("filters only Director role actors", () => {
    const director = makeActorRole({
      actorId: "d1",
      name: "Director A",
      role: ActorRoleType.Director,
    });
    const actor = makeActorRole({
      actorId: "a1",
      name: "Actor A",
      role: ActorRoleType.Actor,
    });
    const writer = makeActorRole({
      actorId: "w1",
      name: "Writer A",
      role: ActorRoleType.Writer,
    });
    expect(
      getMovieDirectors(makeMovie({ actors: [director, actor, writer] })),
    ).toEqual([director]);
  });

  it("returns multiple directors", () => {
    const d1 = makeActorRole({
      actorId: "d1",
      role: ActorRoleType.Director,
    });
    const d2 = makeActorRole({
      actorId: "d2",
      role: ActorRoleType.Director,
    });
    expect(getMovieDirectors(makeMovie({ actors: [d1, d2] }))).toEqual([
      d1,
      d2,
    ]);
  });
});

describe("getMovieMainActors", () => {
  it("returns empty array when actors is undefined", () => {
    expect(getMovieMainActors(makeMovie({ actors: undefined }))).toEqual([]);
  });

  it("returns empty array when no Actor role entries", () => {
    const director = makeActorRole({ role: ActorRoleType.Director });
    expect(getMovieMainActors(makeMovie({ actors: [director] }))).toEqual([]);
  });

  it("filters only Actor role entries", () => {
    const director = makeActorRole({
      actorId: "d1",
      role: ActorRoleType.Director,
    });
    const actor = makeActorRole({
      actorId: "a1",
      role: ActorRoleType.Actor,
    });
    const producer = makeActorRole({
      actorId: "p1",
      role: ActorRoleType.Producer,
    });
    expect(
      getMovieMainActors(makeMovie({ actors: [director, actor, producer] })),
    ).toEqual([actor]);
  });
});

describe("isMovieFHD", () => {
  it("returns false when quality is undefined", () => {
    expect(isMovieFHD(makeMovie({ quality: undefined }))).toBe(false);
  });

  it('returns true for "1080P"', () => {
    expect(isMovieFHD(makeMovie({ quality: "1080P" }))).toBe(true);
  });

  it('returns true for "2K"', () => {
    expect(isMovieFHD(makeMovie({ quality: "2K" }))).toBe(true);
  });

  it('returns true for "4K"', () => {
    expect(isMovieFHD(makeMovie({ quality: "4K" }))).toBe(true);
  });

  it('returns true for "8K"', () => {
    expect(isMovieFHD(makeMovie({ quality: "8K" }))).toBe(true);
  });

  it('returns false for "720P"', () => {
    expect(isMovieFHD(makeMovie({ quality: "720P" }))).toBe(false);
  });

  it('returns false for "480P"', () => {
    expect(isMovieFHD(makeMovie({ quality: "480P" }))).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isMovieFHD(makeMovie({ quality: "" }))).toBe(false);
  });
});

describe("getWatchProgressPercent", () => {
  it("returns position/duration ratio", () => {
    expect(
      getWatchProgressPercent(makeWatchProgress({ position: 900, duration: 3600 })),
    ).toBeCloseTo(0.25);
  });

  it("returns 0 when duration is 0", () => {
    expect(
      getWatchProgressPercent(makeWatchProgress({ position: 100, duration: 0 })),
    ).toBe(0);
  });

  it("returns 1 when position equals duration", () => {
    expect(
      getWatchProgressPercent(
        makeWatchProgress({ position: 3600, duration: 3600 }),
      ),
    ).toBe(1);
  });

  it("returns 0 when both position and duration are 0", () => {
    expect(
      getWatchProgressPercent(makeWatchProgress({ position: 0, duration: 0 })),
    ).toBe(0);
  });
});

describe("getWatchProgressText", () => {
  it("formats episode number and time correctly", () => {
    expect(
      getWatchProgressText(
        makeWatchProgress({ episodeNumber: 3, position: 125 }),
      ),
    ).toBe("第3集 2:05");
  });

  it("handles 0 position", () => {
    expect(
      getWatchProgressText(
        makeWatchProgress({ episodeNumber: 1, position: 0 }),
      ),
    ).toBe("第1集 0:00");
  });

  it("formats large position values", () => {
    expect(
      getWatchProgressText(
        makeWatchProgress({ episodeNumber: 10, position: 3661 }),
      ),
    ).toBe("第10集 61:01");
  });

  it("pads seconds with leading zero", () => {
    expect(
      getWatchProgressText(
        makeWatchProgress({ episodeNumber: 1, position: 63 }),
      ),
    ).toBe("第1集 1:03");
  });
});
