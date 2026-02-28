import { describe, it, expect } from "vitest";
import { hasBannerLink, BannerLinkType } from "../banner";
import type { Banner } from "../banner";

function makeBanner(overrides: Partial<Banner> = {}): Banner {
  return { id: "1", cover: "img.jpg", linkType: BannerLinkType.None, ...overrides };
}

describe("hasBannerLink", () => {
  it("returns false when linkType is None", () => {
    expect(hasBannerLink(makeBanner())).toBe(false);
  });
  it("returns true for Movie link", () => {
    expect(hasBannerLink(makeBanner({ linkType: BannerLinkType.Movie }))).toBe(true);
  });
  it("returns true for Url link", () => {
    expect(hasBannerLink(makeBanner({ linkType: BannerLinkType.Url }))).toBe(true);
  });
});
