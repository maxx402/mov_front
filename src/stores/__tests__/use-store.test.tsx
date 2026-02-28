import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { StoreProvider, type GlobalStores } from "../store-provider";
import { useUserStore, useHomeStore, useAdStore, useAppConfigStore } from "../use-store";
import type { ReactNode } from "react";

const mockStores = {
  userStore: { name: "user" },
  homeStore: { name: "home" },
  adStore: { name: "ad" },
  appConfigStore: { name: "config" },
} as unknown as GlobalStores;

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider stores={mockStores}>{children}</StoreProvider>
);

describe("useUserStore", () => {
  it("returns userStore from context", () => {
    const { result } = renderHook(() => useUserStore(), { wrapper });
    expect(result.current).toBe(mockStores.userStore);
  });
});

describe("useHomeStore", () => {
  it("returns homeStore from context", () => {
    const { result } = renderHook(() => useHomeStore(), { wrapper });
    expect(result.current).toBe(mockStores.homeStore);
  });
});

describe("useAdStore", () => {
  it("returns adStore from context", () => {
    const { result } = renderHook(() => useAdStore(), { wrapper });
    expect(result.current).toBe(mockStores.adStore);
  });
});

describe("useAppConfigStore", () => {
  it("returns appConfigStore from context", () => {
    const { result } = renderHook(() => useAppConfigStore(), { wrapper });
    expect(result.current).toBe(mockStores.appConfigStore);
  });
});
