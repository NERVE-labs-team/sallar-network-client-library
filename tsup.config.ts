import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'SallarNetworkClient',
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'es2020',
});
