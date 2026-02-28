import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { ISearchRepository } from "@/domain/repositories/search-repository";
import type { Movie } from "@/domain/entities/movie";
import type { PaginatedList } from "@/domain/entities/paginator";
import type { HotKeyword, SearchHistory } from "@/domain/entities/search";
import { HotKeywordType } from "@/domain/entities/search";
import { mapMovieListItem } from "@/data/mappers/movie-mapper";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  SearchDocument,
  SearchType,
  HotKeywordsDocument,
  MySearchHistoriesDocument,
  AddSearchHistoryDocument,
  RemoveSearchHistoryDocument,
  ClearSearchHistoriesDocument,
} from "@/data/graphql/__generated__/graphql";

function mapHotKeywordType(value: unknown): HotKeywordType {
  switch (String(value).toLowerCase()) {
    case "movie": return HotKeywordType.Movie;
    case "actor": return HotKeywordType.Actor;
    case "genre": return HotKeywordType.Genre;
    default: return HotKeywordType.Custom;
  }
}

export class SearchRepositoryImpl implements ISearchRepository {
  constructor(private readonly client: ApolloClient) {}

  async searchMovies(params: { keyword: string; page?: number; pageSize?: number }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: SearchDocument,
        variables: {
          keyword: params.keyword,
          type: SearchType.Movie,
          page: params.page ?? 1,
          first: params.pageSize ?? 20
        },
      });
      const searchResult = data!.search;
      return Result.success({
        items: (searchResult.movies ?? []).map(mapMovieListItem),
        paginator: {
          currentPage: searchResult.paginatorInfo.currentPage,
          lastPage: 1,
          hasMorePages: searchResult.paginatorInfo.hasMorePages,
          total: searchResult.paginatorInfo.total,
        }
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getHotKeywords(): Promise<Result<HotKeyword[]>> {
    try {
      const { data } = await this.client.query({ query: HotKeywordsDocument });
      const keywords: HotKeyword[] = data!.hotKeywords.map((k: any) => ({
        id: k.id,
        keyword: k.keyword,
        type: mapHotKeywordType(k.type),
        linkId: k.link_id ?? undefined,
      }));
      return Result.success(keywords);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getSearchHistory(): Promise<Result<SearchHistory[]>> {
    try {
      const { data } = await this.client.query({ query: MySearchHistoriesDocument });
      const histories: SearchHistory[] = data!.mySearchHistories.map((h: any) => ({
        id: h.id,
        keyword: h.keyword,
        createdAt: h.created_at,
      }));
      return Result.success(histories);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async addSearchHistory(keyword: string): Promise<Result<SearchHistory>> {
    try {
      const { data } = await this.client.mutate({
        mutation: AddSearchHistoryDocument,
        variables: { keyword },
      });
      const h = data!.addSearchHistory!;
      return Result.success({ id: h.id, keyword: h.keyword, createdAt: h.created_at });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async removeSearchHistory(id: string): Promise<Result<boolean>> {
    try {
      await this.client.mutate({
        mutation: RemoveSearchHistoryDocument,
        variables: { id },
      });
      return Result.success(true);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async clearSearchHistory(): Promise<Result<void>> {
    try {
      await this.client.mutate({ mutation: ClearSearchHistoriesDocument });
      return Result.success(undefined);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
