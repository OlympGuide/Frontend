import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    apiUrl: 'http://localhost:8081/',
  },

  e2e: {
    baseUrl: 'http://localhost:8000/',
    specPattern: '**/*.e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
    specPattern: '**/component-tests/*.cy.ts',
  },
});
