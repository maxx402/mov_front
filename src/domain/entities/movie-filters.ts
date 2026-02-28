import type { Genre } from "./genre";

export enum MovieSortType {
  Latest = "latest",
  Popular = "popular",
  Score = "score",
}

export interface MovieFilters {
  readonly areas: readonly string[];
  readonly years: readonly number[];
  readonly genres: readonly Genre[];
}

export interface MovieFilterParams {
  readonly area?: string;
  readonly year?: number;
  readonly genreId?: string;
  readonly categoryId?: string;
  readonly sortBy: MovieSortType;
}
