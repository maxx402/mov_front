type Factory<T> = () => T;

export class Container {
  private singletons = new Map<string, unknown>();
  private factories = new Map<string, Factory<unknown>>();

  register<T>(key: string, factory: Factory<T>): void {
    this.factories.set(key, factory as Factory<unknown>);
  }

  registerSingleton<T>(key: string, instance: T): void {
    this.singletons.set(key, instance);
  }

  get<T>(key: string): T {
    const singleton = this.singletons.get(key);
    if (singleton !== undefined) {
      return singleton as T;
    }

    const factory = this.factories.get(key);
    if (factory) {
      return factory() as T;
    }

    throw new Error(`Dependency "${key}" not registered in container.`);
  }

  getSingleton<T>(key: string): T {
    const singleton = this.singletons.get(key);
    if (singleton !== undefined) {
      return singleton as T;
    }
    throw new Error(`Singleton "${key}" not registered in container.`);
  }

  has(key: string): boolean {
    return this.singletons.has(key) || this.factories.has(key);
  }

  reset(): void {
    this.singletons.clear();
    this.factories.clear();
  }
}

export const container = new Container();
