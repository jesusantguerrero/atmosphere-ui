import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['src/**/*.spec.*'],
    deps: {
      inline: ['ts-deepmerge'],
    },
    environment: 'happy-dom',
    globals: true
  },
})