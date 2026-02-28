import { useStores } from "./store-provider";
import type { UserStore } from "./user-store";
import type { HomeStore } from "./home-store";
import type { AdStore } from "./ad-store";
import type { AppConfigStore } from "./app-config-store";

export function useUserStore(): UserStore {
  return useStores().userStore;
}

export function useHomeStore(): HomeStore {
  return useStores().homeStore;
}

export function useAdStore(): AdStore {
  return useStores().adStore;
}

export function useAppConfigStore(): AppConfigStore {
  return useStores().appConfigStore;
}
