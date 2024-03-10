import { defineConfig } from 'tsup'

export default defineConfig({
  dts: true,
  entry: ['src/index.ts', 'src/skeleton/index.ts'],
  format: ['esm'],
  sourcemap: true
})
