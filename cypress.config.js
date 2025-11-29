import { defineConfig } from "cypress";
import reporter from 'cypress-mochawesome-reporter/plugin.js';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import { configureAllureAdapterPlugins } from '@mmisty/cypress-allure-adapter/plugins';

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
      url: "https://rahulshettyacademy.com",
      allure: true,
      allureResultsPath: 'allure-results'
    },
    chromeWebSecurity: false,
    downloadsFolder: 'cypress/downloads',
    async setupNodeEvents(on, config) {
      // Register Mochawesome Reporter (TDD)
      reporter(on);
      
      // Register Allure Reporter (TDD & BDD) - Register BEFORE Cucumber
      await configureAllureAdapterPlugins(on, config, {
        enableInfo: false // Disable Allure server during test run
      });
      
      // Register Cucumber Preprocessor (BDD) - Register LAST
      await addCucumberPreprocessorPlugin(on, config);
      
      // Webpack configuration for TypeScript and Feature files
      on(
        "file:preprocessor",
        webpack({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".js"],
            },
            module: {
              rules: [
                {
                  test: /\.ts$/,
                  exclude: [/node_modules/],
                  use: [
                    {
                      loader: "ts-loader",
                    },
                  ],
                },
                {
                  test: /\.feature$/,
                  use: [
                    {
                      loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                      options: config,
                    },
                  ],
                },
              ],
            },
          },
        })
      );
      
      return config;
    },
    retries: {
      runMode: 1,
      openMode: 0
    },
    specPattern: [
      "cypress/e2e/TDD/**/*.cy.ts",
      "cypress/e2e/BDD/**/*.feature"
    ],
    screenshotOnRunFailure: true,
    video: false
  },
});
