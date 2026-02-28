export enum GameCategory {
  HotRecommend = "hotRecommend",
  MostPlayed = "mostPlayed",
  MostProfitable = "mostProfitable",
}

export interface Game {
  readonly id: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly image: string;
  readonly link: string;
}

export interface GameCategoryInfo {
  readonly category: GameCategory;
  readonly name: string;
}
