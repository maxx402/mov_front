export enum AdType {
  Splash = "SPLASH",
  Banner = "BANNER",
  Interstitial = "INTERSTITIAL",
  Feed = "FEED",
  RewardedVideo = "REWARDED_VIDEO",
  Pause = "PAUSE",
  PreRoll = "PRE_ROLL",
}

export interface Ad {
  readonly id: string;
  readonly title: string;
  readonly type: AdType;
  readonly image?: string;
  readonly video?: string;
  readonly link?: string;
  readonly duration: number;
  readonly skipAfter: number;
}

export interface AdSlot {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly type: AdType;
  readonly width?: number;
  readonly height?: number;
  readonly description?: string;
}

export enum AdvertisementType {
  Splash = "SPLASH",
  Banner = "BANNER",
  TopChannel = "TOP_CHANNEL",
  Float = "FLOAT",
  PreRoll = "PRE_ROLL",
}

export interface Advertisement {
  readonly id: string;
  readonly name?: string;
  readonly image?: string;
  readonly link?: string;
  readonly type: AdvertisementType;
}

export interface AdConfig {
  readonly enabled: boolean;
  readonly splashDuration: number;
  readonly prerollAdUrl?: string;
  readonly interstitialInterval: number;
}

export function canAdSkip(ad: Ad): boolean {
  return ad.skipAfter > 0;
}

export function isAdVideo(ad: Ad): boolean {
  return ad.video != null && ad.video.length > 0;
}

export function isAdImage(ad: Ad): boolean {
  return !isAdVideo(ad) && ad.image != null && ad.image.length > 0;
}

export function hasAdLink(ad: Ad): boolean {
  return ad.link != null && ad.link.length > 0;
}

export function hasAdvertisementLink(ad: Advertisement): boolean {
  return ad.link != null && ad.link.length > 0;
}

export function hasAdvertisementImage(ad: Advertisement): boolean {
  return ad.image != null && ad.image.length > 0;
}
