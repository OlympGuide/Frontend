import { defineConfig } from 'cypress';
import coverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    apiUrl: 'http://localhost:8081/',
    auth0Url: 'https://dev-ooenivxi0xqapns6.us.auth0.com',
  },

  viewportWidth: 1920,
  viewportHeight: 1200,
  chromeWebSecurity: false,

  e2e: {
    baseUrl: 'http://localhost:8000/',

    specPattern: '**/*.e2e.ts',
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
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
