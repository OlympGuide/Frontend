import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import importMetaEnv from "@import-meta-env/unplugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importMetaEnv.vite({ 
      example: ".env.example.public", 
      env: ".env.local",
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 8000,
    },
    port: 8000,
    watch: {
      usePolling: true,
    },
  },
});
