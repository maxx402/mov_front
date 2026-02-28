import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { ContainerProvider, useContainer } from "../provider";
import { Container } from "../container";
import type { ReactNode } from "react";

describe("ContainerProvider", () => {
  it("renders children", () => {
    const container = new Container();
    render(
      <ContainerProvider container={container}>
        <div>child</div>
      </ContainerProvider>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });
});

describe("useContainer", () => {
  it("returns container from context", () => {
    const container = new Container();
    container.register("test", () => 42);
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ContainerProvider container={container}>{children}</ContainerProvider>
    );
    const { result } = renderHook(() => useContainer(), { wrapper });
    expect(result.current.get("test")).toBe(42);
  });

  it("throws when used outside provider", () => {
    expect(() => {
      renderHook(() => useContainer());
    }).toThrow("useContainer must be used within a ContainerProvider");
  });
});
