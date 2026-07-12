import { defineConfig } from 'vite'           // Import Vite config helper
import vue from '@vitejs/plugin-vue'          // Enable Vue 3 support
import tailwindcss from '@tailwindcss/vite'   // Tailwind CSS Vite plugin (v4+)
import path from 'path'                       // Node.js path module (used for alias)

export default defineConfig({
  plugins: [
    vue(),           // Register Vue plugin
    tailwindcss(),   // Enable Tailwind CSS processing
  ],

  server: {
    proxy: {
      "/api": {
        target: "https://g2-sun-11-mpos-back.onrender.com",
        changeOrigin: true,
        secure: true,
      },
      "/sanctum": {
        target: "https://g2-sun-11-mpos-back.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '@' will now point to the /src folder
      // Example:
      // '@/components/Button.vue' → 'src/components/Button.vue'
    },
  },
})
