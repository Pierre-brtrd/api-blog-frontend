import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const common = {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/abstracts/index" as *;',
        },
      },
    },
  }

  if (command === 'serve') {
    // mode = 'development' par défaut
    return {
      ...common,
      server: {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost+2-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost+2.pem')),
        },
        host: 'localhost',
        port: 3000,
      }
    }
  } else {
    // build / preview
    return {
      ...common,
      // pas de https local ici
      server: {
        host: '0.0.0.0',
      }
    }
  }
})
