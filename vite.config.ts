import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // you can also use 'es2020' here
    outDir: 'build',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // you can also use 'es2020' here
    },
  },
})
