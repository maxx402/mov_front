import { makeAutoObservable, runInAction } from "mobx";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { Movie } from "@/domain/entities/movie";
import type { Category } from "@/domain/entities/category";
import type { Genre } from "@/domain/entities/genre";
import type { MovieFilterParams } from "@/domain/entities/movie-filters";
import { MovieSortType } from "@/domain/entities/movie-filters";
import type { PaginatorInfo } from "@/domain/entities/paginator";

export class FilterStore {
  categories: Category[] = [];
  areas: string[] = [];
  years: number[] = [];
  genres: Genre[] = [];

  selectedCategoryId = "";
  selectedArea = "";
  selectedYear = "";
  selectedGenreId = "";
  selectedSort: MovieSortType = MovieSortType.Latest;

  movies: Movie[] = [];
  paginator: PaginatorInfo = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };
  isLoading = false;
  isLoadingMore = false;
  isRefreshing = false;
  errorMessage: string | null = null;

  constructor(
    private readonly movieRepository: IMovieRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {
    makeAutoObservable(this);
  }

  get filterParams(): MovieFilterParams {
    return {
      categoryId: this.selectedCategoryId || undefined,
      area: this.selectedArea || undefined,
      year: this.selectedYear ? parseInt(this.selectedYear) : undefined,
      genreId: this.selectedGenreId || undefined,
      sortBy: this.selectedSort,
    };
  }

  setSelectedCategoryId(value: string): void {
    this.selectedCategoryId = value;
    this.refreshList();
  }

  setSelectedArea(value: string): void {
    this.selectedArea = value;
    this.refreshList();
  }

  setSelectedYear(value: string): void {
    this.selectedYear = value;
    this.refreshList();
  }

  setSelectedGenreId(value: string): void {
    this.selectedGenreId = value;
    this.refreshList();
  }

  setSelectedSort(value: MovieSortType): void {
    this.selectedSort = value;
    this.refreshList();
  }

  async init(): Promise<void> {
    this.isLoading = true;
    await Promise.all([this.loadFilters(), this.loadCategories()]);
    await this.loadMovies(1);
  }

  private async loadFilters(): Promise<void> {
    const result = await this.movieRepository.getFilters();
    runInAction(() => {
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (filters) => {
          this.areas = [...filters.areas];
          this.years = [...filters.years];
          this.genres = [...filters.genres];
        },
      );
    });
  }

  private async loadCategories(): Promise<void> {
    const result = await this.categoryRepository.getCategories();
    runInAction(() => {
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (categories) => { this.categories = categories; },
      );
    });
  }

  async refreshList(): Promise<void> {
    this.isRefreshing = true;
    await this.loadMovies(1);
    runInAction(() => { this.isRefreshing = false; });
  }

  async loadMore(): Promise<void> {
    if (!this.paginator.hasMorePages || this.isLoadingMore) return;
    this.isLoadingMore = true;
    await this.loadMovies(this.paginator.currentPage + 1);
    runInAction(() => { this.isLoadingMore = false; });
  }

  private async loadMovies(page: number): Promise<void> {
    const result = await this.movieRepository.getMovies({
      ...this.filterParams,
      page,
      pageSize: 20,
    });
    runInAction(() => {
      this.isLoading = false;
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (list) => {
          if (page === 1) {
            this.movies = [...list.items];
          } else {
            this.movies = [...this.movies, ...list.items];
          }
          this.paginator = list.paginator;
        },
      );
    });
  }
}
