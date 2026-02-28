import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { NetworkFailure } from "@/core/errors/failure";
import { FilterStore } from "../filter-store";
import { MovieSortType } from "@/domain/entities/movie-filters";

function createMockMovieRepo() {
  return { getMovieDetail: vi.fn(), getMovie: vi.fn(), getMovies: vi.fn(), getRecommendedMovies: vi.fn(), getMoviesByChannel: vi.fn(), getMoviesByTopic: vi.fn(), getMoviesByActor: vi.fn(), getEpisodes: vi.fn(), getFilters: vi.fn(), getHotRankMovies: vi.fn(), getUpcomingMovies: vi.fn(), getReleasedMovies: vi.fn() };
}
function createMockCategoryRepo() {
  return { getCategories: vi.fn(), getCategoryHome: vi.fn(), getChannelsByCategory: vi.fn() };
}

const defaultPaginator = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };

function mockSuccessfulInit(movieRepo: ReturnType<typeof createMockMovieRepo>, catRepo: ReturnType<typeof createMockCategoryRepo>) {
  catRepo.getCategories.mockResolvedValue(Result.success([{ id: "1", name: "Action" }]));
  movieRepo.getFilters.mockResolvedValue(Result.success({ areas: ["CN", "US"], years: [2024, 2023], genres: [{ id: "g1", name: "Comedy" }] }));
  movieRepo.getMovies.mockResolvedValue(Result.success({ items: [{ id: "m1", title: "Movie1" }], paginator: { ...defaultPaginator, total: 1 } }));
}

