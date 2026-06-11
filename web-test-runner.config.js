import { fromRollup } from '@web/dev-server-rollup';
import alias from '@rollup/plugin-alias';
import path from 'path';
import { fileURLToPath } from 'url';

const rollupAlias = fromRollup(alias);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  files: ['test/**/*.test.js'],
  nodeResolve: true,
  plugins: [
    rollupAlias({
      entries: [
        {
          find: '@utils',
          replacement: path.resolve(__dirname, 'src/utils'),
        },
      ],
    }),
  ],
};
