import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5174,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      clientPort: 5174,
    },
    proxy: {
      '/api/hh': {
        target: 'https://api.hh.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hh/, ''),
        headers: {
          'HH-User-Agent': 'hh-api-app/1.0 (dimadima@gmail.com)',
        },
      },
    },
  },
  plugins: [react()],
})
