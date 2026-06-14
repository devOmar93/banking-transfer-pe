import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: ['node_modules/', 'test/'],
    },
  },

  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
});