import { describe, it, expect, vi } from "vitest";
import { mapCategory, mapBanner, mapChannel, mapCategoryHome } from "../category-mapper";
import { BannerLinkType } from "@/domain/entities/banner";
import { ChannelLinkType } from "@/domain/entities/channel";

vi.mock("../movie-mapper", () => ({
  mapMovieListItem: (data: any) => ({ id: data.id, title: data.title }),
  mapMovieStatus: (v: any) => v,
}));

describe("mapCategory", () => {
  it("maps id and name", () => {
    const result = mapCategory({ id: "c1", name: "Comedy" });

    expect(result).toEqual({ id: "c1", name: "Comedy" });
  });
});

describe("mapBanner", () => {
  it("maps a MOVIE banner with link_id as linkValue", () => {
    const data = {
      id: "b1",
      cover: "https://example.com/banner.jpg",
      title: "Featured Movie",
      subtitle: "Now Playing",
      link_type: "MOVIE",
      link_id: "m1",
    };

    const result = mapBanner(data);

    expect(result).toEqual({
      id: "b1",
      cover: "https://example.com/banner.jpg",
      title: "Featured Movie",
      subtitle: "Now Playing",
      linkType: BannerLinkType.Movie,
      linkValue: "m1",
    });
  });

  it("maps an EPISODE banner with link_id", () => {
    const data = {
      id: "b2",
      cover: "cover.jpg",
      link_type: "EPISODE",
      link_id: "ep1",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.Episode);
    expect(result.linkValue).toBe("ep1");
  });

  it("maps an ACTOR banner with link_id", () => {
    const data = {
      id: "b3",
      cover: "cover.jpg",
      link_type: "ACTOR",
      link_id: "a1",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.Actor);
    expect(result.linkValue).toBe("a1");
  });

  it("maps a TOPIC banner with link_id", () => {
    const data = {
      id: "b4",
      cover: "cover.jpg",
      link_type: "TOPIC",
      link_id: "t1",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.Topic);
    expect(result.linkValue).toBe("t1");
  });

  it("maps a PAGE banner with link_url as linkValue", () => {
    const data = {
      id: "b5",
      cover: "cover.jpg",
      link_type: "PAGE",
      link_url: "/some-page",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.Page);
    expect(result.linkValue).toBe("/some-page");
  });

  it("maps a URL banner with link_url as linkValue", () => {
    const data = {
      id: "b6",
      cover: "cover.jpg",
      link_type: "URL",
      link_url: "https://external.com",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.Url);
    expect(result.linkValue).toBe("https://external.com");
  });

  it("maps unknown link_type to None with undefined linkValue", () => {
    const data = {
      id: "b7",
      cover: "cover.jpg",
      link_type: "UNKNOWN",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.None);
    expect(result.linkValue).toBeUndefined();
  });

  it("handles case-insensitive link_type via toUpperCase", () => {
    const data = {
      id: "b8",
      cover: "cover.jpg",
      link_type: "movie",
      link_id: "m2",
    };

    const result = mapBanner(data);

    expect(result.linkType).toBe(BannerLinkType.Movie);
    expect(result.linkValue).toBe("m2");
  });

  it("defaults title and subtitle to undefined when null", () => {
    const data = {
      id: "b9",
      cover: "cover.jpg",
      title: null,
      subtitle: null,
      link_type: "MOVIE",
      link_id: null,
    };

    const result = mapBanner(data);

    expect(result.title).toBeUndefined();
    expect(result.subtitle).toBeUndefined();
    expect(result.linkValue).toBeUndefined();
  });

  it("defaults id to empty string when missing", () => {
    const data = {
      cover: "cover.jpg",
      link_type: "NONE",
    };

    const result = mapBanner(data);

    expect(result.id).toBe("");
  });
});

