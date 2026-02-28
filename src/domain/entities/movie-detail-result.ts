import type { Movie } from "./movie";
import type { PaginatedList } from "./paginator";

export interface MovieDetailResult {
  readonly movie: Movie;
  readonly recommendedMovies: PaginatedList<Movie>;
}
