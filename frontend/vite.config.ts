import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  optimizeDeps: {
    exclude: ['@aztec/bb.js'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  worker: {
    format: 'es',
    plugins: () => []
  },
  build: {
    target: 'esnext'
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})