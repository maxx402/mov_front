import type { Episode, PlayLine } from "@/domain/entities/episode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPlayLine(data: any): PlayLine {
  return {
    id: data.id,
    name: data.name,
    url: data.url,
    quality: data.quality ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapEpisode(data: any): Episode {
  return {
    id: data.id,
    number: data.episode_number ?? 0,
    title: data.title ?? undefined,
    duration: data.duration ?? 0,
    playLines: (data.playLines ?? data.play_lines ?? []).map(mapPlayLine),
  };
}
