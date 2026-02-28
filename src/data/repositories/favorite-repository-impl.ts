import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IFavoriteRepository } from "@/domain/repositories/favorite-repository";
import type { Favorite } from "@/domain/entities/favorite";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MyFavoritesDocument,
  AddFavoriteDocument,
  RemoveFavoriteDocument,
  RemoveFavoritesDocument,
} from "@/data/graphql/__generated__/graphql";

function mapFavorite(data: any): Favorite {
  return {
    id: data.id,
    movieId: data.movie_id ?? data.movie?.id ?? "",
    movieTitle: data.movie?.title ?? "",
    movieCover: data.movie?.cover ?? "",
    status: data.movie?.status?.toString() ?? undefined,
    createdAt: data.created_at,
  };
}

export class FavoriteRepositoryImpl implements IFavoriteRepository {
  constructor(private readonly client: ApolloClient) {}

  async getFavorites(params?: { page?: number; pageSize?: number }): Promise<Result<PaginatedList<Favorite>>> {
    try {
      const { data } = await this.client.query({
        query: MyFavoritesDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 20 },
      });
      return Result.success(mapPaginatedList(data!.myFavorites, mapFavorite));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async addFavorite(movieId: string): Promise<Result<Favorite>> {
    try {
      const { data } = await this.client.mutate({
        mutation: AddFavoriteDocument,
        variables: { movieId },
      });
      const r = data!.addFavorite!;
      return Result.success({
        id: r.id,
        movieId: r.movie_id,
        movieTitle: "",
        movieCover: "",
        createdAt: r.created_at,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeFavorite(movieId: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: RemoveFavoriteDocument, variables: { movieId } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeFavorites(movieIds: string[]): Promise<Result<boolean>> {
    try {
      await this.client.mutate({ mutation: RemoveFavoritesDocument, variables: { movie_ids: movieIds } });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
