import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    // eslint({
    //   lintOnStart: true,
    //   failOnError: mode === "production"
    // })
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    },
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; connect-src 'self' http://localhost:8000",
    }
  }
}));
