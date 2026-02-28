import type { Result } from "@/core/errors/result";
import type { Actor } from "@/domain/entities/actor";
import type { PaginatedList } from "@/domain/entities/paginator";

export interface IActorRepository {
  getActor(id: string): Promise<Result<Actor>>;
  getActors(params?: {
    name?: string;
    area?: string;
    gender?: number;
    page?: number;
    pageSize?: number;
  }): Promise<Result<PaginatedList<Actor>>>;
}
