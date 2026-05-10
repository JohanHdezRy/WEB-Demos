import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/WEB-Demos/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText'],
          three: ['three'],
          glmatrix: ['gl-matrix'],
        },
      },
    },
  },
})
