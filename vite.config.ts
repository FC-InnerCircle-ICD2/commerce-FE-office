import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://3.37.67.153:8081/api/v1/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, ''),
      },
      '/api/banners': {
        target: 'http://3.38.23.68:8080/api/admin/v1/banners',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/banners/, ''),
      },
    },
  },
});
