import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import importMetaEnv from '@import-meta-env/unplugin';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    importMetaEnv.vite({
      example: '.env.example.public',
      env: '.env.local',
    }),
    vue(),
    istanbul({
      cypress: true,
      requireEnv: false,
      extension: ['.js', '.ts', '.vue'],
      exclude: ['node_modules', 'test/', 'coverage/', 'cypress/'],
      nycrcPath: './.nycrc.json',
      forceBuildInstrument: true,
    }),
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
    cors: true,
    port: 8000,
    watch: {
      usePolling: true,
    },
  },
});
