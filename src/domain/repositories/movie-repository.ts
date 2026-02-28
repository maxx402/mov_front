import type { Result } from "@/core/errors/result";
import type { Movie } from "@/domain/entities/movie";
import type { Episode } from "@/domain/entities/episode";
import type { PaginatedList } from "@/domain/entities/paginator";
import type { MovieFilters, MovieSortType } from "@/domain/entities/movie-filters";
import type { MovieDetailResult } from "@/domain/entities/movie-detail-result";
import type { MoviesByDatePaginator } from "@/domain/entities/movies-by-date";

export interface IMovieRepository {
  getMovieDetail(id: string): Promise<Result<MovieDetailResult>>;
  getMovie(id: string): Promise<Result<Movie>>;
  getMovies(params?: {
    categoryId?: string;
    genreId?: string;
    area?: string;
    year?: number;
    sortBy?: MovieSortType;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getRecommendedMovies(params: {
    movieId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getMoviesByChannel(params: {
    channelId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getMoviesByTopic(params: {
    topicId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getMoviesByActor(params: {
    actorId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getEpisodes(movieId: string): Promise<Result<Episode[]>>;
  getFilters(): Promise<Result<MovieFilters>>;
  getHotRankMovies(params?: {
    categoryId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>>;
  getUpcomingMovies(params?: {
    page?: number;
    pageSize?: number;
  }): Promise<Result<MoviesByDatePaginator>>;
  getReleasedMovies(params?: {
    categoryId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<MoviesByDatePaginator>>;
}
