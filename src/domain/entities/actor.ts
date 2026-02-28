import { stripHtmlTags } from "@/core/utils/html";

export interface Actor {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string;
  readonly area?: string;
  readonly movieCount?: number;
}

export function getActorPlainDescription(actor: Actor): string {
  return actor.description ? stripHtmlTags(actor.description) : "";
}
