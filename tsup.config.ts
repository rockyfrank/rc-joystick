import { lessLoader } from 'esbuild-plugin-less';
import { defineConfig, Options } from 'tsup';

const baseConfig: Options = {
  entry: ['src/index.tsx'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  esbuildPlugins: [lessLoader()],
};

export default defineConfig([
  {
    ...baseConfig,
    target: 'esnext',
    outDir: 'dist/es',
  },
  {
    ...baseConfig,
    target: 'es5',
    outDir: 'dist/lib',
  },
]);
