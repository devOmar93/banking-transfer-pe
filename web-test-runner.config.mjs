import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  files: 'src/test/**/*.test.js',
  nodeResolve: true,
  
  coverage: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  },
  
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '@/': '/src/',
          },
        },
      },
    }),
  ],
};