import type { Result } from "@/core/errors/result";
import type { Banner } from "@/domain/entities/banner";
import type { Game, GameCategory, GameCategoryInfo } from "@/domain/entities/game";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface IGameRepository {
  getBanners(): Promise<Result<Banner[]>>;
  getCategories(): Promise<Result<GameCategoryInfo[]>>;
  getGames(params: {
    category: GameCategory;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Game>>>;
}
