import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'atmosphere-ui'
    },
    rollupOptions: {
      external: ['vue', '@inertiajs/inertia-vue3', '@inertiajs/inertia', '@vueuse/core', 'axios'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        }
      }
    }
  },
  resolve: {
    alias: {
      '~/': path.resolve(__dirname, './src'),
      '~atoms': path.resolve(__dirname, './src/components/atoms'),
      '~molecules': path.resolve(__dirname, './src/components/molecules'),
      '~organisms': path.resolve(__dirname, './src/components/organisms'),
      '~templates': path.resolve(__dirname, './src/components/templates'),
      '~utils': path.resolve(__dirname, './src/utils')
    }
  },
  test: {
    include: ['src/**/*.spec.*'],
    environment: 'jsdom',
    globals: true
  },
})
