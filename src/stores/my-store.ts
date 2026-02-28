import { makeAutoObservable, runInAction, reaction, type IReactionDisposer } from "mobx";
import type { IHistoryRepository } from "@/domain/repositories/history-repository";
import type { INotificationRepository } from "@/domain/repositories/notification-repository";
import type { IAppConfigRepository } from "@/domain/repositories/app-config-repository";
import type { WatchHistory } from "@/domain/entities/watch-history";
import type { AppConfig } from "@/domain/entities/app-config";
import type { UserStore } from "./user-store";

export class MyStore {
  watchHistories: WatchHistory[] = [];
  isLoadingHistory = false;
  unreadNotificationCount = 0;
  appConfig: AppConfig | null = null;

  private authReaction: IReactionDisposer | null = null;

  constructor(
    private readonly userStore: UserStore,
    private readonly historyRepository: IHistoryRepository,
    private readonly notificationRepository: INotificationRepository,
    private readonly appConfigRepository: IAppConfigRepository,
  ) {
    makeAutoObservable(this);
    this.authReaction = reaction(
      () => this.userStore.isAuthenticated,
      (isAuth) => {
        if (!isAuth) {
          this.watchHistories = [];
          this.unreadNotificationCount = 0;
        }
      },
    );
  }

  get isLoggedIn(): boolean {
    return this.userStore.isAuthenticated;
  }

  get hasWatchHistory(): boolean {
    return this.watchHistories.length > 0;
  }

  get hasUnreadNotification(): boolean {
    return this.unreadNotificationCount > 0;
  }

  get unreadNotificationText(): string {
    if (this.unreadNotificationCount > 99) return "99+";
    return this.unreadNotificationCount.toString();
  }

  async init(): Promise<void> {
    await Promise.all([
      this.loadWatchHistories(),
      this.loadUnreadNotificationCount(),
      this.loadAppConfig(),
    ]);
  }

  async loadAppConfig(): Promise<void> {
    const result = await this.appConfigRepository.getAppConfig();
    runInAction(() => {
      result.fold(
        () => {},
        (config) => { this.appConfig = config; },
      );
    });
  }

  async loadWatchHistories(): Promise<void> {
    this.isLoadingHistory = true;
    const result = await this.historyRepository.getWatchHistories({ pageSize: 10 });
    runInAction(() => {
      this.isLoadingHistory = false;
      result.fold(
        () => {},
        (list) => { this.watchHistories = [...list.items]; },
      );
    });
  }

  async loadUnreadNotificationCount(): Promise<void> {
    const result = await this.notificationRepository.getUnreadCount();
    runInAction(() => {
      result.fold(
        () => {},
        (count) => { this.unreadNotificationCount = count; },
      );
    });
  }

  async refresh(): Promise<void> {
    await Promise.all([
      this.loadWatchHistories(),
      this.loadUnreadNotificationCount(),
    ]);
  }

  dispose(): void {
    this.authReaction?.();
    this.authReaction = null;
  }
}
