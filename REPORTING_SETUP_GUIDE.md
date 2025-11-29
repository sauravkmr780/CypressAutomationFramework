# Complete Reporting Setup Guide for TDD & BDD Framework

**Project:** Cypress Automation Framework  
**Author:** Saurav Kumar  
**Date:** November 28, 2025  
**Version:** 1.0.0

---

## Table of Contents

1. [Overview](#overview)
2. [Part A: TDD Reporting Setup (Mochawesome)](#part-a-tdd-reporting-setup-mochawesome)
3. [Part B: BDD Reporting Setup (Cucumber HTML)](#part-b-bdd-reporting-setup-cucumber-html)
4. [Complete Package.json Scripts](#complete-packagejson-scripts)
5. [Quick Reference Guide](#quick-reference-guide)
6. [Workflow Examples](#workflow-examples)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This guide covers the complete setup for generating HTML reports in a Cypress TypeScript automation framework:

- **TDD Tests (.cy.ts files)** → Mochawesome HTML Report
- **BDD Tests (.feature files)** → Cucumber HTML Report

### Why Two Different Reporters?

- **Mochawesome**: Best for traditional Cypress tests with detailed test metrics, charts, and screenshots
- **Cucumber HTML**: Best for BDD tests with proper Gherkin syntax display (Given/When/Then steps)

---

## Part A: TDD Reporting Setup (Mochawesome)

### Step 1: Install Mochawesome Reporter

```bash
npm install --save-dev cypress-mochawesome-reporter
```

**What this installs:**
- `cypress-mochawesome-reporter`: Main reporter plugin
- Dependencies for JSON to HTML conversion

---

### Step 2: Configure cypress.config.js

Update your `cypress.config.js` file:

```javascript
import { defineConfig } from "cypress";
import reporter from 'cypress-mochawesome-reporter/plugin.js';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";

export default defineConfig({
  projectId: "ts6nbs",
  
  // Mochawesome Reporter Configuration
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
    async setupNodeEvents(on, config) {
      // Register Mochawesome Reporter
      reporter(on);
      
      // Register Cucumber Preprocessor (for BDD)
      await addCucumberPreprocessorPlugin(on, config);
      
      // Webpack configuration for TypeScript and Feature files
      on("file:preprocessor", webpack({
        webpackOptions: {
          resolve: { 
            extensions: [".ts", ".js"] 
          },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [{ loader: "ts-loader" }],
              },
              {
                test: /\.feature$/,
                use: [{
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                }],
              },
            ],
          },
        },
      }));
      
      return config;
    },
    retries: {
      runMode: 1,
      openMode: 0
    },
    specPattern: [
      "cypress/e2e/**/*.cy.ts",
      "cypress/e2e/**/*.feature"
    ],
    screenshotOnRunFailure: true,
    video: false
  },
});
```

**Key Configuration Options:**

| Option | Value | Description |
|--------|-------|-------------|
| `reportDir` | `'cypress/reports'` | Directory where reports are saved |
| `charts` | `true` | Enable visual charts in report |
| `reportPageTitle` | `'Cypress Test Report'` | Browser tab title |
| `embeddedScreenshots` | `true` | Include screenshots in HTML |
| `inlineAssets` | `true` | Single HTML file (no external files) |
| `saveAllAttempts` | `false` | Don't save retry attempts |

---

### Step 3: Register in cypress/support/e2e.ts

Add to `cypress/support/e2e.ts`:

```typescript
// Import commands.ts using ES2015 syntax:
import './commands'

// Import cypress-mochawesome-reporter for test reporting
import 'cypress-mochawesome-reporter/register'

// Tag-based test filtering for TDD
beforeEach(function () {
  const grep = Cypress.env('grep')
  if (grep) {
    const testTitle = this.currentTest?.title
    if (testTitle && !testTitle.includes(grep)) {
      this.skip()
    }
  }
})
```

**What this does:**
- Registers Mochawesome reporter hooks
- Enables tag-based filtering for TDD tests
- Skips tests that don't match the grep pattern

---

### Step 4: Add TDD Report Scripts to package.json

```json
{
  "scripts": {
    "clean:reports": "if exist cypress\\reports rmdir /s /q cypress\\reports && mkdir cypress\\reports",
    "generate:report": "npx mochawesome-merge cypress/reports/.jsons/*.json -o cypress/reports/report.json && npx marge cypress/reports/report.json -f index -o cypress/reports/html",
    
    "cypress:run": "npm run clean:reports && cypress run && npm run generate:report",
    "cypress:report": "npm run clean:reports && cypress run && npm run generate:report && start cypress\\reports\\html\\index.html",
    
    "test:smoke": "npm run clean:reports && cypress run --env grep=@smoke && npm run generate:report",
    "test:smoke:report": "npm run clean:reports && cypress run --env grep=@smoke && npm run generate:report && start cypress\\reports\\html\\index.html",
    
    "open:report": "start cypress\\reports\\html\\index.html"
  }
}
```

**Script Breakdown:**

| Script | Purpose |
|--------|---------|
| `clean:reports` | Removes old reports directory and creates fresh one |
| `generate:report` | Merges JSON files and generates HTML report |
| `cypress:run` | Run all tests + generate report |
| `cypress:report` | Run all tests + generate report + auto-open |
| `test:smoke` | Run smoke tests + generate report |
| `test:smoke:report` | Run smoke tests + generate report + auto-open |
| `open:report` | Open existing report in browser |

---

### Step 5: Run TDD Tests

```bash
# Run all TDD tests and auto-open report
npm run cypress:report

# Run TDD smoke tests and auto-open report
npm run test:smoke:report

# Run specific TDD test file
npm run clean:reports && cypress run --spec "cypress/e2e/Test1.cy.ts" && npm run generate:report

# Just generate report from existing JSON
npm run generate:report

# Open existing TDD report
npm run open:report
```

---

### Step 6: View TDD Report

**Report Location:**  
`cypress/reports/html/index.html`

**Full Path:**  
`C:\Users\Saura\Desktop\CypressAutomation\cypress\reports\html\index.html`

**Report Features:**

✅ **Dashboard Summary**
- Total tests count
- Pass/Fail/Pending/Skipped numbers
- Pass rate percentage
- Total execution duration

✅ **Visual Charts**
- Pie chart: Test distribution
- Bar chart: Duration by suite

✅ **Test Details**
- Each test with status indicator
- Error messages for failures
- Code snippets showing failure location
- Stack traces

✅ **Screenshots**
- Embedded screenshots for failed tests
- Captured at failure point

✅ **Expandable Suites**
- Click to expand/collapse test suites
- Nested test organization
- Filter by status

✅ **Single HTML File**
- All assets embedded (CSS, JS, images)
- Easy to share via email or storage

---

## Part B: BDD Reporting Setup (Cucumber HTML)

### Step 1: Install Cucumber HTML Reporter

```bash
npm install --save-dev multiple-cucumber-html-reporter
```

**What this installs:**
- `multiple-cucumber-html-reporter`: Converts Cucumber JSON to beautiful HTML
- Supports multiple feature files
- Generates comprehensive Gherkin reports

---

### Step 2: Configure Cucumber Preprocessor

Create/Update `.cypress-cucumber-preprocessorrc.json` in project root:

```json
{
  "stepDefinitions": [
    "cypress/e2e/BDD/**/*.ts"
  ],
  "messages": {
    "enabled": false
  },
  "json": {
    "enabled": true,
    "output": "cypress/reports/cucumber-json/cucumber-report.json"
  },
  "filterSpecs": true,
  "omitFiltered": true
}
```

**Configuration Options:**

| Option | Value | Description |
|--------|-------|-------------|
| `stepDefinitions` | `["cypress/e2e/BDD/**/*.ts"]` | Where step definitions are located |
| `messages.enabled` | `false` | Disable Cucumber messages (not needed) |
| `json.enabled` | `true` | Generate JSON reports |
| `json.output` | Path to JSON file | Where to save JSON report |
| `filterSpecs` | `true` | Enable tag filtering |
| `omitFiltered` | `true` | Skip scenarios not matching tags |

---

### Step 3: Create Cucumber Report Generator

Create `cucumber-report.js` in project root:

```javascript
const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: './cypress/reports/cucumber-json/',
    reportPath: './cypress/reports/cucumber-html/',
    metadata: {
        browser: {
            name: 'chrome',
            version: '120'
        },
        device: 'Local Machine',
        platform: {
            name: 'Windows',
            version: '11'
        }
    },
    customData: {
        title: 'Cypress BDD Test Execution Report',
        data: [
            { label: 'Project', value: 'Cypress Automation Framework' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Date', value: new Date().toLocaleString() }
        ]
    }
});

console.log('Cucumber HTML report generated successfully!');
```

**Customization Options:**

- **jsonDir**: Directory containing Cucumber JSON files
- **reportPath**: Where to generate HTML report
- **metadata**: Browser, device, platform information
- **customData**: Project-specific information displayed in report

---

### Step 4: Add BDD Report Scripts to package.json

```json
{
  "scripts": {
    "generate:cucumber:report": "node cucumber-report.js",
    
    "test:bdd:smoke": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' --env tags=@smoke && npm run generate:cucumber:report",
    "test:bdd:smoke:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' --env tags=@smoke && npm run generate:cucumber:report && start cypress\\reports\\cucumber-html\\index.html",
    
    "test:bdd:all": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' && npm run generate:cucumber:report",
    "test:bdd:all:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' && npm run generate:cucumber:report && start cypress\\reports\\cucumber-html\\index.html",
    
    "open:bdd:report": "start cypress\\reports\\cucumber-html\\index.html"
  }
}
```

**Script Breakdown:**

| Script | Purpose |
|--------|---------|
| `generate:cucumber:report` | Generate Cucumber HTML from JSON |
| `test:bdd:smoke` | Run smoke BDD tests + generate report |
| `test:bdd:smoke:report` | Run smoke BDD tests + generate report + auto-open |
| `test:bdd:all` | Run all BDD tests + generate report |
| `test:bdd:all:report` | Run all BDD tests + generate report + auto-open |
| `open:bdd:report` | Open existing Cucumber report |

---

### Step 5: Run BDD Tests

```bash
# Run all BDD tests and auto-open report
npm run test:bdd:all:report

# Run BDD smoke tests and auto-open report
npm run test:bdd:smoke:report

# Run specific BDD feature file
npm run clean:reports && cypress run --spec "cypress/e2e/BDD/ecommerce.feature" && npm run generate:cucumber:report

# Run BDD tests with specific tag
npm run clean:reports && cypress run --spec "cypress/e2e/BDD/**/*.feature" --env tags=@regression && npm run generate:cucumber:report

# Open existing BDD report
npm run open:bdd:report
```

---

### Step 6: View BDD Report

**Report Location:**  
`cypress/reports/cucumber-html/index.html`

**Full Path:**  
`C:\Users\Saura\Desktop\CypressAutomation\cypress\reports\cucumber-html\index.html`

**Report Features:**

✅ **Feature Overview**
- All features listed
- Pass/Fail status per feature
- Total scenarios count
- Execution duration

✅ **Gherkin Syntax Display**
- Proper Given/When/Then/And steps
- Step-by-step execution status
- Green checkmarks for passed steps
- Red X for failed steps

✅ **Scenario Details**
- Each scenario with status
- Tags displayed (@smoke, @regression, etc.)
- Duration per scenario
- Background steps (if any)

✅ **Metadata Display**
- Browser information
- Platform details
- Execution date/time
- Project/Release information

✅ **Tag Filtering**
- Visual display of scenario tags
- Easy to identify test categories

✅ **Multi-Feature Support**
- Multiple feature files in single report
- Feature-by-feature navigation
- Collapsible/Expandable sections

---

## Complete Package.json Scripts

Here's the complete scripts section for your `package.json`:

```json
{
  "name": "cypressautomation",
  "version": "1.0.0",
  "description": "Cypress Automation Framework",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "cypress:open": "cypress open",
    
    "clean:reports": "if exist cypress\\reports rmdir /s /q cypress\\reports && mkdir cypress\\reports",
    "generate:report": "npx mochawesome-merge cypress/reports/.jsons/*.json -o cypress/reports/report.json && npx marge cypress/reports/report.json -f index -o cypress/reports/html",
    "generate:cucumber:report": "node cucumber-report.js",
    
    "cypress:run": "npm run clean:reports && cypress run && npm run generate:report",
    "cypress:report": "npm run clean:reports && cypress run && npm run generate:report && start cypress\\reports\\html\\index.html",
    
    "smokeTest": "npm run clean:reports && cypress run --spec 'cypress/e2e/practiceE2E.cy.ts' && npm run generate:report",
    "test:smoke": "npm run clean:reports && cypress run --env grep=@smoke && npm run generate:report",
    "test:smoke:report": "npm run clean:reports && cypress run --env grep=@smoke && npm run generate:report && start cypress\\reports\\html\\index.html",
    "test:smoke:headed": "cypress open --env grep=@smoke",
    
    "test:bdd:smoke": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' --env tags=@smoke && npm run generate:cucumber:report",
    "test:bdd:smoke:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' --env tags=@smoke && npm run generate:cucumber:report && start cypress\\reports\\cucumber-html\\index.html",
    "test:bdd:all": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' && npm run generate:cucumber:report",
    "test:bdd:all:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' && npm run generate:cucumber:report && start cypress\\reports\\cucumber-html\\index.html",
    
    "open:report": "start cypress\\reports\\html\\index.html",
    "open:bdd:report": "start cypress\\reports\\cucumber-html\\index.html"
  },
  "keywords": [],
  "author": "Saurav Kumar",
  "license": "ISC",
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^23.2.1",
    "@cypress/browserify-preprocessor": "^3.0.2",
    "@cypress/webpack-preprocessor": "^7.0.2",
    "@types/node": "^20.0.0",
    "cypress": "^15.6.0",
    "cypress-iframe": "^1.0.1",
    "cypress-mochawesome-reporter": "^4.0.2",
    "multiple-cucumber-html-reporter": "^3.7.0",
    "ts-loader": "^9.5.4",
    "typescript": "^5.0.0",
    "webpack": "^5.103.0"
  }
}
```

---

## Quick Reference Guide

### Command Cheat Sheet

| Test Type | Report Type | Command | Report Location |
|-----------|-------------|---------|-----------------|
| **TDD All** | Mochawesome | `npm run cypress:report` | `cypress/reports/html/index.html` |
| **TDD Smoke** | Mochawesome | `npm run test:smoke:report` | `cypress/reports/html/index.html` |
| **TDD Specific** | Mochawesome | `cypress run --spec "Test1.cy.ts"` | `cypress/reports/html/index.html` |
| **BDD All** | Cucumber HTML | `npm run test:bdd:all:report` | `cypress/reports/cucumber-html/index.html` |
| **BDD Smoke** | Cucumber HTML | `npm run test:bdd:smoke:report` | `cypress/reports/cucumber-html/index.html` |
| **BDD Specific** | Cucumber HTML | `cypress run --spec "ecommerce.feature"` | `cypress/reports/cucumber-html/index.html` |

---

### Tag Usage

#### TDD Tags (in test name):

```typescript
it('@smoke should validate API response', () => {
    // Test code
})

it('@regression @api should test full flow', () => {
    // Test code
})
```

**Run with tag:**
```bash
npm run test:smoke:report  # Runs tests with @smoke in name
```

---

#### BDD Tags (above scenario):

```gherkin
Feature: Ecommerce Application

@smoke
Scenario: Quick checkout
Given I am on Ecommerce Page
When I login to the application
Then order should be placed

@regression
Scenario: Full validation
Given I am on Ecommerce Page
When I login to the application
And I add items to cart
And Validate the total price
Then complete the order
```

**Run with tag:**
```bash
npm run test:bdd:smoke:report  # Runs scenarios with @smoke tag
```

---

## Workflow Examples

### TDD Workflow: Complete Process

**Step 1:** Write test with tags
```typescript
describe('E-commerce Tests', () => {
    it('@smoke should validate login', () => {
        cy.visit('/login')
        cy.get('#username').type('testuser')
        cy.get('#password').type('password')
        cy.get('#submit').click()
        cy.url().should('include', '/dashboard')
    })
    
    it('@regression should validate checkout', () => {
        // Full checkout flow
    })
})
```

**Step 2:** Run tests and generate report
```bash
npm run test:smoke:report
```

**Step 3:** Report opens automatically in browser
- Location: `cypress/reports/html/index.html`
- Shows: 1 passing test (smoke test)
- Features: Charts, duration, test details

**Step 4:** Share report
- Single HTML file can be emailed or uploaded
- No external dependencies needed

---

### BDD Workflow: Complete Process

**Step 1:** Write feature file
```gherkin
Feature: End to End Ecommerce Application

@smoke
Scenario: Ecommerce product delivery
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit
Then select the country , submit and verify Thank You
```

**Step 2:** Write step definitions
```typescript
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on Ecommerce Page', () => {
    cy.visit('/ecommerce')
})

When('I login to the application', () => {
    cy.loginToShop(username, password)
})

// ... other steps
```

**Step 3:** Run BDD tests and generate report
```bash
npm run test:bdd:smoke:report
```

**Step 4:** Report opens automatically in browser
- Location: `cypress/reports/cucumber-html/index.html`
- Shows: Feature with Gherkin steps
- Features: Tags, step status, duration, metadata

**Step 5:** Share report
- Standalone HTML file
- Proper Gherkin syntax visible
- Easy for non-technical stakeholders

---

## Troubleshooting

### Issue 1: Report Shows Blank

**Symptoms:**
- HTML file opens but shows no data
- Empty test results

**Solution:**
```bash
# Ensure tests ran successfully
npm run cypress:run

# Check if JSON files were generated
ls cypress/reports/.jsons/

# Manually generate report
npm run generate:report  # For TDD
npm run generate:cucumber:report  # For BDD
```

---

### Issue 2: Report Not Found

**Symptoms:**
- Error: "Cannot find file index.html"

**Solution:**
```bash
# Run full workflow (includes clean, test, report generation)
npm run cypress:report  # For TDD
npm run test:bdd:all:report  # For BDD

# Check directory exists
ls cypress/reports/html/  # TDD
ls cypress/reports/cucumber-html/  # BDD
```

---

### Issue 3: Old Results Showing

**Symptoms:**
- Previous test results visible
- Stale data in report

**Solution:**
```bash
# Always use scripts that include clean:reports
npm run cypress:report  # Already includes clean
npm run test:bdd:all:report  # Already includes clean

# Or manually clean
npm run clean:reports
```

---

### Issue 4: Screenshots Not Embedded

**Symptoms:**
- Failed tests but no screenshots in report

**Solution:**
Check `cypress.config.js`:
```javascript
e2e: {
    screenshotOnRunFailure: true,  // Must be true
    // ...
}
```

And in reporterOptions:
```javascript
reporterOptions: {
    embeddedScreenshots: true,  // Must be true
    // ...
}
```

---

### Issue 5: Cucumber JSON Not Generated

**Symptoms:**
- Cucumber report generation fails
- Error: "No JSON files found"

**Solution:**
Check `.cypress-cucumber-preprocessorrc.json`:
```json
{
  "json": {
    "enabled": true,  // Must be true
    "output": "cypress/reports/cucumber-json/cucumber-report.json"
  }
}
```

---

### Issue 6: Multiple Browser Reports

**Symptoms:**
- Need to run tests on multiple browsers and merge reports

**Solution:**
```bash
# Run on different browsers
npm run clean:reports
cypress run --browser chrome
cypress run --browser firefox
cypress run --browser edge

# Generate combined report
npm run generate:report  # TDD
npm run generate:cucumber:report  # BDD
```

---

## Report Comparison

### When to Use Each Report Type

| Criteria | Mochawesome (TDD) | Cucumber HTML (BDD) |
|----------|------------------|---------------------|
| **Test Format** | Cypress tests (.cy.ts) | Feature files (.feature) |
| **Audience** | Technical team | Business + Technical |
| **Display Format** | Test suites & cases | Features & Scenarios |
| **Syntax** | TypeScript code | Gherkin (Given/When/Then) |
| **Best For** | Unit, Integration, E2E tests | Acceptance tests, User stories |
| **Charts** | Yes (Pie, Bar) | No |
| **Screenshots** | Yes (embedded) | Limited |
| **Tags Display** | In test name | Prominent display |
| **Stakeholder Review** | Moderate | Excellent |

---

## Best Practices

### 1. Report Organization

```
cypress/
└── reports/
    ├── .jsons/          # Mochawesome JSON files (auto-generated)
    ├── html/            # TDD HTML reports
    │   └── index.html
    ├── cucumber-json/   # Cucumber JSON files (auto-generated)
    └── cucumber-html/   # BDD HTML reports
        └── index.html
```

---

### 2. Script Naming Conventions

- Use `:report` suffix for scripts that auto-open reports
- Use `test:` prefix for test execution scripts
- Use `generate:` prefix for report generation scripts
- Use `open:` prefix for opening existing reports
- Use `clean:` prefix for cleanup scripts

---

### 3. CI/CD Integration

For GitHub Actions or other CI/CD:

```yaml
- name: Run Tests and Generate Reports
  run: npm run cypress:run  # Don't auto-open

- name: Upload TDD Report
  uses: actions/upload-artifact@v3
  with:
    name: tdd-report
    path: cypress/reports/html/

- name: Upload BDD Report
  uses: actions/upload-artifact@v3
  with:
    name: bdd-report
    path: cypress/reports/cucumber-html/
```

---

### 4. .gitignore Configuration

Add to `.gitignore`:

```gitignore
# Cypress artifacts
cypress/videos/
cypress/screenshots/
cypress/reports/

# But keep report generator script
!cucumber-report.js
```

---

### 5. Report Retention

Consider implementing report archiving:

```bash
# Archive report with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
Copy-Item cypress/reports/html/index.html "reports-archive/report_$timestamp.html"
```

---

## Summary

### Setup Checklist

**TDD Reporting:**
- ✅ Install `cypress-mochawesome-reporter`
- ✅ Configure in `cypress.config.js`
- ✅ Register in `cypress/support/e2e.ts`
- ✅ Add scripts to `package.json`
- ✅ Run: `npm run cypress:report`

**BDD Reporting:**
- ✅ Install `multiple-cucumber-html-reporter`
- ✅ Configure `.cypress-cucumber-preprocessorrc.json`
- ✅ Create `cucumber-report.js`
- ✅ Add scripts to `package.json`
- ✅ Run: `npm run test:bdd:all:report`

---

### Key Takeaways

1. **Dual Reporting System**: Separate reports for TDD and BDD provide optimal viewing experience for each test type

2. **Single HTML Files**: Both reports generate standalone HTML files that can be easily shared

3. **Automated Workflow**: All scripts handle cleanup, test execution, report generation, and opening in one command

4. **Tag Support**: Both TDD (@smoke in test name) and BDD (@smoke above scenario) support tag-based filtering

5. **Report Isolation**: TDD and BDD reports are in separate directories, preventing conflicts

6. **Professional Output**: Mochawesome provides technical details, Cucumber HTML provides business-readable Gherkin

---

## Additional Resources

- **Mochawesome Documentation**: https://github.com/adamgruber/mochawesome
- **Multiple Cucumber HTML Reporter**: https://github.com/wswebcreation/multiple-cucumber-html-reporter
- **Cypress Documentation**: https://docs.cypress.io/
- **Cucumber Documentation**: https://cucumber.io/docs/cucumber/

---

## Contact & Support

**Project Repository**: https://github.com/sauravkmr780/CypressAutomationFramework  
**Author**: Saurav Kumar  
**Email**: [Your Email]  
**LinkedIn**: [Your LinkedIn]

---

**Document Version**: 1.0.0  
**Last Updated**: November 28, 2025  
**Status**: Production Ready ✅

---

*This document is part of the Cypress Automation Framework project. For the latest updates, please refer to the GitHub repository.*
