import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["scripts/workspace.mjs"],
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: "coverage/unit",
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
});
