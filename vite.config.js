import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tonitoar.github.io/', // Change this to match your repository name
  server: {
    open: true, // Automatically open the app in the default browser
  },
  build: {
    outDir: 'dist', // Output directory for the build
  },
});

