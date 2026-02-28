import { describe, it, expect, vi } from "vitest";

vi.mock("@/core/apollo/client", () => ({
  getApolloClient: vi.fn(() => ({ query: vi.fn(), mutate: vi.fn(), clearStore: vi.fn() })),
}));
vi.mock("@/core/storage/storage", () => ({
  storage: { getToken: vi.fn(() => null) },
}));

// Mock all repository implementations
vi.mock("@/data/repositories/auth-repository-impl", () => ({
  AuthRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/movie-repository-impl", () => ({
  MovieRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/category-repository-impl", () => ({
  CategoryRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/search-repository-impl", () => ({
  SearchRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/comment-repository-impl", () => ({
  CommentRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/favorite-repository-impl", () => ({
  FavoriteRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/subscription-repository-impl", () => ({
  SubscriptionRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/history-repository-impl", () => ({
  HistoryRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/actor-repository-impl", () => ({
  ActorRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/notification-repository-impl", () => ({
  NotificationRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/topic-repository-impl", () => ({
  TopicRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/reservation-repository-impl", () => ({
  ReservationRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/feedback-repository-impl", () => ({
  FeedbackRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/movie-request-repository-impl", () => ({
  MovieRequestRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/report-repository-impl", () => ({
  ReportRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/ad-repository-impl", () => ({
  AdRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/app-config-repository-impl", () => ({
  AppConfigRepositoryImpl: vi.fn(),
}));
vi.mock("@/data/repositories/game-repository-impl", () => ({
  GameRepositoryImpl: vi.fn(),
}));

// Mock all stores
vi.mock("@/stores/user-store", () => ({
  UserStore: vi.fn(),
}));
vi.mock("@/stores/home-store", () => ({
  HomeStore: vi.fn(),
}));
vi.mock("@/stores/ad-store", () => ({
  AdStore: vi.fn(),
}));
vi.mock("@/stores/app-config-store", () => ({
  AppConfigStore: vi.fn(),
}));
vi.mock("@/stores/filter-store", () => ({
  FilterStore: vi.fn(),
}));
vi.mock("@/stores/discover-store", () => ({
  DiscoverStore: vi.fn(),
}));
vi.mock("@/stores/movie-detail-store", () => ({
  MovieDetailStore: vi.fn(),
}));
vi.mock("@/stores/my-store", () => ({
  MyStore: vi.fn(),
}));
vi.mock("@/stores/preview-store", () => ({
  PreviewStore: vi.fn(),
}));
vi.mock("@/stores/game-store", () => ({
  GameStore: vi.fn(),
}));

import { Container } from "../container";
import { registerDependencies } from "../register";
import { DI_KEYS } from "../keys";

describe("registerDependencies", () => {
  it("registers all expected keys", () => {
    const container = new Container();
    registerDependencies(container);
    for (const key of Object.values(DI_KEYS)) {
      expect(container.has(key)).toBe(true);
    }
  });

  it("global stores are singletons", () => {
    const container = new Container();
    registerDependencies(container);
    expect(container.getSingleton(DI_KEYS.UserStore)).toBeDefined();
    expect(container.getSingleton(DI_KEYS.HomeStore)).toBeDefined();
    expect(container.getSingleton(DI_KEYS.AdStore)).toBeDefined();
    expect(container.getSingleton(DI_KEYS.AppConfigStore)).toBeDefined();
  });

  it("page stores create new instances each call", () => {
    const container = new Container();
    registerDependencies(container);
    const store1 = container.get(DI_KEYS.FilterStore);
    const store2 = container.get(DI_KEYS.FilterStore);
    expect(store1).not.toBe(store2);
  });
});
