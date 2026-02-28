import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { NetworkFailure } from "@/core/errors/failure";
import { MovieDetailStore } from "../movie-detail-store";

function createMockMovieRepo() {
  return { getMovieDetail: vi.fn(), getMovie: vi.fn(), getMovies: vi.fn(), getRecommendedMovies: vi.fn(), getMoviesByChannel: vi.fn(), getMoviesByTopic: vi.fn(), getMoviesByActor: vi.fn(), getEpisodes: vi.fn(), getFilters: vi.fn(), getHotRankMovies: vi.fn(), getUpcomingMovies: vi.fn(), getReleasedMovies: vi.fn() };
}
function createMockFavRepo() {
  return { getFavorites: vi.fn(), addFavorite: vi.fn(), removeFavorite: vi.fn(), removeFavorites: vi.fn() };
}
function createMockSubRepo() {
  return { getSubscriptions: vi.fn(), addSubscription: vi.fn(), removeSubscription: vi.fn(), removeSubscriptions: vi.fn(), updateSubscription: vi.fn() };
}
function createMockCommentRepo() {
  return { getComments: vi.fn(), createComment: vi.fn(), deleteComment: vi.fn(), likeComment: vi.fn(), unlikeComment: vi.fn() };
}

const defaultPaginator = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };

const mockMovie = {
  id: "m1",
  title: "Movie",
  isFavorited: false,
  isSubscribed: false,
  episodes: [{ id: "e1", number: 1, title: "Ep1" }],
};

const mockDetail = {
  movie: mockMovie,
  recommendedMovies: {
    items: [{ id: "r1", title: "Rec1" }],
    paginator: defaultPaginator,
  },
};

function mockDetailSuccess(movieRepo: ReturnType<typeof createMockMovieRepo>, detail = mockDetail) {
  movieRepo.getMovieDetail.mockResolvedValue(Result.success(detail));
}