describe("mapChannel", () => {
  it("maps a channel with movies and all optional fields", () => {
    const data = {
      id: "ch1",
      name: "Hot Movies",
      cover: "https://example.com/ch-cover.jpg",
      icon: "https://example.com/icon.png",
      background_image: "https://example.com/bg.jpg",
      grid_icon: "https://example.com/grid.png",
      description: "Popular movies channel",
      link_type: "PAGE",
      link_url: "/hot",
      movies: {
        data: [
          { id: "m1", title: "Movie One" },
          { id: "m2", title: "Movie Two" },
        ],
      },
    };

    const result = mapChannel(data);

    expect(result.id).toBe("ch1");
    expect(result.name).toBe("Hot Movies");
    expect(result.cover).toBe("https://example.com/ch-cover.jpg");
    expect(result.icon).toBe("https://example.com/icon.png");
    expect(result.backgroundImage).toBe("https://example.com/bg.jpg");
    expect(result.gridIcon).toBe("https://example.com/grid.png");
    expect(result.description).toBe("Popular movies channel");
    expect(result.linkType).toBe(ChannelLinkType.Page);
    expect(result.linkUrl).toBe("/hot");
    expect(result.movies).toEqual([
      { id: "m1", title: "Movie One" },
      { id: "m2", title: "Movie Two" },
    ]);
  });

  it("defaults optional fields to undefined when null", () => {
    const data = {
      id: "ch2",
      name: "Minimal Channel",
      cover: null,
      icon: null,
      background_image: null,
      grid_icon: null,
      description: null,
      link_type: null,
      link_url: null,
      movies: { data: [] },
    };

    const result = mapChannel(data);

    expect(result.cover).toBeUndefined();
    expect(result.icon).toBeUndefined();
    expect(result.backgroundImage).toBeUndefined();
    expect(result.gridIcon).toBeUndefined();
    expect(result.description).toBeUndefined();
    expect(result.linkUrl).toBeUndefined();
    expect(result.movies).toEqual([]);
  });

  it("defaults movies to empty array when movies is undefined", () => {
    const data = {
      id: "ch3",
      name: "No Movies",
    };

    const result = mapChannel(data);

    expect(result.movies).toEqual([]);
  });

  it("maps link_type to ChannelLinkType.Movies as default", () => {
    const data = {
      id: "ch4",
      name: "Default Link",
      link_type: "SOMETHING_ELSE",
    };

    const result = mapChannel(data);

    expect(result.linkType).toBe(ChannelLinkType.Movies);
  });

  it("maps URL link_type correctly", () => {
    const data = {
      id: "ch5",
      name: "URL Channel",
      link_type: "URL",
      link_url: "https://external.com",
    };

    const result = mapChannel(data);

    expect(result.linkType).toBe(ChannelLinkType.Url);
    expect(result.linkUrl).toBe("https://external.com");
  });
});

describe("mapCategoryHome", () => {
  it("maps all arrays when provided", () => {
    const data = {
      banners: [
        { id: "b1", cover: "banner.jpg", link_type: "MOVIE", link_id: "m1" },
      ],
      grids: [
        { id: "g1", name: "Grid 1", movies: { data: [] } },
      ],
      channels: [
        { id: "ch1", name: "Channel 1", movies: { data: [{ id: "m2", title: "Movie 2" }] } },
      ],
      hotMovies: [
        { id: "m3", title: "Hot Movie" },
      ],
    };

    const result = mapCategoryHome(data);

    expect(result.banners).toHaveLength(1);
    expect(result.banners[0].id).toBe("b1");
    expect(result.grids).toHaveLength(1);
    expect(result.grids[0].id).toBe("g1");
    expect(result.channels).toHaveLength(1);
    expect(result.channels[0].id).toBe("ch1");
    expect(result.channels[0].movies).toEqual([{ id: "m2", title: "Movie 2" }]);
    expect(result.hotMovies).toHaveLength(1);
    expect(result.hotMovies[0]).toEqual({ id: "m3", title: "Hot Movie" });
  });

  it("defaults all arrays to empty when fields are missing", () => {
    const data = {};

    const result = mapCategoryHome(data);

    expect(result.banners).toEqual([]);
    expect(result.grids).toEqual([]);
    expect(result.channels).toEqual([]);
    expect(result.hotMovies).toEqual([]);
  });

  it("defaults all arrays to empty when fields are null", () => {
    const data = {
      banners: null,
      grids: null,
      channels: null,
      hotMovies: null,
    };

    const result = mapCategoryHome(data);

    expect(result.banners).toEqual([]);
    expect(result.grids).toEqual([]);
    expect(result.channels).toEqual([]);
    expect(result.hotMovies).toEqual([]);
  });
});
