import { describe, it, expect, vi } from "vitest";
import {
  mapMovieStatus,
  mapRoleType,
  mapGenre,
  mapActorRole,
  mapWatchProgress,
  mapMovieDetail,
  mapMovieListItem,
} from "../movie-mapper";
import { MovieStatus, ActorRoleType } from "@/domain/entities/movie";

vi.mock("../episode-mapper", () => ({
  mapEpisode: (data: any) => ({
    id: data.id,
    number: data.episode_number ?? 0,
    title: data.title,
    duration: data.duration ?? 0,
    playLines: [],
  }),
}));

describe("mapMovieStatus", () => {
  it("maps 0 to Preview", () => {
    expect(mapMovieStatus(0)).toBe(MovieStatus.Preview);
  });

  it("maps 1 to Ongoing", () => {
    expect(mapMovieStatus(1)).toBe(MovieStatus.Ongoing);
  });

  it("maps 2 to Completed", () => {
    expect(mapMovieStatus(2)).toBe(MovieStatus.Completed);
  });

  it("defaults to Ongoing for unknown values", () => {
    expect(mapMovieStatus(99)).toBe(MovieStatus.Ongoing);
    expect(mapMovieStatus(null)).toBe(MovieStatus.Ongoing);
    expect(mapMovieStatus(undefined)).toBe(MovieStatus.Ongoing);
    expect(mapMovieStatus("invalid")).toBe(MovieStatus.Ongoing);
  });
});

describe("mapRoleType", () => {
  it('maps "director" to Director', () => {
    expect(mapRoleType("director")).toBe(ActorRoleType.Director);
  });

  it('maps "writer" to Writer', () => {
    expect(mapRoleType("writer")).toBe(ActorRoleType.Writer);
  });

  it('maps "producer" to Producer', () => {
    expect(mapRoleType("producer")).toBe(ActorRoleType.Producer);
  });

  it("defaults to Actor for unknown values", () => {
    expect(mapRoleType("actor")).toBe(ActorRoleType.Actor);
    expect(mapRoleType("unknown")).toBe(ActorRoleType.Actor);
    expect(mapRoleType(null)).toBe(ActorRoleType.Actor);
    expect(mapRoleType(undefined)).toBe(ActorRoleType.Actor);
  });
});

describe("mapGenre", () => {
  it("maps id and name", () => {
    const result = mapGenre({ id: "g1", name: "Action" });

    expect(result).toEqual({ id: "g1", name: "Action" });
  });
});

describe("mapActorRole", () => {
  it("maps all actor fields when provided", () => {
    const data = {
      actor: { id: "a1", name: "Actor Name", avatar: "https://example.com/a.png" },
      role: "director",
      character: "Hero",
    };

    const result = mapActorRole(data);

    expect(result).toEqual({
      actorId: "a1",
      name: "Actor Name",
      avatar: "https://example.com/a.png",
      role: ActorRoleType.Director,
      character: "Hero",
    });
  });

  it("defaults to empty strings and undefined when actor is null", () => {
    const data = { actor: null, role: null, character: null };

    const result = mapActorRole(data);

    expect(result).toEqual({
      actorId: "",
      name: "",
      avatar: undefined,
      role: ActorRoleType.Actor,
      character: undefined,
    });
  });

  it("defaults to empty strings when actor is undefined", () => {
    const data = {};

    const result = mapActorRole(data);

    expect(result.actorId).toBe("");
    expect(result.name).toBe("");
    expect(result.avatar).toBeUndefined();
  });

  it("converts null avatar to undefined", () => {
    const data = {
      actor: { id: "a2", name: "No Avatar", avatar: null },
    };

    const result = mapActorRole(data);

    expect(result.avatar).toBeUndefined();
  });
});

describe("mapWatchProgress", () => {
  it("maps fields from episode_id and position", () => {
    const data = {
      episode_id: "e1",
      episode: { id: "e1", episode_number: 3 },
      position: 120,
      duration: 3600,
    };

    const result = mapWatchProgress(data);

    expect(result).toEqual({
      episodeId: "e1",
      episodeNumber: 3,
      position: 120,
      duration: 3600,
    });
  });

  it("falls back to episode.id when episode_id is missing", () => {
    const data = {
      episode: { id: "e2", episode_number: 5 },
      position: 60,
      duration: 1800,
    };

    const result = mapWatchProgress(data);

    expect(result.episodeId).toBe("e2");
    expect(result.episodeNumber).toBe(5);
  });

  it("falls back to progress when position is missing", () => {
    const data = {
      episode_id: "e3",
      episode: { id: "e3", episode_number: 1 },
      progress: 300,
      duration: 600,
    };

    const result = mapWatchProgress(data);

    expect(result.position).toBe(300);
  });

  it("defaults to zero for all numeric fields when data is minimal", () => {
    const data = {};

    const result = mapWatchProgress(data);

    expect(result).toEqual({
      episodeId: "",
      episodeNumber: 0,
      position: 0,
      duration: 0,
    });
  });
});

