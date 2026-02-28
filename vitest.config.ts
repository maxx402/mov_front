import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: [
        "src/domain/**/*.ts",
        "src/core/**/*.ts",
        "src/core/**/*.tsx",
        "src/data/mappers/**/*.ts",
        "src/data/repositories/**/*.ts",
        "src/stores/**/*.ts",
        "src/stores/**/*.tsx",
        "src/app/**/client-providers.tsx",
      ],
      exclude: [
        "src/data/graphql/__generated__/**",
        "src/**/__tests__/**",
        "src/**/*.d.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
