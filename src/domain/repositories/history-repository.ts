import type { Result } from "@/core/errors/result";
import type { WatchHistory } from "@/domain/entities/watch-history";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface IHistoryRepository {
  getWatchHistories(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<WatchHistory>>>;
  addWatchHistory(params: {
    movieId: string;
    episodeId: string;
    progress: number;
    duration: number;
  }): Promise<Result<WatchHistory | null>>;
  removeWatchHistories(movieIds?: string[]): Promise<Result<number>>;
}