describe("mapMovieDetail", () => {
  it("maps a full movie detail payload", () => {
    const data = {
      id: "m1",
      title: "Test Movie",
      cover: "https://example.com/cover.jpg",
      score: 8.5,
      year: 2024,
      area: "US",
      quality: "1080P",
      description: "A great movie",
      total_episodes: 12,
      current_episode: 6,
      status: 1,
      statistics: {
        view_count: 50000,
        favorite_count: 1200,
      },
      genres: [{ id: "g1", name: "Action" }],
      credits: [
        {
          actor: { id: "a1", name: "Director One", avatar: null },
          role: "director",
          character: null,
        },
      ],
      episodes: [
        { id: "ep1", episode_number: 1, title: "Pilot", duration: 2400 },
      ],
      lastWatchHistory: {
        episode_id: "ep1",
        episode: { id: "ep1", episode_number: 1 },
        position: 600,
        duration: 2400,
      },
      isFavorited: true,
      isSubscribed: false,
      isReserved: true,
    };

    const result = mapMovieDetail(data);

    expect(result.id).toBe("m1");
    expect(result.title).toBe("Test Movie");
    expect(result.cover).toBe("https://example.com/cover.jpg");
    expect(result.score).toBe(8.5);
    expect(result.year).toBe(2024);
    expect(result.area).toBe("US");
    expect(result.quality).toBe("1080P");
    expect(result.description).toBe("A great movie");
    expect(result.totalEpisodes).toBe(12);
    expect(result.currentEpisode).toBe(6);
    expect(result.status).toBe(MovieStatus.Ongoing);
    expect(result.viewCount).toBe(50000);
    expect(result.favoriteCount).toBe(1200);
    expect(result.genres).toEqual([{ id: "g1", name: "Action" }]);
    expect(result.actors).toEqual([
      {
        actorId: "a1",
        name: "Director One",
        avatar: undefined,
        role: ActorRoleType.Director,
        character: undefined,
      },
    ]);
    expect(result.episodes).toEqual([
      { id: "ep1", number: 1, title: "Pilot", duration: 2400, playLines: [] },
    ]);
    expect(result.watchProgress).toEqual({
      episodeId: "ep1",
      episodeNumber: 1,
      position: 600,
      duration: 2400,
    });
    expect(result.isFavorited).toBe(true);
    expect(result.isSubscribed).toBe(false);
    expect(result.isReserved).toBe(true);
  });

  it("applies defaults for missing optional fields", () => {
    const data = {
      id: "m2",
      title: "Minimal Movie",
      cover: "https://example.com/minimal.jpg",
    };

    const result = mapMovieDetail(data);

    expect(result.score).toBe(0);
    expect(result.year).toBeUndefined();
    expect(result.area).toBeUndefined();
    expect(result.quality).toBeUndefined();
    expect(result.description).toBeUndefined();
    expect(result.totalEpisodes).toBe(1);
    expect(result.currentEpisode).toBe(1);
    expect(result.status).toBe(MovieStatus.Ongoing);
    expect(result.viewCount).toBeUndefined();
    expect(result.favoriteCount).toBeUndefined();
    expect(result.genres).toEqual([]);
    expect(result.actors).toEqual([]);
    expect(result.episodes).toEqual([]);
    expect(result.watchProgress).toBeUndefined();
    expect(result.isFavorited).toBe(false);
    expect(result.isSubscribed).toBe(false);
    expect(result.isReserved).toBe(false);
  });

  it("sets watchProgress to undefined when lastWatchHistory is absent", () => {
    const data = {
      id: "m3",
      title: "No Watch History",
      cover: "cover.jpg",
      lastWatchHistory: null,
    };

    const result = mapMovieDetail(data);

    expect(result.watchProgress).toBeUndefined();
  });

  it("maps statistics viewCount/favoriteCount to undefined when statistics is missing", () => {
    const data = {
      id: "m4",
      title: "No Stats",
      cover: "cover.jpg",
      statistics: undefined,
    };

    const result = mapMovieDetail(data);

    expect(result.viewCount).toBeUndefined();
    expect(result.favoriteCount).toBeUndefined();
  });
});

describe("mapMovieListItem", () => {
  it("maps a movie list item with all fields", () => {
    const data = {
      id: "m10",
      title: "List Movie",
      cover: "https://example.com/list.jpg",
      score: 7.2,
      year: 2023,
      area: "CN",
      quality: "4K",
      description: "A list movie",
      total_episodes: 24,
      current_episode: 12,
      status: 2,
      statistics: { view_count: 10000 },
      genres: [{ id: "g2", name: "Drama" }],
    };

    const result = mapMovieListItem(data);

    expect(result.id).toBe("m10");
    expect(result.title).toBe("List Movie");
    expect(result.cover).toBe("https://example.com/list.jpg");
    expect(result.score).toBe(7.2);
    expect(result.year).toBe(2023);
    expect(result.area).toBe("CN");
    expect(result.quality).toBe("4K");
    expect(result.description).toBe("A list movie");
    expect(result.totalEpisodes).toBe(24);
    expect(result.currentEpisode).toBe(12);
    expect(result.status).toBe(MovieStatus.Completed);
    expect(result.viewCount).toBe(10000);
    expect(result.genres).toEqual([{ id: "g2", name: "Drama" }]);
  });

  it("sets actors, episodes, watchProgress to undefined", () => {
    const data = {
      id: "m11",
      title: "Simple",
      cover: "cover.jpg",
    };

    const result = mapMovieListItem(data);

    expect(result.actors).toBeUndefined();
    expect(result.episodes).toBeUndefined();
    expect(result.watchProgress).toBeUndefined();
    expect(result.favoriteCount).toBeUndefined();
    expect(result.isFavorited).toBe(false);
    expect(result.isSubscribed).toBe(false);
    expect(result.isReserved).toBe(false);
  });

  it("sets genres to undefined when genres array is empty", () => {
    const data = {
      id: "m12",
      title: "No Genres",
      cover: "cover.jpg",
      genres: [],
    };

    const result = mapMovieListItem(data);

    expect(result.genres).toBeUndefined();
  });

  it("defaults totalEpisodes and currentEpisode to 1", () => {
    const data = {
      id: "m13",
      title: "Defaults",
      cover: "cover.jpg",
    };

    const result = mapMovieListItem(data);

    expect(result.totalEpisodes).toBe(1);
    expect(result.currentEpisode).toBe(1);
  });
});
