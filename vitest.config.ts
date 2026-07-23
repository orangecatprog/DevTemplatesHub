import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        globals: true,
        environment: "node",

        include: ["src/**/*.test.ts"],

        exclude: ["node_modules", "dist", "coverage", "**/*.fake.test.ts"],

        coverage: {
            provider: "v8",
            reporter: ["text", "html", "lcov", "json"],
            reportsDirectory: "coverage",
        },

        clearMocks: true,
        restoreMocks: true,
    },
});
