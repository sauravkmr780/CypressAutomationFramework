import { defineConfig } from "cypress";
import reporter from 'cypress-mochawesome-reporter/plugin.js';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import { configureAllureAdapterPlugins } from '@mmisty/cypress-allure-adapter/plugins';
import sql from 'mssql';
import dotenv from 'dotenv';
import XLSX from 'xlsx';

// Load environment variables from .env file
dotenv.config();

// Azure SQL Server Configuration
const dbConfig = {
  server: process.env.DB_SERVER || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  options: {
    encrypt: true, // Required for Azure SQL
    trustServerCertificate: false
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

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
      
      // Database tasks for Azure SQL Server
      on('task', {
        async dbQuery(query) {
          try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query(query);
            await pool.close();
            return result.recordset;
          } catch (error) {
            console.error('Database query error:', error);
            throw error;
          }
        },
        
        async dbExecuteProc({ procedureName, params }) {
          try {
            const pool = await sql.connect(dbConfig);
            const request = pool.request();
            
            if (params && Array.isArray(params)) {
              params.forEach((param, index) => {
                request.input(`param${index}`, param);
              });
            }
            
            const result = await request.execute(procedureName);
            await pool.close();
            return result.recordset;
          } catch (error) {
            console.error('Stored procedure error:', error);
            throw error;
          }
        },
        
        async dbInsert({ table, data }) {
          try {
            const pool = await sql.connect(dbConfig);
            const columns = Object.keys(data).join(', ');
            const values = Object.values(data).map(v => `'${v}'`).join(', ');
            const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
            await pool.request().query(query);
            await pool.close();
            return null;
          } catch (error) {
            console.error('Database insert error:', error);
            throw error;
          }
        },
        
        async dbUpdate({ table, data, where }) {
          try {
            const pool = await sql.connect(dbConfig);
            const updates = Object.entries(data).map(([key, val]) => `${key} = '${val}'`).join(', ');
            const query = `UPDATE ${table} SET ${updates} WHERE ${where}`;
            await pool.request().query(query);
            await pool.close();
            return null;
          } catch (error) {
            console.error('Database update error:', error);
            throw error;
          }
        },
        
        async dbDelete({ table, where }) {
          try {
            const pool = await sql.connect(dbConfig);
            const query = `DELETE FROM ${table} WHERE ${where}`;
            await pool.request().query(query);
            await pool.close();
            return null;
          } catch (error) {
            console.error('Database delete error:', error);
            throw error;
          }
        },
        
        // Excel file reading tasks
        readExcel({ filePath, sheetName }) {
          try {
            const workbook = XLSX.readFile(filePath);
            const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(sheet);
            return data;
          } catch (error) {
            console.error('Excel read error:', error);
            throw error;
          }
        },
        
        readExcelSheetNames(filePath) {
          try {
            const workbook = XLSX.readFile(filePath);
            return workbook.SheetNames;
          } catch (error) {
            console.error('Excel sheet names error:', error);
            throw error;
          }
        },
        
        readExcelAllSheets(filePath) {
          try {
            const workbook = XLSX.readFile(filePath);
            const allSheets = {};
            workbook.SheetNames.forEach(sheetName => {
              allSheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            });
            return allSheets;
          } catch (error) {
            console.error('Excel read all sheets error:', error);
            throw error;
          }
        }
      });
      
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