describe("MovieDetailStore", () => {
  let movieRepo: ReturnType<typeof createMockMovieRepo>;
  let favRepo: ReturnType<typeof createMockFavRepo>;
  let subRepo: ReturnType<typeof createMockSubRepo>;
  let commentRepo: ReturnType<typeof createMockCommentRepo>;
  let store: MovieDetailStore;

  beforeEach(() => {
    movieRepo = createMockMovieRepo();
    favRepo = createMockFavRepo();
    subRepo = createMockSubRepo();
    commentRepo = createMockCommentRepo();
    store = new MovieDetailStore(movieRepo, favRepo, subRepo, commentRepo);
  });

  describe("movieId", () => {
    it("returns null initially", () => {
      expect(store.movieId).toBeNull();
    });

    it("returns the movieId after init", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(store.movieId).toBe("m1");
    });
  });

  describe("isEmpty", () => {
    it("returns true when movie is null and not loading", () => {
      expect(store.isEmpty).toBe(true);
    });

    it("returns false when isLoading is true", () => {
      movieRepo.getMovieDetail.mockReturnValue(new Promise(() => {}));
      store.init("m1");
      expect(store.isEmpty).toBe(false);
    });

    it("returns false when movie is loaded", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(store.isEmpty).toBe(false);
    });
  });

  describe("init", () => {
    it("loads movie detail successfully", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");

      expect(store.movie).toEqual(mockMovie);
      expect(store.episodes).toEqual([{ id: "e1", number: 1, title: "Ep1" }]);
      expect(store.recommendedMovies).toEqual([{ id: "r1", title: "Rec1" }]);
      expect(store.isFavorited).toBe(false);
      expect(store.isSubscribed).toBe(false);
      expect(store.isLoading).toBe(false);
      expect(store.hasError).toBe(false);
    });

    it("sets hasError and errorMessage on failure", async () => {
      movieRepo.getMovieDetail.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "network error" })),
      );
      await store.init("m1");

      expect(store.hasError).toBe(true);
      expect(store.errorMessage).toBe("network error");
      expect(store.movie).toBeNull();
      expect(store.isLoading).toBe(false);
    });

    it("sets isFavorited and isSubscribed from movie detail", async () => {
      mockDetailSuccess(movieRepo, {
        movie: { ...mockMovie, isFavorited: true, isSubscribed: true },
        recommendedMovies: { items: [], paginator: defaultPaginator },
      });
      await store.init("m1");
      expect(store.isFavorited).toBe(true);
      expect(store.isSubscribed).toBe(true);
    });

    it("does not call loadData when movieId is not set (no _movieId)", async () => {
      // loadData guards on !_movieId, but init always sets _movieId first
      // so we test the guard indirectly via refresh with no movieId
      await store.refresh();
      expect(movieRepo.getMovieDetail).not.toHaveBeenCalled();
    });
  });

  describe("switchMovie", () => {
    it("resets state and loads new movie", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(store.movie).toEqual(mockMovie);

      const newMovie = { id: "m2", title: "Movie 2", isFavorited: true, isSubscribed: false, episodes: [] };
      movieRepo.getMovieDetail.mockResolvedValue(Result.success({
        movie: newMovie,
        recommendedMovies: { items: [], paginator: defaultPaginator },
      }));

      await store.switchMovie("m2");

      expect(store.movieId).toBe("m2");
      expect(store.movie).toEqual(newMovie);
      expect(store.isFavorited).toBe(true);
    });

    it("clears previous data during reset", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");

      movieRepo.getMovieDetail.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "fail" })),
      );
      await store.switchMovie("m2");

      expect(store.recommendedMovies).toEqual([]);
      expect(store.episodes).toEqual([]);
      expect(store.hasError).toBe(true);
    });
  });

  describe("refresh", () => {
    it("reloads movie detail", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(movieRepo.getMovieDetail).toHaveBeenCalledTimes(1);

      mockDetailSuccess(movieRepo);
      await store.refresh();
      expect(movieRepo.getMovieDetail).toHaveBeenCalledTimes(2);
    });

    it("does nothing when movieId is not set", async () => {
      await store.refresh();
      expect(movieRepo.getMovieDetail).not.toHaveBeenCalled();
    });
  });

  describe("toggleFavorite", () => {
    it("adds favorite when not favorited", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      favRepo.addFavorite.mockResolvedValue(Result.success({ id: "f1", movieId: "m1", movieTitle: "", movieCover: "", createdAt: "" }));

      const errorMsg = await store.toggleFavorite();

      expect(favRepo.addFavorite).toHaveBeenCalledWith("m1");
      expect(store.isFavorited).toBe(true);
      expect(errorMsg).toBeNull();
    });

    it("removes favorite when already favorited", async () => {
      mockDetailSuccess(movieRepo, {
        movie: { ...mockMovie, isFavorited: true },
        recommendedMovies: { items: [], paginator: defaultPaginator },
      });
      await store.init("m1");
      expect(store.isFavorited).toBe(true);

      favRepo.removeFavorite.mockResolvedValue(Result.success(undefined));
      const errorMsg = await store.toggleFavorite();

      expect(favRepo.removeFavorite).toHaveBeenCalledWith("m1");
      expect(store.isFavorited).toBe(false);
      expect(errorMsg).toBeNull();
    });

    it("reverts isFavorited on error", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(store.isFavorited).toBe(false);

      favRepo.addFavorite.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "fav error" })),
      );
      const errorMsg = await store.toggleFavorite();

      expect(store.isFavorited).toBe(false);
      expect(errorMsg).toBe("fav error");
    });

    it("returns null when isFavoriting is true (guard)", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");

      // Start a slow toggle
      favRepo.addFavorite.mockReturnValue(new Promise(() => {}));
      const firstToggle = store.toggleFavorite();
      expect(store.isFavoriting).toBe(true);

      // Second toggle should be guarded
      const result = await store.toggleFavorite();
      expect(result).toBeNull();
      expect(favRepo.addFavorite).toHaveBeenCalledTimes(1);

      // Cleanup: We don't await firstToggle since it never resolves
    });

    it("returns null when movieId is not set (guard)", async () => {
      const result = await store.toggleFavorite();
      expect(result).toBeNull();
      expect(favRepo.addFavorite).not.toHaveBeenCalled();
      expect(favRepo.removeFavorite).not.toHaveBeenCalled();
    });
  });

  describe("toggleSubscribe", () => {
    it("adds subscription when not subscribed", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      subRepo.addSubscription.mockResolvedValue(Result.success({ id: "s1", movieId: "m1", movieTitle: "", movieCover: "", notifyUpdate: true, createdAt: "" }));

      const errorMsg = await store.toggleSubscribe();

      expect(subRepo.addSubscription).toHaveBeenCalledWith({ movieId: "m1" });
      expect(store.isSubscribed).toBe(true);
      expect(errorMsg).toBeNull();
    });

    it("removes subscription when already subscribed", async () => {
      mockDetailSuccess(movieRepo, {
        movie: { ...mockMovie, isSubscribed: true },
        recommendedMovies: { items: [], paginator: defaultPaginator },
      });
      await store.init("m1");
      expect(store.isSubscribed).toBe(true);

      subRepo.removeSubscription.mockResolvedValue(Result.success(undefined));
      const errorMsg = await store.toggleSubscribe();

      expect(subRepo.removeSubscription).toHaveBeenCalledWith("m1");
      expect(store.isSubscribed).toBe(false);
      expect(errorMsg).toBeNull();
    });

    it("reverts isSubscribed on error", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(store.isSubscribed).toBe(false);

      subRepo.addSubscription.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "sub error" })),
      );
      const errorMsg = await store.toggleSubscribe();

      expect(store.isSubscribed).toBe(false);
      expect(errorMsg).toBe("sub error");
    });

    it("returns null when isSubscribing is true (guard)", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");

      subRepo.addSubscription.mockReturnValue(new Promise(() => {}));
      const firstToggle = store.toggleSubscribe();
      expect(store.isSubscribing).toBe(true);

      const result = await store.toggleSubscribe();
      expect(result).toBeNull();
      expect(subRepo.addSubscription).toHaveBeenCalledTimes(1);
    });

    it("returns null when movieId is not set (guard)", async () => {
      const result = await store.toggleSubscribe();
      expect(result).toBeNull();
      expect(subRepo.addSubscription).not.toHaveBeenCalled();
      expect(subRepo.removeSubscription).not.toHaveBeenCalled();
    });
  });

  describe("loadMoreRecommended", () => {
    it("loads next page of recommended movies and appends", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      expect(store.recommendedMovies).toEqual([{ id: "r1", title: "Rec1" }]);

      movieRepo.getRecommendedMovies.mockResolvedValue(Result.success({
        items: [{ id: "r2", title: "Rec2" }],
        paginator: { currentPage: 2, lastPage: 3, hasMorePages: true, total: 10 },
      }));

      await store.loadMoreRecommended();

      expect(movieRepo.getRecommendedMovies).toHaveBeenCalledWith({
        movieId: "m1",
        page: 2,
        pageSize: 6,
      });
      expect(store.recommendedMovies).toEqual([
        { id: "r1", title: "Rec1" },
        { id: "r2", title: "Rec2" },
      ]);
    });

    it("does nothing when movieId is not set (guard)", async () => {
      await store.loadMoreRecommended();
      expect(movieRepo.getRecommendedMovies).not.toHaveBeenCalled();
    });

    it("increments recommend page on each call", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");

      movieRepo.getRecommendedMovies.mockResolvedValue(Result.success({
        items: [],
        paginator: defaultPaginator,
      }));

      await store.loadMoreRecommended();
      expect(movieRepo.getRecommendedMovies).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));

      await store.loadMoreRecommended();
      expect(movieRepo.getRecommendedMovies).toHaveBeenCalledWith(expect.objectContaining({ page: 3 }));
    });

    it("does not modify recommendedMovies on error", async () => {
      mockDetailSuccess(movieRepo);
      await store.init("m1");
      const initialRecs = [...store.recommendedMovies];

      movieRepo.getRecommendedMovies.mockResolvedValue(
        Result.failure(new NetworkFailure({ message: "rec error" })),
      );
      await store.loadMoreRecommended();

      expect(store.recommendedMovies).toEqual(initialRecs);
    });
  });
});
