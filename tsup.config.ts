import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/infra/http/server.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  tsconfig: './tsconfig-prod.json'
});
