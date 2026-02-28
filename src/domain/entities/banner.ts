export enum BannerLinkType {
  None = "none",
  Movie = "movie",
  Episode = "episode",
  Actor = "actor",
  Topic = "topic",
  Page = "page",
  Url = "url",
}

export interface Banner {
  readonly id: string;
  readonly cover: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly linkType: BannerLinkType;
  readonly linkValue?: string;
}

export function hasBannerLink(banner: Banner): boolean {
  return banner.linkType !== BannerLinkType.None;
}
