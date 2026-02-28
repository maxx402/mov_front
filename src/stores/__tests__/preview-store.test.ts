import { describe, it, expect, vi, beforeEach } from "vitest";
import { Result } from "@/core/errors/result";
import { PreviewStore } from "../preview-store";

function createMockMovieRepo() {
  return { getMovieDetail: vi.fn(), getMovie: vi.fn(), getMovies: vi.fn(), getRecommendedMovies: vi.fn(), getMoviesByChannel: vi.fn(), getMoviesByTopic: vi.fn(), getMoviesByActor: vi.fn(), getEpisodes: vi.fn(), getFilters: vi.fn(), getHotRankMovies: vi.fn(), getUpcomingMovies: vi.fn(), getReleasedMovies: vi.fn() };
}
function createMockCategoryRepo() {
  return { getCategories: vi.fn(), getCategoryHome: vi.fn(), getChannelsByCategory: vi.fn() };
}
function createMockReservationRepo() {
  return { getReservations: vi.fn(), addReservation: vi.fn(), removeReservation: vi.fn(), removeReservations: vi.fn() };
}

describe("PreviewStore", () => {
  let movieRepo: ReturnType<typeof createMockMovieRepo>;
  let catRepo: ReturnType<typeof createMockCategoryRepo>;
  let resRepo: ReturnType<typeof createMockReservationRepo>;
  let store: PreviewStore;

  beforeEach(() => {
    movieRepo = createMockMovieRepo();
    catRepo = createMockCategoryRepo();
    resRepo = createMockReservationRepo();
    store = new PreviewStore(movieRepo, catRepo, resRepo);
  });

  describe("init", () => {
    it("loads upcoming movies and categories", async () => {
      movieRepo.getUpcomingMovies.mockResolvedValue(Result.success({ data: [], hasMorePages: false }));
      catRepo.getCategories.mockResolvedValue(Result.success([{ id: "1", name: "Action" }]));
      await store.init();
      expect(movieRepo.getUpcomingMovies).toHaveBeenCalled();
      expect(catRepo.getCategories).toHaveBeenCalled();
    });
  });

  describe("setSelectedCategoryIndex", () => {
    it("loads released movies for selected category", async () => {
      movieRepo.getUpcomingMovies.mockResolvedValue(Result.success({ data: [], hasMorePages: false }));
      catRepo.getCategories.mockResolvedValue(Result.success([{ id: "c1", name: "Action" }, { id: "c2", name: "Comedy" }]));
      movieRepo.getReleasedMovies.mockResolvedValue(Result.success({ data: [], hasMorePages: false }));
      await store.init();
      store.setSelectedCategoryIndex(1);
      expect(movieRepo.getReleasedMovies).toHaveBeenCalled();
    });
  });

  describe("toggleReservation", () => {
    it("adds reservation", async () => {
      resRepo.addReservation.mockResolvedValue(Result.success({
        id: "r1", movieId: "m1", movieTitle: "M", movieCover: "", status: "upcoming", createdAt: "2024-01-01",
      }));
      await store.toggleReservation("m1");
      expect(resRepo.addReservation).toHaveBeenCalledWith("m1");
    });
  });
});
