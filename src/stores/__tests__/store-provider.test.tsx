import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { StoreProvider, useStores, type GlobalStores } from "../store-provider";
import type { ReactNode } from "react";

const mockStores = {
  userStore: {},
  homeStore: {},
  adStore: {},
  appConfigStore: {},
} as unknown as GlobalStores;

describe("StoreProvider", () => {
  it("renders children", () => {
    render(
      <StoreProvider stores={mockStores}>
        <div>child</div>
      </StoreProvider>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });
});

describe("useStores", () => {
  it("returns stores from context", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <StoreProvider stores={mockStores}>{children}</StoreProvider>
    );
    const { result } = renderHook(() => useStores(), { wrapper });
    expect(result.current).toBeDefined();
    expect(result.current.userStore).toBeDefined();
  });

  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useStores());
    }).toThrow("useStores must be used within a StoreProvider");
  });
});
