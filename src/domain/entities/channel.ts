import type { Movie } from "./movie";

export enum ChannelLinkType {
  Movies = "movies",
  Page = "page",
  Url = "url",
}

export interface Channel {
  readonly id: string;
  readonly name: string;
  readonly cover?: string;
  readonly icon?: string;
  readonly backgroundImage?: string;
  readonly gridIcon?: string;
  readonly description?: string;
  readonly linkType: ChannelLinkType;
  readonly linkUrl?: string;
  readonly movies: readonly Movie[];
}

export function hasChannelMore(channel: Channel): boolean {
  return channel.linkType === ChannelLinkType.Movies;
}
