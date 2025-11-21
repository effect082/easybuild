import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      closeBundle() {
        const dist = path.resolve(__dirname, 'dist');
        const index = path.join(dist, 'index.html');
        const fourOhFour = path.join(dist, '404.html');
        if (fs.existsSync(index)) {
          fs.copyFileSync(index, fourOhFour);
          console.log('✓ Copied index.html to 404.html');
        }
      }
    }
  ],
  base: '/easybuild/',  // GitHub Pages repository path
  build: {
    outDir: 'dist',
  },
})