describe("FilterStore", () => {
  let movieRepo: ReturnType<typeof createMockMovieRepo>;
  let catRepo: ReturnType<typeof createMockCategoryRepo>;
  let store: FilterStore;

  beforeEach(() => {
    movieRepo = createMockMovieRepo();
    catRepo = createMockCategoryRepo();
    store = new FilterStore(movieRepo, catRepo);
  });

  describe("filterParams", () => {
    it("returns default params with only sortBy when nothing selected", () => {
      const params = store.filterParams;
      expect(params).toEqual({
        categoryId: undefined,
        area: undefined,
        year: undefined,
        genreId: undefined,
        sortBy: MovieSortType.Latest,
      });
    });

    it("includes categoryId when selected", () => {
      store.selectedCategoryId = "cat1";
      expect(store.filterParams.categoryId).toBe("cat1");
    });

    it("includes area when selected", () => {
      store.selectedArea = "CN";
      expect(store.filterParams.area).toBe("CN");
    });

    it("parses year as integer when selected", () => {
      store.selectedYear = "2024";
      expect(store.filterParams.year).toBe(2024);
    });

    it("includes genreId when selected", () => {
      store.selectedGenreId = "g1";
      expect(store.filterParams.genreId).toBe("g1");
    });

    it("includes sortBy", () => {
      store.selectedSort = MovieSortType.Popular;
      expect(store.filterParams.sortBy).toBe(MovieSortType.Popular);
    });

    it("returns all filter fields when all selected", () => {
      store.selectedCategoryId = "cat1";
      store.selectedArea = "US";
      store.selectedYear = "2023";
      store.selectedGenreId = "g2";
      store.selectedSort = MovieSortType.Score;
      expect(store.filterParams).toEqual({
        categoryId: "cat1",
        area: "US",
        year: 2023,
        genreId: "g2",
        sortBy: MovieSortType.Score,
      });
    });
  });

  describe("init", () => {
    it("loads filters, categories, and movies on success", async () => {
      mockSuccessfulInit(movieRepo, catRepo);
      await store.init();

      expect(catRepo.getCategories).toHaveBeenCalledTimes(1);
      expect(movieRepo.getFilters).toHaveBeenCalledTimes(1);
      expect(movieRepo.getMovies).toHaveBeenCalledTimes(1);
      expect(store.categories).toEqual([{ id: "1", name: "Action" }]);
      expect(store.areas).toEqual(["CN", "US"]);
      expect(store.years).toEqual([2024, 2023]);
      expect(store.genres).toEqual([{ id: "g1", name: "Comedy" }]);
      expect(store.movies).toEqual([{ id: "m1", title: "Movie1" }]);
      expect(store.isLoading).toBe(false);
    });

    it("sets isLoading to true initially", () => {
      catRepo.getCategories.mockReturnValue(new Promise(() => {}));
      movieRepo.getFilters.mockReturnValue(new Promise(() => {}));
      store.init();
      expect(store.isLoading).toBe(true);
    });

    it("sets errorMessage when loadFilters fails", async () => {
      catRepo.getCategories.mockResolvedValue(Result.success([]));
      movieRepo.getFilters.mockResolvedValue(Result.failure(new NetworkFailure({ message: "filter error" })));
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      await store.init();
      expect(store.errorMessage).toBe("filter error");
    });

    it("sets errorMessage when loadCategories fails", async () => {
      movieRepo.getFilters.mockResolvedValue(Result.success({ areas: [], years: [], genres: [] }));
      catRepo.getCategories.mockResolvedValue(Result.failure(new NetworkFailure({ message: "category error" })));
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      await store.init();
      expect(store.errorMessage).toBe("category error");
    });

    it("sets errorMessage when loadMovies fails", async () => {
      catRepo.getCategories.mockResolvedValue(Result.success([]));
      movieRepo.getFilters.mockResolvedValue(Result.success({ areas: [], years: [], genres: [] }));
      movieRepo.getMovies.mockResolvedValue(Result.failure(new NetworkFailure({ message: "movies error" })));
      await store.init();
      expect(store.errorMessage).toBe("movies error");
    });
  });

  describe("setSelectedCategoryId", () => {
    it("sets value and triggers refreshList", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      store.setSelectedCategoryId("cat2");
      expect(store.selectedCategoryId).toBe("cat2");
      await vi.waitFor(() => {
        expect(movieRepo.getMovies).toHaveBeenCalled();
      });
    });
  });

  describe("setSelectedArea", () => {
    it("sets value and triggers refreshList", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      store.setSelectedArea("US");
      expect(store.selectedArea).toBe("US");
      await vi.waitFor(() => {
        expect(movieRepo.getMovies).toHaveBeenCalled();
      });
    });
  });

  describe("setSelectedYear", () => {
    it("sets value and triggers refreshList", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      store.setSelectedYear("2023");
      expect(store.selectedYear).toBe("2023");
      await vi.waitFor(() => {
        expect(movieRepo.getMovies).toHaveBeenCalled();
      });
    });
  });

  describe("setSelectedGenreId", () => {
    it("sets value and triggers refreshList", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      store.setSelectedGenreId("g5");
      expect(store.selectedGenreId).toBe("g5");
      await vi.waitFor(() => {
        expect(movieRepo.getMovies).toHaveBeenCalled();
      });
    });
  });

  describe("setSelectedSort", () => {
    it("sets value and triggers refreshList", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.success({ items: [], paginator: defaultPaginator }));
      store.setSelectedSort(MovieSortType.Score);
      expect(store.selectedSort).toBe(MovieSortType.Score);
      await vi.waitFor(() => {
        expect(movieRepo.getMovies).toHaveBeenCalled();
      });
    });
  });

  describe("refreshList", () => {
    it("sets isRefreshing, loads movies page 1, and resets isRefreshing", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.success({
        items: [{ id: "m2", title: "Refreshed" }],
        paginator: { currentPage: 1, lastPage: 1, hasMorePages: false, total: 1 },
      }));

      const promise = store.refreshList();
      expect(store.isRefreshing).toBe(true);
      await promise;

      expect(store.isRefreshing).toBe(false);
      expect(store.movies).toEqual([{ id: "m2", title: "Refreshed" }]);
      expect(movieRepo.getMovies).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
    });

    it("replaces movies on page 1", async () => {
      store.movies = [{ id: "old" } as any];
      movieRepo.getMovies.mockResolvedValue(Result.success({
        items: [{ id: "new" }],
        paginator: defaultPaginator,
      }));
      await store.refreshList();
      expect(store.movies).toEqual([{ id: "new" }]);
    });

    it("sets errorMessage on failure", async () => {
      movieRepo.getMovies.mockResolvedValue(Result.failure(new NetworkFailure({ message: "refresh fail" })));
      await store.refreshList();
      expect(store.errorMessage).toBe("refresh fail");
    });
  });

  describe("loadMore", () => {
    it("skips when hasMorePages is false", async () => {
      store.paginator = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 5 };
      await store.loadMore();
      expect(movieRepo.getMovies).not.toHaveBeenCalled();
    });

    it("skips when isLoadingMore is true", async () => {
      store.paginator = { currentPage: 1, lastPage: 3, hasMorePages: true, total: 50 };
      store.isLoadingMore = true;
      await store.loadMore();
      expect(movieRepo.getMovies).not.toHaveBeenCalled();
    });

    it("appends movies on success for page > 1", async () => {
      store.movies = [{ id: "m1" } as any];
      store.paginator = { currentPage: 1, lastPage: 3, hasMorePages: true, total: 50 };
      movieRepo.getMovies.mockResolvedValue(Result.success({
        items: [{ id: "m2" }],
        paginator: { currentPage: 2, lastPage: 3, hasMorePages: true, total: 50 },
      }));

      const promise = store.loadMore();
      expect(store.isLoadingMore).toBe(true);
      await promise;

      expect(store.isLoadingMore).toBe(false);
      expect(store.movies).toEqual([{ id: "m1" }, { id: "m2" }]);
      expect(movieRepo.getMovies).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));
    });

    it("updates paginator after loading more", async () => {
      store.paginator = { currentPage: 1, lastPage: 3, hasMorePages: true, total: 50 };
      movieRepo.getMovies.mockResolvedValue(Result.success({
        items: [{ id: "m2" }],
        paginator: { currentPage: 2, lastPage: 3, hasMorePages: true, total: 50 },
      }));
      await store.loadMore();
      expect(store.paginator.currentPage).toBe(2);
    });

    it("sets errorMessage on failure during loadMore", async () => {
      store.paginator = { currentPage: 1, lastPage: 3, hasMorePages: true, total: 50 };
      movieRepo.getMovies.mockResolvedValue(Result.failure(new NetworkFailure({ message: "loadMore fail" })));
      await store.loadMore();
      expect(store.errorMessage).toBe("loadMore fail");
    });
  });
});
