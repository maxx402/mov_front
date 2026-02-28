const isClient = typeof window !== "undefined";

function getItem(key: string): string | null {
  if (!isClient) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage full or unavailable
  }
}

function removeItem(key: string): void {
  if (!isClient) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

const KEYS = {
  TOKEN: "auth_token",
  USER: "cached_user",
} as const;

export const storage = {
  getToken: (): string | null => getItem(KEYS.TOKEN),
  setToken: (token: string): void => setItem(KEYS.TOKEN, token),
  removeToken: (): void => removeItem(KEYS.TOKEN),

  getCachedUser: <T>(): T | null => {
    const raw = getItem(KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
  setCachedUser: <T>(user: T): void => setItem(KEYS.USER, JSON.stringify(user)),
  removeCachedUser: (): void => removeItem(KEYS.USER),

  clear: (): void => {
    removeItem(KEYS.TOKEN);
    removeItem(KEYS.USER);
  },
} as const;
