import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts'],
    coverage: {
      include: ['app/utils/**/*.ts', 'app/stores/**/*.ts']
    }
  }
})
