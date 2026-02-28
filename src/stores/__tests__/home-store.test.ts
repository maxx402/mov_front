import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { ApiFailure } from "@/core/errors/failure";
import { HomeStore } from "../home-store";

function createMockCategoryRepo() {
  return { getCategories: vi.fn(), getCategoryHome: vi.fn(), getChannelsByCategory: vi.fn() };
}
function createMockAdRepo() {
  return { getAds: vi.fn(), getAdSlots: vi.fn(), getAdvertisements: vi.fn(), recordAdImpression: vi.fn(), recordAdClick: vi.fn() };
}
function createMockMovieRepo() {
  return { getMovieDetail: vi.fn(), getMovie: vi.fn(), getMovies: vi.fn(), getRecommendedMovies: vi.fn(), getMoviesByChannel: vi.fn(), getMoviesByTopic: vi.fn(), getMoviesByActor: vi.fn(), getEpisodes: vi.fn(), getFilters: vi.fn(), getHotRankMovies: vi.fn(), getUpcomingMovies: vi.fn(), getReleasedMovies: vi.fn() };
}

describe("HomeStore", () => {
  let catRepo: ReturnType<typeof createMockCategoryRepo>;
  let adRepo: ReturnType<typeof createMockAdRepo>;
  let movieRepo: ReturnType<typeof createMockMovieRepo>;
  let store: HomeStore;

  beforeEach(() => {
    catRepo = createMockCategoryRepo();
    adRepo = createMockAdRepo();
    movieRepo = createMockMovieRepo();
    store = new HomeStore(catRepo, adRepo, movieRepo);
  });

  describe("init", () => {
    it("loads categories and first category home", async () => {
      catRepo.getCategories.mockResolvedValue(Result.success([{ id: "1", name: "Movies" }]));
      catRepo.getCategoryHome.mockResolvedValue(Result.success({ banners: [], grids: [], channels: [], hotMovies: [] }));
      await store.init();
      expect(store.categories.length).toBe(1);
      expect(store.getCategoryHome("1")).toBeDefined();
    });

    it("sets error on failure", async () => {
      catRepo.getCategories.mockResolvedValue(Result.failure(new ApiFailure({ message: "fail" })));
      await store.init();
      expect(store.errorMessage).toBeTruthy();
    });
  });

  describe("setSelectedCategoryIndex", () => {
    it("triggers load for new category", async () => {
      catRepo.getCategories.mockResolvedValue(Result.success([{ id: "1", name: "A" }, { id: "2", name: "B" }]));
      catRepo.getCategoryHome.mockResolvedValue(Result.success({ banners: [], grids: [], channels: [], hotMovies: [] }));
      await store.init();
      store.setSelectedCategoryIndex(1);
      expect(catRepo.getCategoryHome).toHaveBeenCalledWith("2");
    });
  });

  describe("selectedCategory", () => {
    it("returns selected category", async () => {
      catRepo.getCategories.mockResolvedValue(Result.success([{ id: "1", name: "A" }]));
      catRepo.getCategoryHome.mockResolvedValue(Result.success({ banners: [], grids: [], channels: [], hotMovies: [] }));
      await store.init();
      expect(store.selectedCategory?.id).toBe("1");
    });
  });

  describe("refresh", () => {
    it("clears cache and re-inits", async () => {
      catRepo.getCategories.mockResolvedValue(Result.success([]));
      await store.refresh();
      expect(catRepo.getCategories).toHaveBeenCalled();
    });
  });
});
