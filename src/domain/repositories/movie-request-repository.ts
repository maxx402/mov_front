import type { Result } from "@/core/errors/result";
import type { MovieRequest } from "@/domain/entities/movie-request";

export interface IMovieRequestRepository {
  createMovieRequest(content: string): Promise<Result<MovieRequest>>;
}
