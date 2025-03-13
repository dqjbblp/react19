import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: { 
    rollupOptions: { 
        input: {
          index: resolve(__dirname, "index.html"),
          index2: resolve(__dirname, "index2.html"),
        },
        output:{
          
        }
    },
  },
})
