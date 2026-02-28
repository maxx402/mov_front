"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import type { UserStore } from "./user-store";
import type { HomeStore } from "./home-store";
import type { AdStore } from "./ad-store";
import type { AppConfigStore } from "./app-config-store";

export interface GlobalStores {
  userStore: UserStore;
  homeStore: HomeStore;
  adStore: AdStore;
  appConfigStore: AppConfigStore;
}

const StoreContext = createContext<GlobalStores | null>(null);

interface Props {
  stores: GlobalStores;
  children: ReactNode;
}

export function StoreProvider({ stores, children }: Props) {
  const storesRef = useRef(stores);
  return (
    <StoreContext.Provider value={storesRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStores(): GlobalStores {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return ctx;
}
