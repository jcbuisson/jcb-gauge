import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/jcb-gauge.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})
