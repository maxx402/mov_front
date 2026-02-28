export interface Topic {
  readonly id: string;
  readonly name: string;
  readonly cover?: string;
  readonly description?: string;
  readonly movieCount: number;
}

export interface TopicGroup {
  readonly id: string;
  readonly name: string;
  readonly topics: readonly Topic[];
}
