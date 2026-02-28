import { formatDuration } from "@/core/utils/format";

export interface PlayLine {
  readonly id: string;
  readonly name: string;
  readonly url: string;
  readonly quality?: string;
}

export interface Episode {
  readonly id: string;
  readonly number: number;
  readonly title?: string;
  readonly duration: number;
  readonly playLines: readonly PlayLine[];
}

export function getEpisodeDisplayTitle(episode: Episode): string {
  return episode.title ?? `第${episode.number}集`;
}

export function getEpisodeDurationText(episode: Episode): string {
  if (episode.duration <= 0) return "";
  return formatDuration(episode.duration);
}

export function getDefaultPlayLine(episode: Episode): PlayLine | undefined {
  return episode.playLines.length > 0 ? episode.playLines[0] : undefined;
}
