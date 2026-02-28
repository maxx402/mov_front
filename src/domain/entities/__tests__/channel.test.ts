import { describe, it, expect } from "vitest";
import { hasChannelMore, ChannelLinkType } from "../channel";
import type { Channel } from "../channel";

function makeChannel(overrides: Partial<Channel> = {}): Channel {
  return { id: "1", name: "ch", linkType: ChannelLinkType.Movies, movies: [], ...overrides };
}

describe("hasChannelMore", () => {
  it("returns true when linkType is Movies", () => {
    expect(hasChannelMore(makeChannel())).toBe(true);
  });
  it("returns false when linkType is Page", () => {
    expect(hasChannelMore(makeChannel({ linkType: ChannelLinkType.Page }))).toBe(false);
  });
  it("returns false when linkType is Url", () => {
    expect(hasChannelMore(makeChannel({ linkType: ChannelLinkType.Url }))).toBe(false);
  });
});
