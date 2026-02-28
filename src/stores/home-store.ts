import { makeAutoObservable, runInAction } from "mobx";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { IAdRepository } from "@/domain/repositories/ad-repository";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { Category, CategoryHome } from "@/domain/entities/category";

export class HomeStore {
  categories: Category[] = [];
  selectedCategoryIndex = 0;
  categoryHomeCache: Map<string, CategoryHome> = new Map();
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly adRepository: IAdRepository,
    private readonly movieRepository: IMovieRepository,
  ) {
    makeAutoObservable(this);
  }

  get selectedCategory(): Category | undefined {
    return this.categories[this.selectedCategoryIndex];
  }

  setSelectedCategoryIndex(index: number): void {
    this.selectedCategoryIndex = index;
    const category = this.categories[index];
    if (category && !this.categoryHomeCache.has(category.id)) {
      this.loadCategoryHome(category.id);
    }
  }

  async init(): Promise<void> {
    this.isLoading = true;
    const result = await this.categoryRepository.getCategories();
    runInAction(() => {
      result.fold(
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.userMessage;
        },
        (categories) => {
          this.categories = categories;
          if (categories.length > 0) {
            this.loadCategoryHome(categories[0].id);
          } else {
            this.isLoading = false;
          }
        },
      );
    });
  }

  async loadCategoryHome(categoryId: string): Promise<void> {
    if (this.categoryHomeCache.has(categoryId)) return;
    const result = await this.categoryRepository.getCategoryHome(categoryId);
    runInAction(() => {
      this.isLoading = false;
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (home) => { this.categoryHomeCache.set(categoryId, home); },
      );
    });
  }

  getCategoryHome(categoryId: string): CategoryHome | undefined {
    return this.categoryHomeCache.get(categoryId);
  }

  async refresh(): Promise<void> {
    this.categoryHomeCache.clear();
    await this.init();
  }
}
