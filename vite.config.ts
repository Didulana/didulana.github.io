import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to https://didulana.github.io (user site), so assets are served from the root.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
