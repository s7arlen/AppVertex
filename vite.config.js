import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/AppVertex/' : '/',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        work: resolve(__dirname, 'work.html'),
        process: resolve(__dirname, 'process.html'),
        upskill: resolve(__dirname, 'upskill.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
}));
