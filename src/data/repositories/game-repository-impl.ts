import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IGameRepository } from "@/domain/repositories/game-repository";
import type { Banner } from "@/domain/entities/banner";
import type { Game, GameCategory, GameCategoryInfo } from "@/domain/entities/game";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapBanner } from "@/data/mappers/category-mapper";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  GameBannersDocument,
  GameCategoriesDocument,
  GamesDocument,
} from "@/data/graphql/__generated__/graphql";

function mapGame(data: any): Game {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle ?? undefined,
    image: data.image,
    link: data.link,
  };
}

function mapGameCategoryInfo(data: any): GameCategoryInfo {
  return {
    category: data.category as GameCategory,
    name: data.name,
  };
}

export class GameRepositoryImpl implements IGameRepository {
  constructor(private readonly client: ApolloClient) {}

  async getBanners(): Promise<Result<Banner[]>> {
    try {
      const { data } = await this.client.query({ query: GameBannersDocument });
      return Result.success(data!.banners.map(mapBanner));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getCategories(): Promise<Result<GameCategoryInfo[]>> {
    try {
      const { data } = await this.client.query({ query: GameCategoriesDocument });
      return Result.success(data!.gameCategories.map(mapGameCategoryInfo));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getGames(params: {
    category: GameCategory;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Game>>> {
    try {
      const { data } = await this.client.query({
        query: GamesDocument,
        variables: {
          category: params.category.toUpperCase() as any,
          first: params.pageSize ?? 10,
          page: params.page ?? 1,
        },
      });
      return Result.success(mapPaginatedList(data!.games, mapGame));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
