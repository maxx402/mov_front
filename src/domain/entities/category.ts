import type { Banner } from "./banner";
import type { Channel } from "./channel";
import type { Movie } from "./movie";

export interface Category {
  readonly id: string;
  readonly name: string;
}

export interface CategoryHome {
  readonly banners: readonly Banner[];
  readonly grids: readonly Channel[];
  readonly channels: readonly Channel[];
  readonly hotMovies: readonly Movie[];
}
