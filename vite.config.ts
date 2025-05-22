import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: "/genuary2025",
  
  plugins: [
    tailwindcss(),
    react(),
    checker({typescript: true}),
  ],
})