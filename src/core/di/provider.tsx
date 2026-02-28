"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Container } from "./container";

const ContainerContext = createContext<Container | null>(null);

interface Props {
  container: Container;
  children: ReactNode;
}

export function ContainerProvider({ container, children }: Props) {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
}

export function useContainer(): Container {
  const ctx = useContext(ContainerContext);
  if (!ctx) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return ctx;
}
