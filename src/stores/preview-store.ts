import { makeAutoObservable, runInAction } from "mobx";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { IReservationRepository } from "@/domain/repositories/reservation-repository";
import type { Category } from "@/domain/entities/category";
import type { MoviesByDate } from "@/domain/entities/movies-by-date";

export class PreviewStore {
  selectedTabIndex = 0;
  releasedCategories: Category[] = [];
  selectedCategoryIndex = 0;
  isLoading = false;

  upcomingMovies: MoviesByDate[] = [];
  upcomingHasMore = false;
  upcomingPage = 1;

  releasedMoviesCache: Map<string, MoviesByDate[]> = new Map();

  private _initialized = false;

  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly reservationRepository: IReservationRepository,
  ) {
    makeAutoObservable(this);
  }

  get selectedCategory(): Category | undefined {
    return this.releasedCategories[this.selectedCategoryIndex];
  }

  setSelectedTabIndex(index: number): void {
    this.selectedTabIndex = index;
  }

  setSelectedCategoryIndex(index: number): void {
    this.selectedCategoryIndex = index;
    const cat = this.releasedCategories[index];
    if (cat && !this.releasedMoviesCache.has(cat.id)) {
      this.loadReleasedMovies(cat.id);
    }
  }

  async init(): Promise<void> {
    if (this._initialized) return;
    this._initialized = true;
    this.isLoading = true;
    await Promise.all([this.loadUpcoming(), this.loadCategories()]);
    runInAction(() => { this.isLoading = false; });
  }

  private async loadCategories(): Promise<void> {
    const result = await this.categoryRepository.getCategories();
    runInAction(() => {
      result.fold(
        () => {},
        (categories) => { this.releasedCategories = categories; },
      );
    });
  }

  private async loadUpcoming(): Promise<void> {
    const result = await this.movieRepository.getUpcomingMovies({ page: 1, pageSize: 5 });
    runInAction(() => {
      result.fold(
        () => {},
        (paginator) => {
          this.upcomingMovies = [...paginator.data];
          this.upcomingHasMore = paginator.hasMorePages;
          this.upcomingPage = 1;
        },
      );
    });
  }

  private async loadReleasedMovies(categoryId: string): Promise<void> {
    const result = await this.movieRepository.getReleasedMovies({
      categoryId,
      page: 1,
      pageSize: 5,
    });
    runInAction(() => {
      result.fold(
        () => {},
        (paginator) => {
          this.releasedMoviesCache.set(categoryId, [...paginator.data]);
        },
      );
    });
  }

  async toggleReservation(movieId: string): Promise<void> {
    await this.reservationRepository.addReservation(movieId);
  }
}
