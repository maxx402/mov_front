export enum HotKeywordType {
  Movie = "movie",
  Actor = "actor",
  Genre = "genre",
  Custom = "custom",
}

export interface SearchHistory {
  readonly id: string;
  readonly keyword: string;
  readonly createdAt: string;
}

export interface HotKeyword {
  readonly id: string;
  readonly keyword: string;
  readonly type: HotKeywordType;
  readonly linkId?: string;
}
