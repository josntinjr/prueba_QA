import { defineConfig } from 'cypress';
import { createRequire } from 'node:module';

const nodeRequire = createRequire(__filename);
const mochawesome = nodeRequire('cypress-mochawesome-reporter/plugin') as (
  on: Cypress.PluginEvents
) => void;

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://practicetestautomation.com/practice-test-login/',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    pageLoadTimeout: 90000,
    retries: { runMode: 1 },
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    },
  },
});
