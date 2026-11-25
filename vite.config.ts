import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        /* "-r2" suffix: new file URLs, so browsers drop cached 404s for old /assets/* paths
           (vercel.json serves /assets/* as immutable for a year, 404s included) */
        entryFileNames: 'assets/[name]-[hash]-r2.js',
        chunkFileNames: 'assets/[name]-[hash]-r2.js',
      },
    },
  },
});
