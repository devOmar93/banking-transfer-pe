import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@compositions": path.resolve(__dirname, "./src/compositions"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@DM": path.resolve(__dirname, "./src/providers/data-managers"),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
      ],
    },
  },
});
