import type { Movie, ActorRole, WatchProgress } from "@/domain/entities/movie";
import { MovieStatus, ActorRoleType } from "@/domain/entities/movie";
import type { Genre } from "@/domain/entities/genre";
import type { Episode } from "@/domain/entities/episode";
import { mapEpisode } from "./episode-mapper";

export function mapMovieStatus(value: unknown): MovieStatus {
  switch (value) {
    case 0: return MovieStatus.Preview;
    case 1: return MovieStatus.Ongoing;
    case 2: return MovieStatus.Completed;
    default: return MovieStatus.Ongoing;
  }
}

export function mapRoleType(value: unknown): ActorRoleType {
  switch (value) {
    case "director": return ActorRoleType.Director;
    case "writer": return ActorRoleType.Writer;
    case "producer": return ActorRoleType.Producer;
    default: return ActorRoleType.Actor;
  }
}

export function mapGenre(data: { id: string; name: string }): Genre {
  return { id: data.id, name: data.name };
}

export function mapActorRole(data: {
  actor?: { id: string; name: string; avatar?: string | null } | null;
  role?: string | null;
  character?: string | null;
}): ActorRole {
  return {
    actorId: data.actor?.id ?? "",
    name: data.actor?.name ?? "",
    avatar: data.actor?.avatar ?? undefined,
    role: mapRoleType(data.role),
    character: data.character ?? undefined,
  };
}

export function mapWatchProgress(data: {
  episode_id?: string;
  episode?: { id: string; episode_number: number } | null;
  progress?: number;
  position?: number;
  duration?: number;
}): WatchProgress {
  return {
    episodeId: data.episode_id ?? data.episode?.id ?? "",
    episodeNumber: data.episode?.episode_number ?? 0,
    position: data.position ?? data.progress ?? 0,
    duration: data.duration ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapMovieDetail(data: any): Movie {
  const statistics = data.statistics;
  const genres: Genre[] = (data.genres ?? []).map(mapGenre);
  const actors: ActorRole[] = (data.credits ?? []).map(mapActorRole);
  const episodes: Episode[] = (data.episodes ?? []).map(mapEpisode);
  const watchProgress = data.lastWatchHistory
    ? mapWatchProgress(data.lastWatchHistory)
    : undefined;

  return {
    id: data.id,
    title: data.title,
    cover: data.cover,
    score: data.score ?? 0,
    year: data.year ?? undefined,
    area: data.area ?? undefined,
    quality: data.quality ?? undefined,
    description: data.description ?? undefined,
    totalEpisodes: data.total_episodes ?? 1,
    currentEpisode: data.current_episode ?? 1,
    status: mapMovieStatus(data.status),
    viewCount: statistics?.view_count ?? undefined,
    favoriteCount: statistics?.favorite_count ?? undefined,
    genres,
    actors,
    episodes,
    isFavorited: data.isFavorited ?? false,
    isSubscribed: data.isSubscribed ?? false,
    isReserved: data.isReserved ?? false,
    watchProgress,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapMovieListItem(data: any): Movie {
  const genres: Genre[] = (data.genres ?? []).map(mapGenre);
  return {
    id: data.id,
    title: data.title,
    cover: data.cover,
    score: data.score ?? 0,
    year: data.year ?? undefined,
    area: data.area ?? undefined,
    quality: data.quality ?? undefined,
    description: data.description ?? undefined,
    totalEpisodes: data.total_episodes ?? 1,
    currentEpisode: data.current_episode ?? 1,
    status: mapMovieStatus(data.status),
    viewCount: data.statistics?.view_count ?? undefined,
    favoriteCount: undefined,
    genres: genres.length > 0 ? genres : undefined,
    actors: undefined,
    episodes: undefined,
    isFavorited: false,
    isSubscribed: false,
    isReserved: false,
    watchProgress: undefined,
  };
}
