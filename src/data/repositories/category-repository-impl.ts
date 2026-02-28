import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { Category, CategoryHome } from "@/domain/entities/category";
import type { Channel } from "@/domain/entities/channel";
import type { PaginatedList } from "@/domain/entities/paginator";
import { mapCategory, mapCategoryHome, mapChannel } from "@/data/mappers/category-mapper";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  CategoriesDocument,
  CategoryHomeDocument,
  ChannelsByCategoryDocument,
} from "@/data/graphql/__generated__/graphql";

export class CategoryRepositoryImpl implements ICategoryRepository {
  constructor(private readonly client: ApolloClient) {}

  async getCategories(): Promise<Result<Category[]>> {
    try {
      const { data } = await this.client.query({ query: CategoriesDocument });
      return Result.success(data!.categories.map(mapCategory));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getCategoryHome(categoryId: string): Promise<Result<CategoryHome>> {
    try {
      const { data } = await this.client.query({
        query: CategoryHomeDocument,
        variables: { id: categoryId, movieFirst: 6 },
      });
      return Result.success(mapCategoryHome(data!.categoryHome));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getChannelsByCategory(params: {
    categoryId: string;
    isGrid?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Channel>>> {
    try {
      const { data } = await this.client.query({
        query: ChannelsByCategoryDocument,
        variables: {
          id: params.categoryId,
          page: params.page,
          first: params.pageSize ?? 10,
        },
      });
      return Result.success(mapPaginatedList(data!.channelsByCategory, mapChannel));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
