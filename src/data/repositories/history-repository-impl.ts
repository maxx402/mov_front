import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IHistoryRepository } from "@/domain/repositories/history-repository";
import type { WatchHistory } from "@/domain/entities/watch-history";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MyWatchHistoriesDocument,
  AddWatchHistoryDocument,
  RemoveWatchHistoriesDocument,
} from "@/data/graphql/__generated__/graphql";

function mapWatchHistory(data: any): WatchHistory {
  return {
    id: data.id,
    movieId: data.movie?.id ?? "",
    movieTitle: data.movie?.title ?? "",
    movieCover: data.movie?.cover ?? "",
    episodeNumber: data.episode?.episode_number ?? 0,
    progress: data.progress ?? 0,
    duration: data.duration ?? 0,
    watchedAt: data.watched_at,
    movieStatus: data.movie?.status ?? 0,
    movieCurrentEpisode: data.movie?.current_episode ?? 0,
    movieTotalEpisodes: data.movie?.total_episodes ?? 0,
  };
}

export class HistoryRepositoryImpl implements IHistoryRepository {
  constructor(private readonly client: ApolloClient) {}

  async getWatchHistories(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<WatchHistory>>> {
    try {
      const { data } = await this.client.query({
        query: MyWatchHistoriesDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 20 },
        fetchPolicy: "network-only",
      });
      return Result.success(mapPaginatedList(data!.myWatchHistories, mapWatchHistory));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async addWatchHistory(params: {
    movieId: string;
    episodeId: string;
    progress: number;
    duration: number;
  }): Promise<Result<WatchHistory | null>> {
    try {
      const { data } = await this.client.mutate({
        mutation: AddWatchHistoryDocument,
        variables: {
          input: {
            movie_id: params.movieId,
            episode_id: params.episodeId,
            progress: params.progress,
            duration: params.duration,
          },
        },
      });
      if (!data?.addWatchHistory) return Result.success(null);
      return Result.success(mapWatchHistory(data.addWatchHistory));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeWatchHistories(movieIds?: string[]): Promise<Result<number>> {
    try {
      const { data } = await this.client.mutate({
        mutation: RemoveWatchHistoriesDocument,
        variables: { movie_ids: movieIds },
      });
      return Result.success(data?.removeWatchHistories ?? 0);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
