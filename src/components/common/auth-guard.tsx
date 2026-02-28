"use client";

import { observer } from "mobx-react-lite";
import { useUserStore } from "@/stores/use-store";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = observer(function AuthGuard({ children, fallback }: Props) {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    userStore.openLoginSheet();
    return null;
  }

  return <>{children}</>;
});
