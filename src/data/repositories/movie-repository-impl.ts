import type { ApolloClient } from "@apollo/client";
import { Result } from "@/core/errors/result";
import { FailureMapper } from "@/core/errors/failure-mapper";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { Movie } from "@/domain/entities/movie";
import type { Episode } from "@/domain/entities/episode";
import type { PaginatedList } from "@/domain/entities/paginator";
import type { MovieFilters } from "@/domain/entities/movie-filters";
import { MovieSortType } from "@/domain/entities/movie-filters";
import type { MovieDetailResult } from "@/domain/entities/movie-detail-result";
import type { MoviesByDatePaginator, MoviesByDate } from "@/domain/entities/movies-by-date";
import { mapMovieDetail, mapMovieListItem, mapGenre } from "@/data/mappers/movie-mapper";
import { mapEpisode } from "@/data/mappers/episode-mapper";
import { mapPaginatedList } from "@/data/mappers/paginator-mapper";
import {
  MovieDetailDocument,
  MoviesDocument,
  RecommendedMoviesDocument,
  MoviesByChannelDocument,
  MoviesByTopicDocument,
  MoviesByActorDocument,
  MovieFiltersDocument,
  HotMoviesDocument,
  UpcomingMoviesDocument,
  ReleasedMoviesDocument,
} from "@/data/graphql/__generated__/graphql";

export class MovieRepositoryImpl implements IMovieRepository {
  constructor(private readonly client: ApolloClient) {}

  async getMovieDetail(id: string): Promise<Result<MovieDetailResult>> {
    try {
      const { data } = await this.client.query({
        query: MovieDetailDocument,
        variables: { id, recommendMoviesFirst: 6 },
      });
      const movie = mapMovieDetail(data!.movie);
      const recommendedMovies = mapPaginatedList(
        data!.recommendedMovies,
        mapMovieListItem,
      );
      return Result.success({ movie, recommendedMovies });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMovie(id: string): Promise<Result<Movie>> {
    try {
      const { data } = await this.client.query({
        query: MovieDetailDocument,
        variables: { id, recommendMoviesFirst: 0 },
      });
      return Result.success(mapMovieDetail(data!.movie));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMovies(params?: {
    categoryId?: string;
    genreId?: string;
    area?: string;
    year?: number;
    sortBy?: MovieSortType;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: MoviesDocument,
        variables: {
          categoryId: params?.categoryId,
          genreId: params?.genreId,
          area: params?.area,
          year: params?.year,
          orderBy: params?.sortBy ?? MovieSortType.Latest,
          page: params?.page ?? 1,
          first: params?.pageSize ?? 20,
        },
      });
      return Result.success(mapPaginatedList(data!.movies, mapMovieListItem));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getRecommendedMovies(params: {
    movieId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: RecommendedMoviesDocument,
        variables: {
          id: params.movieId,
          page: params.page ?? 1,
          first: params.pageSize ?? 6,
        },
      });
      return Result.success(mapPaginatedList(data!.recommendedMovies, mapMovieListItem));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMoviesByChannel(params: {
    channelId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: MoviesByChannelDocument,
        variables: {
          channelId: params.channelId,
          page: params.page ?? 1,
          first: params.pageSize ?? 20,
        },
      });
      return Result.success(mapPaginatedList(data!.moviesByChannel, mapMovieListItem));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMoviesByTopic(params: {
    topicId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: MoviesByTopicDocument,
        variables: {
          id: params.topicId,
          page: params.page ?? 1,
          first: params.pageSize ?? 20,
        },
      });
      return Result.success(mapPaginatedList(data!.moviesByTopic, mapMovieListItem));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getMoviesByActor(params: {
    actorId: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: MoviesByActorDocument,
        variables: {
          id: params.actorId,
          page: params.page ?? 1,
          first: params.pageSize ?? 20,
        },
      });
      return Result.success(mapPaginatedList(data!.moviesByActor, mapMovieListItem));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getEpisodes(movieId: string): Promise<Result<Episode[]>> {
    try {
      const { data } = await this.client.query({
        query: MovieDetailDocument,
        variables: { id: movieId, recommendMoviesFirst: 0 },
      });
      const episodes = (data!.movie!.episodes ?? []).map(mapEpisode);
      return Result.success(episodes);
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getFilters(): Promise<Result<MovieFilters>> {
    try {
      const { data } = await this.client.query({ query: MovieFiltersDocument });
      const filters = data!.movieFilters;
      return Result.success({
        areas: (filters.areas ?? []) as string[],
        years: (filters.years ?? []) as number[],
        genres: (filters.genres ?? []).map(mapGenre),
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getHotRankMovies(params?: {
    categoryId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Movie>>> {
    try {
      const { data } = await this.client.query({
        query: HotMoviesDocument,
        variables: {
          categoryId: params?.categoryId,
          page: params?.page ?? 1,
          first: params?.pageSize ?? 20,
        },
      });
      return Result.success(mapPaginatedList(data!.hotMovies, mapMovieListItem));
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getUpcomingMovies(params?: {
    page?: number;
    pageSize?: number;
  }): Promise<Result<MoviesByDatePaginator>> {
    try {
      const { data } = await this.client.query({
        query: UpcomingMoviesDocument,
        variables: { page: params?.page ?? 1, first: params?.pageSize ?? 5 },
      });
      const result = data!.upcomingMovies;
      return Result.success({
        data: (result.data ?? []).map((d: any) => ({
          date: d.date,
          label: d.label,
          count: d.count ?? 0,
          movies: (d.movies ?? []).map(mapMovieListItem),
        })),
        hasMorePages: result.hasMorePages ?? false,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }

  async getReleasedMovies(params?: {
    categoryId?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Result<MoviesByDatePaginator>> {
    try {
      const { data } = await this.client.query({
        query: ReleasedMoviesDocument,
        variables: {
          categoryId: params?.categoryId,
          page: params?.page ?? 1,
          first: params?.pageSize ?? 5,
        },
      });
      const result = data!.releasedMovies;
      return Result.success({
        data: (result.data ?? []).map((d: any) => ({
          date: d.date,
          label: d.label,
          count: d.count ?? 0,
          movies: (d.movies ?? []).map(mapMovieListItem),
        })),
        hasMorePages: result.hasMorePages ?? false,
      });
    } catch (error) {
      return Result.failure(FailureMapper.fromError(error));
    }
  }
}
