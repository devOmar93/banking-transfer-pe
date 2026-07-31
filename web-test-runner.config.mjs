import { vitePlugin } from "@remcovaes/web-test-runner-vite-plugin";

export default {
  files: "src/test/**/*.test.js",
  nodeResolve: true,

  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: "coverage",
    threshold: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
    include: ["src/**/*.js", "src/**/*.ts"],
    exclude: ["node_modules/**", "**/test/**", "**/*.test.js"],
  },

  plugins: [vitePlugin()],
};
