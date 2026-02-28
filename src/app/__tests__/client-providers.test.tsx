import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@apollo/client/react", () => ({
  ApolloProvider: ({ children }: any) => <div>{children}</div>,
}));

vi.mock("@/core/di/container", () => {
  const mockStore = { handleUnauthenticated: vi.fn() };
  class MockContainer {
    getSingleton = vi.fn(() => mockStore);
    get = vi.fn();
    register = vi.fn();
    registerSingleton = vi.fn();
  }
  return { Container: MockContainer };
});

vi.mock("@/core/di/register", () => ({
  registerDependencies: vi.fn(),
}));

vi.mock("@/core/apollo/client", () => ({
  getApolloClient: vi.fn(() => ({})),
}));

vi.mock("@/core/storage/storage", () => ({
  storage: { getToken: vi.fn(() => null) },
}));

vi.mock("@/core/di/keys", () => ({
  DI_KEYS: {
    UserStore: "UserStore",
    HomeStore: "HomeStore",
    AdStore: "AdStore",
    AppConfigStore: "AppConfigStore",
  },
}));

import { ClientProviders } from "../client-providers";

describe("ClientProviders", () => {
  it("renders children", () => {
    render(
      <ClientProviders>
        <div>test child</div>
      </ClientProviders>,
    );
    expect(screen.getByText("test child")).toBeInTheDocument();
  });
});
