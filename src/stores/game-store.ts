import { makeAutoObservable, runInAction } from "mobx";
import type { IGameRepository } from "@/domain/repositories/game-repository";
import type { Banner } from "@/domain/entities/banner";
import type { Game, GameCategoryInfo, GameCategory } from "@/domain/entities/game";
import type { PaginatorInfo } from "@/domain/entities/paginator";

interface GameListState {
  games: Game[];
  paginator: PaginatorInfo;
}

export class GameStore {
  banners: Banner[] = [];
  categories: GameCategoryInfo[] = [];
  selectedCategoryIndex = 0;
  isLoadingBanners = false;
  isLoadingCategories = false;
  errorMessage: string | null = null;
  private gameListCache: Map<string, GameListState> = new Map();

  constructor(private readonly repository: IGameRepository) {
    makeAutoObservable(this);
  }

  get selectedCategoryInfo(): GameCategoryInfo | undefined {
    return this.categories[this.selectedCategoryIndex];
  }

  get selectedCategory(): GameCategory | undefined {
    return this.selectedCategoryInfo?.category;
  }

  get currentGames(): Game[] {
    if (!this.selectedCategory) return [];
    return this.gameListCache.get(this.selectedCategory)?.games ?? [];
  }

  setSelectedCategoryIndex(index: number): void {
    this.selectedCategoryIndex = index;
    const cat = this.categories[index];
    if (cat && !this.gameListCache.has(cat.category)) {
      this.loadGames(cat.category, 1);
    }
  }

  async init(): Promise<void> {
    await Promise.all([this.loadBanners(), this.loadCategories()]);
  }

  private async loadBanners(): Promise<void> {
    this.isLoadingBanners = true;
    const result = await this.repository.getBanners();
    runInAction(() => {
      this.isLoadingBanners = false;
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (banners) => { this.banners = banners; },
      );
    });
  }

  private async loadCategories(): Promise<void> {
    this.isLoadingCategories = true;
    const result = await this.repository.getCategories();
    runInAction(() => {
      this.isLoadingCategories = false;
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (categories) => {
          this.categories = categories;
          if (categories.length > 0) {
            this.loadGames(categories[0].category, 1);
          }
        },
      );
    });
  }

  private async loadGames(category: GameCategory, page: number): Promise<void> {
    const result = await this.repository.getGames({ category, page, pageSize: 10 });
    runInAction(() => {
      result.fold(
        () => {},
        (list) => {
          const existing = this.gameListCache.get(category);
          if (page === 1 || !existing) {
            this.gameListCache.set(category, { games: [...list.items], paginator: list.paginator });
          } else {
            this.gameListCache.set(category, {
              games: [...existing.games, ...list.items],
              paginator: list.paginator,
            });
          }
        },
      );
    });
  }

  async refresh(): Promise<void> {
    await this.loadBanners();
    if (this.selectedCategory) {
      await this.loadGames(this.selectedCategory, 1);
    }
  }
}
