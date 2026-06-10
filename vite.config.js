import { defineConfig } from 'vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [ViteYaml()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
