"use client";

import { useRef, type ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { Container } from "@/core/di/container";
import { ContainerProvider } from "@/core/di/provider";
import { registerDependencies } from "@/core/di/register";
import { DI_KEYS } from "@/core/di/keys";
import { StoreProvider, type GlobalStores } from "@/stores/store-provider";
import type { UserStore } from "@/stores/user-store";
import type { HomeStore } from "@/stores/home-store";
import type { AdStore } from "@/stores/ad-store";
import type { AppConfigStore } from "@/stores/app-config-store";
import { getApolloClient } from "@/core/apollo/client";
import { storage } from "@/core/storage/storage";
import { ToastProvider } from "@/components/common/toast";
import { LoginSheet } from "@/components/feature/login-sheet";

interface Props {
  children: ReactNode;
}

function createContainer(): { container: Container; stores: GlobalStores } {
  const container = new Container();
  registerDependencies(container);

  const stores: GlobalStores = {
    userStore: container.getSingleton<UserStore>(DI_KEYS.UserStore),
    homeStore: container.getSingleton<HomeStore>(DI_KEYS.HomeStore),
    adStore: container.getSingleton<AdStore>(DI_KEYS.AdStore),
    appConfigStore: container.getSingleton<AppConfigStore>(DI_KEYS.AppConfigStore),
  };

  return { container, stores };
}

export function ClientProviders({ children }: Props) {
  const ref = useRef<{ container: Container; stores: GlobalStores } | null>(null);
  if (!ref.current) {
    ref.current = createContainer();
  }

  const { container, stores } = ref.current;
  const apolloClient = getApolloClient(
    () => storage.getToken(),
    () => stores.userStore.handleUnauthenticated(),
  );

  return (
    <ContainerProvider container={container}>
      <ApolloProvider client={apolloClient}>
        <StoreProvider stores={stores}>
          <ToastProvider>
            {children}
            <LoginSheet />
          </ToastProvider>
        </StoreProvider>
      </ApolloProvider>
    </ContainerProvider>
  );
}
