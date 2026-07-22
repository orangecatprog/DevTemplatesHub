import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",

        include: ["src/**/*.test.ts"],

        exclude: ["node_modules", "dist", "coverage"],

        coverage: {
            provider: "v8",
            reporter: ["text", "html", "lcov", "json"],
            reportsDirectory: "coverage",
        },

        clearMocks: true,
        restoreMocks: true,
    },
});
