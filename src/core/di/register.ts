import { Container } from "./container";
import { DI_KEYS } from "./keys";
import { getApolloClient } from "@/core/apollo/client";
import { storage } from "@/core/storage/storage";

// Repository implementations
import { AuthRepositoryImpl } from "@/data/repositories/auth-repository-impl";
import { MovieRepositoryImpl } from "@/data/repositories/movie-repository-impl";
import { CategoryRepositoryImpl } from "@/data/repositories/category-repository-impl";
import { SearchRepositoryImpl } from "@/data/repositories/search-repository-impl";
import { CommentRepositoryImpl } from "@/data/repositories/comment-repository-impl";
import { FavoriteRepositoryImpl } from "@/data/repositories/favorite-repository-impl";
import { SubscriptionRepositoryImpl } from "@/data/repositories/subscription-repository-impl";
import { HistoryRepositoryImpl } from "@/data/repositories/history-repository-impl";
import { ActorRepositoryImpl } from "@/data/repositories/actor-repository-impl";
import { NotificationRepositoryImpl } from "@/data/repositories/notification-repository-impl";
import { TopicRepositoryImpl } from "@/data/repositories/topic-repository-impl";
import { ReservationRepositoryImpl } from "@/data/repositories/reservation-repository-impl";
import { FeedbackRepositoryImpl } from "@/data/repositories/feedback-repository-impl";
import { MovieRequestRepositoryImpl } from "@/data/repositories/movie-request-repository-impl";
import { ReportRepositoryImpl } from "@/data/repositories/report-repository-impl";
import { AdRepositoryImpl } from "@/data/repositories/ad-repository-impl";
import { AppConfigRepositoryImpl } from "@/data/repositories/app-config-repository-impl";
import { GameRepositoryImpl } from "@/data/repositories/game-repository-impl";

// Global Stores
import { UserStore } from "@/stores/user-store";
import { HomeStore } from "@/stores/home-store";
import { AdStore } from "@/stores/ad-store";
import { AppConfigStore } from "@/stores/app-config-store";

// Page-level Stores
import { FilterStore } from "@/stores/filter-store";
import { DiscoverStore } from "@/stores/discover-store";
import { MovieDetailStore } from "@/stores/movie-detail-store";
import { MyStore } from "@/stores/my-store";
import { PreviewStore } from "@/stores/preview-store";
import { GameStore } from "@/stores/game-store";

// Repository interfaces
import type { IAuthRepository } from "@/domain/repositories/auth-repository";
import type { ICategoryRepository } from "@/domain/repositories/category-repository";
import type { IMovieRepository } from "@/domain/repositories/movie-repository";
import type { IAdRepository } from "@/domain/repositories/ad-repository";
import type { IAppConfigRepository } from "@/domain/repositories/app-config-repository";
import type { ITopicRepository } from "@/domain/repositories/topic-repository";
import type { IActorRepository } from "@/domain/repositories/actor-repository";
import type { IFavoriteRepository } from "@/domain/repositories/favorite-repository";
import type { ISubscriptionRepository } from "@/domain/repositories/subscription-repository";
import type { ICommentRepository } from "@/domain/repositories/comment-repository";
import type { IHistoryRepository } from "@/domain/repositories/history-repository";
import type { INotificationRepository } from "@/domain/repositories/notification-repository";
import type { IReservationRepository } from "@/domain/repositories/reservation-repository";
import type { IGameRepository } from "@/domain/repositories/game-repository";

