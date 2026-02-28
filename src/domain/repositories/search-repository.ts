import type { Result } from "@/core/errors/result";
import type { Movie } from "@/domain/entities/movie";
import type { PaginatedList } from "@/domain/entities/paginator";
import type { HotKeyword, SearchHistory } from "@/domain/entities/search";

export interface ISearchRepository {
  searchMovies(params: {
    keyword: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getHotKeywords(): Promise<Result<HotKeyword[]>>;
  getSearchHistory(): Promise<Result<SearchHistory[]>>;
  addSearchHistory(keyword: string): Promise<Result<SearchHistory>>;
  removeSearchHistory(id: string): Promise<Result<boolean>>;
  clearSearchHistory(): Promise<Result<void>>;
}
