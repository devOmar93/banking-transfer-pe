import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
