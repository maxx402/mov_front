import type { Movie } from "./movie";

export interface MoviesByDate {
  readonly date: string;
  readonly label: string;
  readonly count: number;
  readonly movies: readonly Movie[];
}

export interface MoviesByDatePaginator {
  readonly data: readonly MoviesByDate[];
  readonly hasMorePages: boolean;
}
