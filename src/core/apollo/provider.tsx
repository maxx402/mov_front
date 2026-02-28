"use client";

import { ApolloProvider as BaseApolloProvider } from "@apollo/client/react";
import { type ReactNode, useRef } from "react";
import type { ApolloClient } from "@apollo/client";
import { getApolloClient } from "./client";
import { storage } from "@/core/storage/storage";

interface Props {
  children: ReactNode;
  onUnauthenticated?: () => void;
}

export function ApolloProvider({ children, onUnauthenticated }: Props) {
  const clientRef = useRef<ApolloClient | null>(null);

  if (!clientRef.current) {
    clientRef.current = getApolloClient(
      () => storage.getToken(),
      onUnauthenticated,
    );
  }

  return (
    <BaseApolloProvider client={clientRef.current}>
      {children}
    </BaseApolloProvider>
  );
}
