import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
 //base: '/feishu-print/',
  plugins: [
    vue(),

  ],
  server: {
    port: 5155,
  },
  // server: {
  //   proxy: {
  //     '/upload': 'http://localhost:3000',
  //   },
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
