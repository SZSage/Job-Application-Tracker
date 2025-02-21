import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "./src"), // ✅ Fix: Alias @ to src folder
        },
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true
        }
    }
})
