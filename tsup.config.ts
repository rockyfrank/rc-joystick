import { lessLoader } from 'esbuild-plugin-less';
import { defineConfig, Options } from 'tsup';

const baseConfig: Options = {
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  esbuildPlugins: [lessLoader()],
  banner: {
    js: "import './index.css'",
  },
};

export default defineConfig([
  {
    ...baseConfig,
    format: 'esm',
    target: 'esnext',
    outDir: 'dist/es',
  },
  {
    ...baseConfig,
    format: 'cjs',
    target: 'es5',
    outDir: 'dist/lib',
  },
]);
