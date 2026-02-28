import { makeAutoObservable, runInAction } from "mobx";
import type { ITopicRepository } from "@/domain/repositories/topic-repository";
import type { IActorRepository } from "@/domain/repositories/actor-repository";
import type { TopicGroup } from "@/domain/entities/topic";
import type { Actor } from "@/domain/entities/actor";
import type { PaginatorInfo } from "@/domain/entities/paginator";

export class DiscoverStore {
  selectedTabIndex = 0;
  isLoading = false;
  errorMessage: string | null = null;

  topicGroups: TopicGroup[] = [];
  topicPaginator: PaginatorInfo = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };

  actors: Actor[] = [];
  actorPaginator: PaginatorInfo = { currentPage: 1, lastPage: 1, hasMorePages: false, total: 0 };

  constructor(
    private readonly topicRepository: ITopicRepository,
    private readonly actorRepository: IActorRepository,
  ) {
    makeAutoObservable(this);
  }

  setSelectedTabIndex(index: number): void {
    this.selectedTabIndex = index;
    if (index === 1 && this.actors.length === 0) {
      this.loadActors(1);
    }
  }

  async init(): Promise<void> {
    this.isLoading = true;
    await this.loadTopicGroups(1);
    runInAction(() => { this.isLoading = false; });
  }

  private async loadTopicGroups(page: number): Promise<void> {
    const result = await this.topicRepository.getTopicGroups({ page, pageSize: 10 });
    runInAction(() => {
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (list) => {
          if (page === 1) {
            this.topicGroups = [...list.items];
          } else {
            this.topicGroups = [...this.topicGroups, ...list.items];
          }
          this.topicPaginator = list.paginator;
        },
      );
    });
  }

  private async loadActors(page: number): Promise<void> {
    const result = await this.actorRepository.getActors({ page, pageSize: 20 });
    runInAction(() => {
      result.fold(
        (error) => { this.errorMessage = error.userMessage; },
        (list) => {
          if (page === 1) {
            this.actors = [...list.items];
          } else {
            this.actors = [...this.actors, ...list.items];
          }
          this.actorPaginator = list.paginator;
        },
      );
    });
  }

  async loadMoreTopics(): Promise<void> {
    if (!this.topicPaginator.hasMorePages) return;
    await this.loadTopicGroups(this.topicPaginator.currentPage + 1);
  }

  async loadMoreActors(): Promise<void> {
    if (!this.actorPaginator.hasMorePages) return;
    await this.loadActors(this.actorPaginator.currentPage + 1);
  }

  async refresh(): Promise<void> {
    if (this.selectedTabIndex === 0) {
      await this.loadTopicGroups(1);
    } else {
      await this.loadActors(1);
    }
  }
}
