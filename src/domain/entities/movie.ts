import { stripHtmlTags } from "@/core/utils/html";
import { formatViewCount } from "@/core/utils/format";
import type { Genre } from "./genre";
import type { Episode } from "./episode";

export enum MovieStatus {
  Preview = 0,
  Ongoing = 1,
  Completed = 2,
}

export enum ActorRoleType {
  Director = "director",
  Actor = "actor",
  Writer = "writer",
  Producer = "producer",
}

export interface ActorRole {
  readonly actorId: string;
  readonly name: string;
  readonly avatar?: string;
  readonly role: ActorRoleType;
  readonly character?: string;
}

export interface WatchProgress {
  readonly episodeId: string;
  readonly episodeNumber: number;
  readonly position: number;
  readonly duration: number;
}

export interface Movie {
  readonly id: string;
  readonly title: string;
  readonly cover: string;
  readonly score: number;
  readonly year?: number;
  readonly area?: string;
  readonly quality?: string;
  readonly description?: string;
  readonly totalEpisodes: number;
  readonly currentEpisode: number;
  readonly status: MovieStatus;
  readonly viewCount?: number;
  readonly favoriteCount?: number;
  readonly genres?: readonly Genre[];
  readonly actors?: readonly ActorRole[];
  readonly episodes?: readonly Episode[];
  readonly isFavorited: boolean;
  readonly isSubscribed: boolean;
  readonly isReserved: boolean;
  readonly watchProgress?: WatchProgress;
}

export function isMovieType(movie: Movie): boolean {
  return movie.totalEpisodes <= 1;
}

export function isMovieCompleted(movie: Movie): boolean {
  return movie.status === MovieStatus.Completed;
}

export function getMovieStatusText(movie: Movie): string {
  switch (movie.status) {
    case MovieStatus.Preview:
      return "预告";
    case MovieStatus.Ongoing:
      if (isMovieType(movie) || movie.currentEpisode < 1) return "";
      return `更新至${movie.currentEpisode}集`;
    case MovieStatus.Completed:
      if (isMovieType(movie)) return "";
      return "已完结";
  }
}

export function getMovieViewCountText(movie: Movie): string {
  if (!movie.viewCount || movie.viewCount === 0) return "";
  return formatViewCount(movie.viewCount);
}

export function getMovieViewCountWatchingText(movie: Movie): string {
  if (!movie.viewCount || movie.viewCount === 0) return "";
  if (movie.viewCount >= 10000) {
    return `${(movie.viewCount / 10000).toFixed(1)}万人次在看`;
  }
  return `${movie.viewCount}人次在看`;
}

export function getMovieGenreText(movie: Movie): string {
  return movie.genres?.map((g) => g.name).join(" / ") ?? "";
}

export function getMoviePlainDescription(movie: Movie): string {
  return movie.description ? stripHtmlTags(movie.description) : "";
}

export function getMovieDirectors(movie: Movie): readonly ActorRole[] {
  return movie.actors?.filter((a) => a.role === ActorRoleType.Director) ?? [];
}

export function getMovieMainActors(movie: Movie): readonly ActorRole[] {
  return movie.actors?.filter((a) => a.role === ActorRoleType.Actor) ?? [];
}

export function isMovieFHD(movie: Movie): boolean {
  if (!movie.quality) return false;
  return ["1080P", "2K", "4K", "8K"].includes(movie.quality);
}

export function getWatchProgressPercent(progress: WatchProgress): number {
  return progress.duration > 0 ? progress.position / progress.duration : 0;
}

export function getWatchProgressText(progress: WatchProgress): string {
  const min = Math.floor(progress.position / 60);
  const sec = progress.position % 60;
  return `第${progress.episodeNumber}集 ${min}:${sec.toString().padStart(2, "0")}`;
}
