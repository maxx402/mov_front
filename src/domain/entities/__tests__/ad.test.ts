import { describe, it, expect } from "vitest";
import { canAdSkip, isAdVideo, isAdImage, hasAdLink, hasAdvertisementLink, hasAdvertisementImage, AdType, AdvertisementType } from "../ad";
import type { Ad, Advertisement } from "../ad";

function makeAd(overrides: Partial<Ad> = {}): Ad {
  return { id: "1", title: "Ad", type: AdType.Banner, duration: 5, skipAfter: 0, ...overrides };
}

function makeAdvertisement(overrides: Partial<Advertisement> = {}): Advertisement {
  return { id: "1", type: AdvertisementType.Banner, ...overrides };
}

describe("canAdSkip", () => {
  it("returns true when skipAfter > 0", () => { expect(canAdSkip(makeAd({ skipAfter: 3 }))).toBe(true); });
  it("returns false when skipAfter is 0", () => { expect(canAdSkip(makeAd())).toBe(false); });
});

describe("isAdVideo", () => {
  it("returns true when video is set", () => { expect(isAdVideo(makeAd({ video: "v.mp4" }))).toBe(true); });
  it("returns false when video is undefined", () => { expect(isAdVideo(makeAd())).toBe(false); });
  it("returns false when video is empty", () => { expect(isAdVideo(makeAd({ video: "" }))).toBe(false); });
});

describe("isAdImage", () => {
  it("returns true when image set and no video", () => { expect(isAdImage(makeAd({ image: "i.jpg" }))).toBe(true); });
  it("returns false when video is set", () => { expect(isAdImage(makeAd({ image: "i.jpg", video: "v.mp4" }))).toBe(false); });
  it("returns false when no image", () => { expect(isAdImage(makeAd())).toBe(false); });
});

describe("hasAdLink", () => {
  it("returns true when link is set", () => { expect(hasAdLink(makeAd({ link: "http://a.com" }))).toBe(true); });
  it("returns false when no link", () => { expect(hasAdLink(makeAd())).toBe(false); });
  it("returns false when link is empty", () => { expect(hasAdLink(makeAd({ link: "" }))).toBe(false); });
});

describe("hasAdvertisementLink", () => {
  it("returns true when link set", () => { expect(hasAdvertisementLink(makeAdvertisement({ link: "http://a.com" }))).toBe(true); });
  it("returns false when no link", () => { expect(hasAdvertisementLink(makeAdvertisement())).toBe(false); });
});

describe("hasAdvertisementImage", () => {
  it("returns true when image set", () => { expect(hasAdvertisementImage(makeAdvertisement({ image: "i.jpg" }))).toBe(true); });
  it("returns false when no image", () => { expect(hasAdvertisementImage(makeAdvertisement())).toBe(false); });
});
