import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.js'),
      name: 'atmosphere-ui'
    },
    rollupOptions: {
      external: ['vue'],
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
      '~templates': path.resolve(__dirname, './src/components/templates')
    }
  }
})
