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
  FilterStore: "FilterStore",
  MyStore: "MyStore",
  PreviewStore: "PreviewStore",
  GameStore: "GameStore",

  // Stores (page-level factories)
  MovieDetailStore: "MovieDetailStore",
} as const;