export function registerDependencies(container: Container): void {
  // Create Apollo Client
  const userStoreRef = { current: null as UserStore | null };
  const client = getApolloClient(
    () => storage.getToken(),
    () => userStoreRef.current?.handleUnauthenticated(),
  );

  // Register Repositories
  container.register(DI_KEYS.AuthRepository, () => new AuthRepositoryImpl(client));
  container.register(DI_KEYS.MovieRepository, () => new MovieRepositoryImpl(client));
  container.register(DI_KEYS.CategoryRepository, () => new CategoryRepositoryImpl(client));
  container.register(DI_KEYS.SearchRepository, () => new SearchRepositoryImpl(client));
  container.register(DI_KEYS.CommentRepository, () => new CommentRepositoryImpl(client));
  container.register(DI_KEYS.FavoriteRepository, () => new FavoriteRepositoryImpl(client));
  container.register(DI_KEYS.SubscriptionRepository, () => new SubscriptionRepositoryImpl(client));
  container.register(DI_KEYS.HistoryRepository, () => new HistoryRepositoryImpl(client));
  container.register(DI_KEYS.ActorRepository, () => new ActorRepositoryImpl(client));
  container.register(DI_KEYS.NotificationRepository, () => new NotificationRepositoryImpl(client));
  container.register(DI_KEYS.TopicRepository, () => new TopicRepositoryImpl(client));
  container.register(DI_KEYS.ReservationRepository, () => new ReservationRepositoryImpl(client));
  container.register(DI_KEYS.FeedbackRepository, () => new FeedbackRepositoryImpl(client));
  container.register(DI_KEYS.MovieRequestRepository, () => new MovieRequestRepositoryImpl(client));
  container.register(DI_KEYS.ReportRepository, () => new ReportRepositoryImpl(client));
  container.register(DI_KEYS.AdRepository, () => new AdRepositoryImpl(client));
  container.register(DI_KEYS.AppConfigRepository, () => new AppConfigRepositoryImpl(client));
  container.register(DI_KEYS.GameRepository, () => new GameRepositoryImpl(client));

  // Register Global Stores (Singletons)
  const userStore = new UserStore(container.get<IAuthRepository>(DI_KEYS.AuthRepository));
  userStoreRef.current = userStore;
  container.registerSingleton(DI_KEYS.UserStore, userStore);

  const homeStore = new HomeStore(
    container.get<ICategoryRepository>(DI_KEYS.CategoryRepository),
    container.get<IAdRepository>(DI_KEYS.AdRepository),
    container.get<IMovieRepository>(DI_KEYS.MovieRepository),
  );
  container.registerSingleton(DI_KEYS.HomeStore, homeStore);

  const adStore = new AdStore(container.get<IAdRepository>(DI_KEYS.AdRepository));
  container.registerSingleton(DI_KEYS.AdStore, adStore);

  const appConfigStore = new AppConfigStore(
    container.get<IAppConfigRepository>(DI_KEYS.AppConfigRepository),
  );
  container.registerSingleton(DI_KEYS.AppConfigStore, appConfigStore);

  // Register Page-level Store Factories (new instance per get())
  container.register(DI_KEYS.FilterStore, () => new FilterStore(
    container.get<IMovieRepository>(DI_KEYS.MovieRepository),
    container.get<ICategoryRepository>(DI_KEYS.CategoryRepository),
  ));

  container.register(DI_KEYS.DiscoverStore, () => new DiscoverStore(
    container.get<ITopicRepository>(DI_KEYS.TopicRepository),
    container.get<IActorRepository>(DI_KEYS.ActorRepository),
  ));

  container.register(DI_KEYS.MovieDetailStore, () => new MovieDetailStore(
    container.get<IMovieRepository>(DI_KEYS.MovieRepository),
    container.get<IFavoriteRepository>(DI_KEYS.FavoriteRepository),
    container.get<ISubscriptionRepository>(DI_KEYS.SubscriptionRepository),
    container.get<ICommentRepository>(DI_KEYS.CommentRepository),
  ));

  container.register(DI_KEYS.MyStore, () => new MyStore(
    container.getSingleton<UserStore>(DI_KEYS.UserStore),
    container.get<IHistoryRepository>(DI_KEYS.HistoryRepository),
    container.get<INotificationRepository>(DI_KEYS.NotificationRepository),
    container.get<IAppConfigRepository>(DI_KEYS.AppConfigRepository),
  ));

  container.register(DI_KEYS.PreviewStore, () => new PreviewStore(
    container.get<IMovieRepository>(DI_KEYS.MovieRepository),
    container.get<ICategoryRepository>(DI_KEYS.CategoryRepository),
    container.get<IReservationRepository>(DI_KEYS.ReservationRepository),
  ));

  container.register(DI_KEYS.GameStore, () => new GameStore(
    container.get<IGameRepository>(DI_KEYS.GameRepository),
  ));
}
