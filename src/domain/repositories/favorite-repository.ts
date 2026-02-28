import type { Result } from "@/core/errors/result";
import type { Favorite } from "@/domain/entities/favorite";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface IFavoriteRepository {
  getFavorites(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<Favorite>>>;
  addFavorite(movieId: string): Promise<Result<Favorite>>;
  removeFavorite(movieId: string): Promise<Result<boolean>>;
  removeFavorites(movieIds: string[]): Promise<Result<boolean>>;
}
