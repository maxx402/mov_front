export const DI_KEYS = {
  // Repositories
  AuthRepository: "AuthRepository",
  MovieRepository: "MovieRepository",
  CategoryRepository: "CategoryRepository",
  SearchRepository: "SearchRepository",
  CommentRepository: "CommentRepository",
  FavoriteRepository: "FavoriteRepository",
  SubscriptionRepository: "SubscriptionRepository",
  HistoryRepository: "HistoryRepository",
  ActorRepository: "ActorRepository",
  NotificationRepository: "NotificationRepository",
  TopicRepository: "TopicRepository",
  ReservationRepository: "ReservationRepository",
  FeedbackRepository: "FeedbackRepository",
  MovieRequestRepository: "MovieRequestRepository",
  ReportRepository: "ReportRepository",
  AdRepository: "AdRepository",
  AppConfigRepository: "AppConfigRepository",
  GameRepository: "GameRepository",

  // Stores (global singletons)
  UserStore: "UserStore",
  HomeStore: "HomeStore",
  AdStore: "AdStore",
  AppConfigStore: "AppConfigStore",

  // Stores (page-level factories)
  FilterStore: "FilterStore",
  DiscoverStore: "DiscoverStore",
  MovieDetailStore: "MovieDetailStore",
  MyStore: "MyStore",
  PreviewStore: "PreviewStore",
  GameStore: "GameStore",
} as const;
