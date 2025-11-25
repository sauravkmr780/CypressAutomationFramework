import { defineConfig } from "cypress";
import reporter from 'cypress-mochawesome-reporter/plugin.js';

export default defineConfig({
  projectId: "ts6nbs", // Replace with actual projectId from Cypress Cloud
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    env: {
      url: "https://rahulshettyacademy.com"
    },
    setupNodeEvents(on, config) {
      reporter(on);
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.ts",
    screenshotOnRunFailure: true,
    video: false
  },
});
