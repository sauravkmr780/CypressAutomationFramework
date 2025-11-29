# 📊 Allure Reporting Setup Guide

**Project:** Cypress Automation Framework  
**Report Type:** Allure Report (Unified TDD + BDD)  
**Date:** November 28, 2025  
**Version:** 1.0.0

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Why Allure Reports](#why-allure-reports)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running Tests with Allure](#running-tests-with-allure)
6. [Allure Report Features](#allure-report-features)
7. [NPM Scripts Reference](#npm-scripts-reference)
8. [Triple Reporting Strategy](#triple-reporting-strategy)
9. [Allure Annotations](#allure-annotations)
10. [Best Practices](#best-practices)
11. [Server Architecture](#server-architecture)
12. [Troubleshooting](#troubleshooting)

---

## Overview

Your framework now supports **triple reporting**:

| Reporter | Purpose | Test Type | Location |
|----------|---------|-----------|----------|
| **Mochawesome** | Technical TDD details | TDD only | `cypress/reports/html/` (static HTML) |
| **Cucumber HTML** | Business-readable BDD | BDD only | `cypress/reports/cucumber-html/` (static HTML) |
| **Allure** | Unified dashboard | TDD + BDD | Served at `http://127.0.0.1:<port>` |

**Allure Report** provides a unified view of all tests (TDD + BDD) with:
- Beautiful interactive dashboard
- Test history and trends
- Timeline visualization
- Categorized failures
- Attachments (screenshots, logs)
- Retry attempts tracking

**Important:** Allure requires a web server to function properly (unlike Mochawesome/Cucumber HTML which are static files).

---

## Why Allure Reports?

### 🎯 Key Benefits

1. **Unified View** - Single report for both TDD and BDD tests
2. **Historical Data** - Track test trends across multiple runs
3. **Timeline** - Visualize test execution timeline
4. **Categorization** - Automatic grouping of failures
5. **Attachments** - Screenshots, videos, logs embedded
6. **Retries** - Visual representation of retry attempts
7. **Suites** - Hierarchical test organization
8. **Tags** - Filter by @smoke, @regression, etc.
9. **Behaviors** - BDD feature/story tracking
10. **Beautiful UI** - Modern, interactive, professional

### 📊 When to Use Each Report

| Scenario | Use Report |
|----------|------------|
| Quick technical review (TDD) | **Mochawesome** |
| Business stakeholder review (BDD) | **Cucumber HTML** |
| Complete test analysis | **Allure** |
| Historical trends | **Allure** |
| Timeline analysis | **Allure** |
| Unified TDD + BDD view | **Allure** |

---

## Installation

### Already Installed ✅

During setup, these packages were installed:

```bash
npm install --save-dev @mmisty/cypress-allure-adapter allure-commandline
```

**Packages:**
- `@mmisty/cypress-allure-adapter@3.3.2` - Cypress Allure integration
- `allure-commandline@2.34.1` - Allure CLI for report generation

---

## Configuration

### 1. cypress.config.js

**Already configured** with Allure plugin:

```javascript
import { defineConfig } from "cypress";
import reporter from 'cypress-mochawesome-reporter/plugin.js';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";
import { configureAllureAdapterPlugins } from '@mmisty/cypress-allure-adapter/plugins';

export default defineConfig({
  projectId: "ts6nbs",
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
      allure: true,                    // Enable Allure
      allureResultsPath: 'allure-results'  // Results directory
    },
    async setupNodeEvents(on, config) {
      // Register Mochawesome Reporter (TDD)
      reporter(on);
      
      // Register Cucumber Preprocessor (BDD)
      await addCucumberPreprocessorPlugin(on, config);
      
      // Register Allure Reporter (TDD & BDD)
      configureAllureAdapterPlugins(on, config);
      
      // Webpack configuration
      on("file:preprocessor", webpack({
        // ... webpack config
      }));
      
      return config;
    },
    // ... rest of config
  },
});
```

### 2. cypress/support/e2e.ts

**Already configured** with Allure support import:

```typescript
// Import commands.ts using ES2015 syntax:
import './commands'

// Import cypress-mochawesome-reporter for test reporting
import 'cypress-mochawesome-reporter/register'

// Import Allure reporter
import '@mmisty/cypress-allure-adapter/support';

// Tag-based test filtering
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

### 3. .gitignore

**Already configured** to exclude Allure artifacts:

```gitignore
# Allure reports
allure-results/
allure-report/
.allure/
```

---

## Running Tests with Allure

### Quick Commands

```bash
# Run all tests with Allure report
npm run test:allure

# Run TDD smoke tests with Allure
npm run test:smoke:allure

# Run all BDD tests with Allure
npm run test:bdd:allure

# Run BDD smoke tests with Allure
npm run test:bdd:smoke:allure

# Generate all reports (Mochawesome + Cucumber + Allure)
npm run test:all:reports
```

### Step-by-Step Workflow

#### 1. Run TDD Tests with Allure

```bash
# Clean old results, run tests, generate report, auto-open
npm run test:allure
```

**What happens:**
1. Cleans `allure-results/` and `allure-report/` directories
2. Runs all Cypress tests (TDD + BDD)
3. Generates Allure results JSON files
4. Converts JSON to HTML report
5. Opens report in browser at `http://localhost:port`

#### 2. Run TDD Smoke Tests with Allure

```bash
# Run only @smoke tagged tests
npm run test:smoke:allure
```

#### 3. Run BDD Tests with Allure

```bash
# All BDD feature files
npm run test:bdd:allure

# Only BDD smoke scenarios
npm run test:bdd:smoke:allure
```

#### 4. Generate All Three Reports

```bash
# Generates Mochawesome + Cucumber HTML + Allure
npm run test:all:reports

# Then open each report:
npm run open:report              # Mochawesome
npm run open:bdd:report          # Cucumber HTML
npm run open:allure:report       # Allure
```

### Manual Commands

```bash
# Clean Allure artifacts
npm run clean:allure

# Generate Allure report from existing results
npm run generate:allure:report

# Open existing Allure report
npm run open:allure:report
```

---

## Allure Report Features

### 1. Overview Dashboard

**URL:** `http://localhost:port/index.html`

**Displays:**
- ✅ **Total Tests** - Number of tests executed
- ✅ **Success Rate** - Pass percentage
- ✅ **Execution Time** - Total duration
- ✅ **Status Breakdown** - Passed/Failed/Broken/Skipped
- ✅ **Trend Graph** - Historical test results (after multiple runs)
- ✅ **Environment Info** - Browser, OS, Cypress version

### 2. Suites View

**Shows:**
- Test files organized by suite
- Pass/fail status for each test
- Duration for each test
- Hierarchical test structure
- Expand/collapse functionality

**Example:**
```
📁 Test1.cy.ts
  ✅ @smoke My First Test Case (2.3s)
  ✅ My Second Test Case (1.8s)
  ✅ My Third Test Case (1.5s)
  
📁 Test2.cy.ts
  ✅ @smoke should handle iFrames (3.2s)
  ❌ should validate date picker (0.5s) - FAILED
```

### 3. Graphs View

**Visualizations:**
- **Status Chart** - Pie chart of test statuses
- **Severity Chart** - Distribution by severity (blocker, critical, normal, minor, trivial)
- **Duration Chart** - Tests sorted by execution time
- **Categories** - Failed tests grouped by failure reason
- **Timeline** - Gantt chart showing parallel execution

### 4. Timeline View

**Features:**
- Visual representation of test execution
- Shows parallel test runs (if configured)
- Duration bars for each test
- Color-coded by status
- Hover for details

### 5. Behaviors View

**For BDD Tests:**
- Groups by Feature → Scenario → Steps
- Epic/Feature/Story hierarchy
- Given/When/Then step breakdown
- Pass/fail status per step

**Example:**
```
📋 Feature: End to End Ecommerce Application
  📝 Scenario: Ecommerce product delivery
    ✅ Given I am on Ecommerce Page
    ✅ When I login to the application
    ✅ And I add items to cart and checkout
    ✅ And Validate the total price limit
    ✅ Then select the country, submit and verify Thank You
```

### 6. Packages View

**Shows:**
- Tests organized by package/folder structure
- Useful for large test suites
- Nested folder hierarchy

### 7. Categories View

**Automatic Categorization:**
- **Product Defects** - Assertion failures
- **Test Defects** - Test script errors
- **System Issues** - Timeouts, network errors
- **Custom Categories** - User-defined groups

### 8. Individual Test Details

**Click any test to see:**
- ✅ **Test Name & Description**
- ✅ **Execution Time**
- ✅ **Status** (Passed/Failed/Broken/Skipped)
- ✅ **Parameters** (if any)
- ✅ **Steps** - Each Cypress command logged
- ✅ **Attachments** - Screenshots, videos, logs
- ✅ **Stack Trace** - For failed tests
- ✅ **Retry Attempts** - If test was retried
- ✅ **Tags** - @smoke, @regression, etc.
- ✅ **Links** - Issue tracker, documentation links

### 9. Attachments

**Automatically Attached:**
- Screenshots (on failure)
- Videos (if enabled)
- Console logs
- Network requests (if configured)
- Custom attachments (via API)

**View:**
- Click on attachment icon
- View image inline
- Download video/logs

### 10. Historical Trends

**After Multiple Runs:**
- Trend graph shows pass/fail over time
- Flaky test detection
- Duration trends
- Execution time patterns

---

## NPM Scripts Reference

### Allure-Specific Scripts

```bash
# Clean Allure artifacts
npm run clean:allure
# Removes: allure-results/ and allure-report/

# Generate Allure HTML report
npm run generate:allure:report
# Input: allure-results/*.json
# Output: allure-report/index.html

# Open existing Allure report
npm run open:allure:report
# Starts local server and opens browser
```

### Test Execution with Allure

```bash
# All tests with Allure
npm run test:allure
# = clean:allure + cypress run + generate:allure:report + open

# TDD smoke tests with Allure
npm run test:smoke:allure
# = clean:allure + cypress run --env grep=@smoke + generate + open

# All BDD tests with Allure
npm run test:bdd:allure
# = clean:allure + cypress run BDD/**/*.feature + generate + open

# BDD smoke tests with Allure
npm run test:bdd:smoke:allure
# = clean:allure + cypress run BDD/**/*.feature --env tags=@smoke + generate + open
```

### Combined Reports

```bash
# Generate all three reports (no open)
npm run test:all:reports
# Generates: Mochawesome + Cucumber HTML + Allure
```

### Workflow Examples

#### Example 1: Quick Smoke Test

```bash
# Run smoke tests with all three reports
npm run clean:reports
npm run clean:allure
npx cypress run --env grep=@smoke
npm run generate:report              # Mochawesome
npm run generate:allure:report       # Allure
npm run open:report                  # Open Mochawesome
npm run open:allure:report           # Open Allure
```

#### Example 2: BDD Regression

```bash
# Run all BDD scenarios with Allure
npm run test:bdd:allure
```

#### Example 3: Full Test Suite

```bash
# Run everything and generate all reports
npm run test:all:reports

# Then open each report individually:
npm run open:report              # Mochawesome (TDD)
npm run open:bdd:report          # Cucumber (BDD)
npm run open:allure:report       # Allure (TDD + BDD)
```

---

## Triple Reporting Strategy

### When to Generate Which Report

| Scenario | Reports to Generate |
|----------|-------------------|
| **Quick TDD test run** | Mochawesome only |
| **Quick BDD test run** | Cucumber HTML only |
| **Complete analysis** | All three reports |
| **Historical tracking** | Allure required |
| **Stakeholder demo (BDD)** | Cucumber HTML + Allure |
| **CI/CD pipeline** | All three (archive separately) |

### Report Access Points

```bash
# TDD Report (Mochawesome)
Location: cypress/reports/html/index.html
Open: npm run open:report
Best for: Technical TDD test details

# BDD Report (Cucumber HTML)
Location: cypress/reports/cucumber-html/index.html
Open: npm run open:bdd:report
Best for: Business stakeholder BDD review

# Unified Report (Allure)
Location: allure-report/index.html (served via local server)
Open: npm run open:allure:report
Best for: Complete test suite analysis with history
```

---

## Allure Annotations

### Add Metadata to Tests

Enhance Allure reports with custom annotations:

#### 1. Description

```typescript
it('should validate login functionality', () => {
  cy.allure().description('Validates user login with valid credentials')
  // Test code
})
```

#### 2. Severity

```typescript
import { Severity } from '@mmisty/cypress-allure-adapter'

it('should process payment', () => {
  cy.allure().severity(Severity.CRITICAL)
  // Test code
})
```

**Severity Levels:**
- `Severity.BLOCKER` - Blocks entire test suite
- `Severity.CRITICAL` - Critical functionality
- `Severity.NORMAL` - Normal test (default)
- `Severity.MINOR` - Minor edge case
- `Severity.TRIVIAL` - Cosmetic issue

#### 3. Tags/Labels

```typescript
it('should add product to cart', () => {
  cy.allure().tag('smoke', 'regression', 'cart')
  cy.allure().label('feature', 'Shopping Cart')
  cy.allure().label('story', 'Add to Cart')
  // Test code
})
```

#### 4. Links

```typescript
it('should verify checkout flow', () => {
  cy.allure().issue('JIRA-123', 'https://jira.company.com/JIRA-123')
  cy.allure().tms('TC-456', 'https://testmanagement.com/TC-456')
  cy.allure().link('https://docs.company.com/checkout', 'Documentation')
  // Test code
})
```

#### 5. Steps

```typescript
it('should complete user registration', () => {
  cy.allure().step('Navigate to registration page', () => {
    cy.visit('/register')
  })
  
  cy.allure().step('Fill registration form', () => {
    cy.get('#username').type('newuser')
    cy.get('#email').type('user@example.com')
    cy.get('#password').type('SecurePass123')
  })
  
  cy.allure().step('Submit form', () => {
    cy.get('button[type="submit"]').click()
  })
  
  cy.allure().step('Verify success message', () => {
    cy.get('.success-message').should('be.visible')
  })
})
```

#### 6. Attachments

```typescript
it('should capture error details', () => {
  cy.get('button').click()
  
  // Attach screenshot manually
  cy.screenshot('custom-screenshot')
  cy.allure().attachment('Screenshot', 'cypress/screenshots/custom-screenshot.png', 'image/png')
  
  // Attach text data
  cy.allure().attachment('Test Data', JSON.stringify({ user: 'test', role: 'admin' }), 'application/json')
})
```

#### 7. BDD Annotations (Feature Files)

```gherkin
@severity:critical
@feature:Ecommerce
@story:Checkout
Feature: End to End Ecommerce Application

@smoke @issue:JIRA-123
Scenario: Ecommerce product delivery
  Given I am on Ecommerce Page
  When I login to the application
  And I add items to cart and checkout
  Then order should be placed
```

---

## Best Practices

### 1. Historical Tracking

**Keep Results for Trends:**
```bash
# Don't clean allure-results before every run
# Instead, accumulate results:

# Run 1
npx cypress run
npm run generate:allure:report

# Run 2 (appends to existing results)
npx cypress run
npm run generate:allure:report

# Now you'll see trends in Allure dashboard
```

**Clean When Needed:**
```bash
# Clean when starting fresh cycle
npm run clean:allure
```

### 2. CI/CD Integration

**In GitHub Actions:**
```yaml
- name: Run Cypress Tests
  run: npx cypress run

- name: Generate Allure Report
  if: always()
  run: npm run generate:allure:report

- name: Upload Allure Results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: allure-results
    path: allure-results/

- name: Upload Allure Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: allure-report
    path: allure-report/
```

### 3. Report Organization

**Folder Structure:**
```
project/
├── cypress/reports/
│   ├── html/                    # Mochawesome (TDD)
│   └── cucumber-html/           # Cucumber (BDD)
├── allure-results/              # Allure JSON results
└── allure-report/               # Allure HTML report
```

### 4. Severity Assignment

**Assign appropriate severity:**
- **BLOCKER** - Login, authentication, critical paths
- **CRITICAL** - Payment, checkout, data loss scenarios
- **NORMAL** - Standard feature validation (default)
- **MINOR** - Edge cases, UI polish
- **TRIVIAL** - Cosmetic issues

### 5. Tagging Strategy

**Use consistent tags:**
```typescript
// Good - Consistent tagging
cy.allure().tag('smoke', 'regression', 'auth')

// Bad - Inconsistent
cy.allure().tag('Smoke', 'reg', 'authentication')
```

---

## Troubleshooting

### Issue 1: Allure Report Not Generating

**Symptoms:**
- `allure-report/` folder empty
- Error: "No test results found"

**Solution:**
```bash
# Ensure tests ran successfully
npx cypress run

# Check if allure-results has files
ls allure-results/

# Manually generate report
npm run generate:allure:report

# Check for errors in console
```

### Issue 2: Allure Report Shows No Tests

**Symptoms:**
- Report opens but shows 0 tests

**Solution:**
```bash
# Verify Allure is enabled in cypress.config.js
env: {
  allure: true,  // Must be true
  allureResultsPath: 'allure-results'
}

# Verify support file import
# cypress/support/e2e.ts should have:
import '@mmisty/cypress-allure-adapter/support';
```

### Issue 3: Port Already in Use

**Symptoms:**
- Error: "Port 5000 is already in use"

**Solution:**
```bash
# Kill existing Allure server
# Windows PowerShell:
Get-Process -Name "java" | Where-Object {$_.Path -like "*allure*"} | Stop-Process

# Or use different port
npx allure open allure-report -p 5001
```

### Issue 4: Screenshots Not Attached

**Symptoms:**
- Tests fail but no screenshots in Allure

**Solution:**
```javascript
// Ensure screenshots enabled in cypress.config.js
e2e: {
  screenshotOnRunFailure: true  // Must be true
}
```

### Issue 5: Historical Data Not Showing

**Symptoms:**
- Trend graph empty after multiple runs

**Solution:**
```bash
# Don't use clean:allure before every run
# Accumulate results instead:

# Run 1
npx cypress run
npm run generate:allure:report

# Run 2 (don't clean)
npx cypress run
npm run generate:allure:report

# Clean only when starting new cycle
npm run clean:allure
```

### Issue 6: BDD Steps Not Showing

**Symptoms:**
- BDD tests show in Allure but steps missing

**Solution:**
- BDD step details automatically captured by Cucumber preprocessor
- Verify `.cypress-cucumber-preprocessorrc.json` has correct config
- Steps will show in "Behaviors" view of Allure report

---

## Advanced Features

### 1. Categories Configuration

Create `categories.json` in project root:

```json
[
  {
    "name": "Product Defects",
    "matchedStatuses": ["failed"],
    "messageRegex": ".*AssertionError.*"
  },
  {
    "name": "Test Defects",
    "matchedStatuses": ["broken"],
    "messageRegex": ".*TypeError.*"
  },
  {
    "name": "Timeout Issues",
    "matchedStatuses": ["broken"],
    "messageRegex": ".*Timed out.*"
  }
]
```

### 2. Environment Information

Create `environment.properties` in `allure-results/`:

```properties
Browser=Chrome
Browser.Version=120.0
OS=Windows 11
Cypress.Version=15.6.0
Node.Version=20.0.0
Environment=Staging
Base.URL=https://rahulshettyacademy.com
```

### 3. Executors Information

Create `executor.json` in `allure-results/`:

```json
{
  "name": "GitHub Actions",
  "type": "github",
  "url": "https://github.com/sauravkmr780/CypressAutomationFramework/actions",
  "buildOrder": 123,
  "buildName": "CI Build #123",
  "buildUrl": "https://github.com/sauravkmr780/CypressAutomationFramework/actions/runs/123",
  "reportUrl": "https://your-report-url.com",
  "reportName": "Allure Report"
}
```

---

## Server Architecture

### Why Allure Needs a Server

**Allure vs Static HTML Reports:**

| Feature | Mochawesome / Cucumber HTML | Allure |
|---------|---------------------------|--------|
| **File Structure** | Single self-contained HTML file | Multiple JSON files + HTML |
| **Data Loading** | All data embedded inline | AJAX/fetch loads JSON dynamically |
| **Protocol** | Works with `file://` | **Requires HTTP protocol** |
| **Opening** | Double-click HTML file | **Must use web server** |

**Technical Explanation:**

1. **Allure generates multiple files:**
   - `allure-report/index.html` - Main HTML
   - `allure-report/data/` - Test data JSON files
   - `allure-report/plugins/` - Dashboard widgets

2. **Dynamic data loading:**
   ```javascript
   // Allure uses AJAX to load data
   fetch('data/test-cases/*.json')
     .then(response => response.json())
     .then(data => renderDashboard(data))
   ```

3. **Browser security:**
   - AJAX doesn't work with `file://` protocol (CORS)
   - Opening `index.html` directly shows "Loading..." forever
   - **Solution:** Serve via HTTP server

### How the Server Works

**Command:** `npx allure open allure-report`

**What happens:**
1. Allure CLI starts a lightweight HTTP server (Jetty)
2. Server serves files from `allure-report/` directory
3. Random port assigned (e.g., `http://127.0.0.1:63677`)
4. Browser opens automatically
5. Dashboard loads JSON data successfully via HTTP

**Server lifecycle:**
- ✅ Starts: When you run `npx allure open`
- ✅ Stops: When you close terminal or press `Ctrl+C`
- ✅ Auto-restarts: If you regenerate report and run again

### Configuration in This Framework

**cypress.config.js:**
```javascript
await configureAllureAdapterPlugins(on, config, {
  enableInfo: false  // Disable server during TEST run
});
```

- **During test execution:** No server (results saved to JSON)
- **After tests:** `npx allure open` starts server for viewing

**NPM Scripts:**
```json
{
  "test:smoke:allure": "npm run clean:allure && cypress run --spec 'cypress/e2e/**/*.cy.ts' --env grep=@smoke && npm run generate:allure:report && npm run open:allure:report",
  "open:allure:report": "npx allure open allure-report"
}
```

### Alternative: Static HTML (Not Recommended)

If you try to open `allure-report/index.html` directly:
- ❌ Dashboard shows "Loading..."
- ❌ No test data appears
- ❌ Widgets don't work
- ❌ Timeline is empty

**Why?** Browser blocks AJAX requests with `file://` protocol due to CORS security.

---

## Summary

### Setup Checklist

✅ **Installed:**
- `@mmisty/cypress-allure-adapter@3.3.2`
- `allure-commandline@2.34.1`

✅ **Configured:**
- `cypress.config.js` - Allure plugin registered (Cucumber first, then Allure)
- `cypress/support/e2e.ts` - Allure support imported
- `.gitignore` - Allure artifacts excluded
- `package.json` - Allure scripts added

✅ **Available Commands:**
- `npm run test:allure` - All tests with Allure
- `npm run test:tdd:allure` - TDD only with Allure  
- `npm run test:smoke:allure` - TDD smoke with Allure
- `npm run test:bdd:allure` - BDD all with Allure
- `npm run test:bdd:smoke:allure` - BDD smoke with Allure
- `npm run test:all:reports` - Generate all three reports
- `npm run open:allure:report` - Open Allure report server

### Triple Reporting Active ✅

1. **Mochawesome** → TDD technical details (static HTML)
2. **Cucumber HTML** → BDD business view (static HTML) [Disabled - Allure used for BDD]
3. **Allure** → Unified TDD+BDD dashboard with history (served via HTTP)

### Server Information

- **Report URL:** `http://127.0.0.1:<random-port>`
- **Server:** Allure's built-in Jetty server
- **Lifecycle:** Starts with `npx allure open`, stops when terminal closes
- **Why needed:** Allure uses AJAX for dynamic data loading (requires HTTP)

---

**Allure Report Location:** `allure-report/` (must be served via HTTP)  
**Allure Results:** `allure-results/*.json`  
**Report Server:** Auto-starts at `http://127.0.0.1:<port>` when you run `npm run open:allure:report`

---

**Happy Testing with Allure! 🎯**

*Last Updated: November 28, 2025*
