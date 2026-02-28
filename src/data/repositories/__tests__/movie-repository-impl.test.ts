import { describe, it, expect, vi, beforeEach } from "vitest";
import { MovieRepositoryImpl } from "../movie-repository-impl";

vi.mock("@/data/graphql/__generated__/graphql", () => ({
  MovieDetailDocument: { kind: "Document" },
  MoviesDocument: { kind: "Document" },
  RecommendedMoviesDocument: { kind: "Document" },
  MoviesByChannelDocument: { kind: "Document" },
  MoviesByTopicDocument: { kind: "Document" },
  MoviesByActorDocument: { kind: "Document" },
  MovieFiltersDocument: { kind: "Document" },
  HotMoviesDocument: { kind: "Document" },
  UpcomingMoviesDocument: { kind: "Document" },
  ReleasedMoviesDocument: { kind: "Document" },
}));

vi.mock("@/data/mappers/movie-mapper", () => ({
  mapMovieDetail: (d: any) => ({ id: d.id, title: d.title }),
  mapMovieListItem: (d: any) => ({ id: d.id, title: d.title }),
  mapGenre: (d: any) => d,
}));

vi.mock("@/data/mappers/episode-mapper", () => ({
  mapEpisode: (d: any) => ({ id: d.id }),
}));

vi.mock("@/data/mappers/paginator-mapper", () => ({
  mapPaginatedList: (d: any, fn: any) => ({
    items: d.data.map(fn),
    paginator: { currentPage: 1, lastPage: 1, hasMorePages: false, total: d.data.length },
  }),
}));

function createMockClient() {
  return { query: vi.fn(), mutate: vi.fn() } as any;
}

describe("MovieRepositoryImpl", () => {
  let client: ReturnType<typeof createMockClient>;
  let repo: MovieRepositoryImpl;

  beforeEach(() => {
    client = createMockClient();
    repo = new MovieRepositoryImpl(client);
  });

  describe("getMovieDetail", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: {
          movie: { id: "1", title: "M" },
          recommendedMovies: { data: [], paginatorInfo: {} },
        },
      });
      const result = await repo.getMovieDetail("1");
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMovieDetail("1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getMovie", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { movie: { id: "1", title: "M" }, recommendedMovies: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getMovie("1");
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMovie("1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getMovies", () => {
    it("returns paginated list", async () => {
      client.query.mockResolvedValue({
        data: { movies: { data: [{ id: "1" }], paginatorInfo: {} } },
      });
      const result = await repo.getMovies();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMovies();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getRecommendedMovies", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { recommendedMovies: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getRecommendedMovies({ movieId: "1" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getRecommendedMovies({ movieId: "1" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getMoviesByChannel", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { moviesByChannel: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getMoviesByChannel({ channelId: "1" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMoviesByChannel({ channelId: "1" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getMoviesByTopic", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { moviesByTopic: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getMoviesByTopic({ topicId: "1" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMoviesByTopic({ topicId: "1" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getMoviesByActor", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { moviesByActor: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getMoviesByActor({ actorId: "1" });
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getMoviesByActor({ actorId: "1" });
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getEpisodes", () => {
    it("returns episodes", async () => {
      client.query.mockResolvedValue({
        data: { movie: { episodes: [{ id: "e1" }] }, recommendedMovies: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getEpisodes("1");
      expect(result.isSuccess).toBe(true);
      expect(result.value!.length).toBe(1);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getEpisodes("1");
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getFilters", () => {
    it("returns filters", async () => {
      client.query.mockResolvedValue({
        data: { movieFilters: { areas: ["CN"], years: [2024], genres: [{ id: "1", name: "Action" }] } },
      });
      const result = await repo.getFilters();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getFilters();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getHotRankMovies", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { hotMovies: { data: [], paginatorInfo: {} } },
      });
      const result = await repo.getHotRankMovies();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getHotRankMovies();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getUpcomingMovies", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { upcomingMovies: { data: [], hasMorePages: false } },
      });
      const result = await repo.getUpcomingMovies();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getUpcomingMovies();
      expect(result.isFailure).toBe(true);
    });
  });

  describe("getReleasedMovies", () => {
    it("returns success", async () => {
      client.query.mockResolvedValue({
        data: { releasedMovies: { data: [], hasMorePages: false } },
      });
      const result = await repo.getReleasedMovies();
      expect(result.isSuccess).toBe(true);
    });

    it("returns failure on error", async () => {
      client.query.mockRejectedValue(new Error("fail"));
      const result = await repo.getReleasedMovies();
      expect(result.isFailure).toBe(true);
    });
  });
});
