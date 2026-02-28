import { describe, it, expect } from "vitest";
import { Container } from "../container";

describe("Container", () => {
  it("registers and gets factory", () => {
    const c = new Container();
    c.register("key", () => 42);
    expect(c.get("key")).toBe(42);
  });

  it("calls factory each time for register", () => {
    const c = new Container();
    let count = 0;
    c.register("key", () => ++count);
    expect(c.get("key")).toBe(1);
    expect(c.get("key")).toBe(2);
  });

  it("registers and gets singleton", () => {
    const c = new Container();
    const obj = { id: 1 };
    c.registerSingleton("key", obj);
    expect(c.get("key")).toBe(obj);
    expect(c.getSingleton("key")).toBe(obj);
  });

  it("singleton takes priority over factory", () => {
    const c = new Container();
    c.register("key", () => "factory");
    c.registerSingleton("key", "singleton");
    expect(c.get("key")).toBe("singleton");
  });

  it("throws for unregistered key in get", () => {
    const c = new Container();
    expect(() => c.get("missing")).toThrow('Dependency "missing" not registered');
  });

  it("throws for unregistered key in getSingleton", () => {
    const c = new Container();
    expect(() => c.getSingleton("missing")).toThrow('Singleton "missing" not registered');
  });

  it("has returns true for registered keys", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.registerSingleton("b", 2);
    expect(c.has("a")).toBe(true);
    expect(c.has("b")).toBe(true);
    expect(c.has("c")).toBe(false);
  });

  it("reset clears all", () => {
    const c = new Container();
    c.register("a", () => 1);
    c.registerSingleton("b", 2);
    c.reset();
    expect(c.has("a")).toBe(false);
    expect(c.has("b")).toBe(false);
  });
});
