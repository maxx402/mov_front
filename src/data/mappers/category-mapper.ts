import type { Category, CategoryHome } from "@/domain/entities/category";
import type { Banner } from "@/domain/entities/banner";
import { BannerLinkType } from "@/domain/entities/banner";
import type { Channel } from "@/domain/entities/channel";
import { ChannelLinkType } from "@/domain/entities/channel";
import { mapMovieListItem, mapMovieStatus } from "./movie-mapper";
import type { Movie } from "@/domain/entities/movie";

export function mapCategory(data: { id: string; name: string }): Category {
  return { id: data.id, name: data.name };
}

function mapBannerLinkType(value: unknown): BannerLinkType {
  switch (String(value).toUpperCase()) {
    case "MOVIE": return BannerLinkType.Movie;
    case "EPISODE": return BannerLinkType.Episode;
    case "ACTOR": return BannerLinkType.Actor;
    case "TOPIC": return BannerLinkType.Topic;
    case "PAGE": return BannerLinkType.Page;
    case "URL": return BannerLinkType.Url;
    default: return BannerLinkType.None;
  }
}

function mapChannelLinkType(value: unknown): ChannelLinkType {
  switch (String(value).toUpperCase()) {
    case "PAGE": return ChannelLinkType.Page;
    case "URL": return ChannelLinkType.Url;
    default: return ChannelLinkType.Movies;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapBanner(data: any): Banner {
  const linkType = mapBannerLinkType(data.link_type);
  let linkValue: string | undefined;
  switch (linkType) {
    case BannerLinkType.Movie:
    case BannerLinkType.Episode:
    case BannerLinkType.Actor:
    case BannerLinkType.Topic:
      linkValue = data.link_id ?? undefined;
      break;
    case BannerLinkType.Page:
    case BannerLinkType.Url:
      linkValue = data.link_url ?? undefined;
      break;
    default:
      linkValue = undefined;
  }

  return {
    id: data.id ?? "",
    cover: data.cover,
    title: data.title ?? undefined,
    subtitle: data.subtitle ?? undefined,
    linkType,
    linkValue,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapChannel(data: any): Channel {
  const moviesData = data.movies?.data ?? [];
  const movies: Movie[] = moviesData.map(mapMovieListItem);

  return {
    id: data.id,
    name: data.name,
    cover: data.cover ?? undefined,
    icon: data.icon ?? undefined,
    backgroundImage: data.background_image ?? undefined,
    gridIcon: data.grid_icon ?? undefined,
    description: data.description ?? undefined,
    linkType: mapChannelLinkType(data.link_type),
    linkUrl: data.link_url ?? undefined,
    movies,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCategoryHome(data: any): CategoryHome {
  return {
    banners: (data.banners ?? []).map(mapBanner),
    grids: (data.grids ?? []).map(mapChannel),
    channels: (data.channels ?? []).map(mapChannel),
    hotMovies: (data.hotMovies ?? []).map(mapMovieListItem),
  };
}
