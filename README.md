# 🚀 Cypress Automation Framework

[![Cypress Tests](https://github.com/sauravkmr780/CypressAutomationFramework/workflows/Cypress%20Tests/badge.svg)](https://github.com/sauravkmr780/CypressAutomationFramework/actions)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![BDD](https://img.shields.io/badge/BDD-Cucumber-green.svg)](https://cucumber.io/)
[![Allure](https://img.shields.io/badge/Allure-Report-yellow.svg)](http://allure.qatools.ru/)

> A production-ready end-to-end testing framework featuring **TDD + BDD** support, **triple reporting** (Mochawesome + Cucumber HTML + Allure), tag-based test execution, TypeScript, Page Object Model, custom commands, and comprehensive CI/CD integration.

---

## ⚡ Complete Setup Checklist

Before running tests locally and in CI/CD, complete these steps:

### Local Development Setup
- [ ] Clone repository: `git clone <repo-url>`
- [ ] Install dependencies: `npm install`
- [ ] Create `.env` file with database credentials (if using DB tests)
- [ ] Run tests locally: `npm run cypress:report`
- [ ] Verify all tests pass before pushing

### GitHub Repository Setup
- [ ] Create GitHub repository
- [ ] Push code to main branch
- [ ] Go to Settings → Secrets and variables → Actions
- [ ] Add 4 GitHub Secrets (if using database):
  - [ ] `DB_SERVER`
  - [ ] `DB_USER`
  - [ ] `DB_PASSWORD`
  - [ ] `DB_NAME`
- [ ] Go to Settings → Pages → Enable GitHub Pages (for Allure reports)
- [ ] Verify workflow runs successfully

### CI/CD Verification
- [ ] Push changes and check Actions tab
- [ ] Confirm workflow runs automatically
- [ ] Download and review test reports
- [ ] Check GitHub Pages for Allure reports
- [ ] Verify database tests pass (if applicable)

---

## 📋 Table of Contents

- [Setup Checklist](#-complete-setup-checklist)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Test Execution](#-test-execution)
- [Test Suites](#-test-suites)
- [Database Testing](#-database-testing-azure-sql-server)
- [Reporting](#-reporting)
- [Custom Commands](#-custom-commands)
- [Page Object Model](#-page-object-model)
- [CI/CD Integration](#-cicd-integration)
- [Configuration](#-configuration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Project Statistics](#-project-statistics)
- [Author](#-author)

---

## 🚀 Quick Start

---

## ✨ Features

### 🎯 Testing Capabilities
- ✅ **Dual Testing Approach** - Support for both TDD (.cy.ts) and BDD (.feature) test styles
- ✅ **TypeScript Support** - Full TypeScript integration for type safety and better IDE support
- ✅ **BDD with Cucumber** - Gherkin syntax with step definitions for behavior-driven development
- ✅ **Tag-Based Execution** - Run specific test subsets using @smoke, @regression, or custom tags
- ✅ **Page Object Model** - Centralized selectors in JSON files for better maintainability
- ✅ **Custom Commands** - Reusable custom commands (login, date picker selection)

### 📊 Reporting & Analytics
- ✅ **Triple Reporting System** - Enterprise-grade reporting for all needs
  - **Mochawesome Reports** - TDD tests with charts, metrics, and embedded screenshots
  - **Cucumber HTML Reports** - BDD tests with Gherkin syntax and step-by-step visualization
  - **Allure Reports** - Unified dashboard for TDD+BDD with historical trends and timeline
- ✅ **Auto-Generated Reports** - Reports generated and opened automatically after test runs
- ✅ **Historical Tracking** - Allure provides test history and trend analysis
- ✅ **Screenshot on Failure** - Automatic screenshot capture embedded in reports

### 🔧 Development & CI/CD
- ✅ **CI/CD Ready** - GitHub Actions workflow with manual test selection
- ✅ **Multi-Browser Support** - Chrome, Firefox, and Edge browser testing
- ✅ **Environment Configuration** - Centralized configuration with environment variables
- ✅ **Test Data Management** - Fixtures for test data separation
- ✅ **Webpack Preprocessor** - TypeScript and Feature file compilation
- ✅ **iframe Support** - cypress-iframe plugin integration

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/sauravkmr780/CypressAutomationFramework.git
cd CypressAutomationFramework

# 2. Install dependencies
npm install

# 3. Run tests with reports (choose one)
npm run test:smoke:report          # TDD smoke tests with Mochawesome report
npm run test:bdd:smoke:report      # BDD smoke tests with Cucumber HTML report
npm run test:smoke:allure          # TDD smoke tests with Allure report
npm run test:bdd:allure            # BDD tests with Allure report
npm run cypress:report             # All TDD tests with Mochawesome report
npm run test:bdd:all:report        # All BDD tests with Cucumber report
npm run test:allure                # All tests with Allure report
```

Reports will auto-generate and open in your default browser! 🎉

---

## 📁 Project Structure

```
CypressAutomationFramework/
├── .env                                        # Database credentials (NOT committed - in .gitignore)
├── .github/
│   └── workflows/
│       └── cypress.yml                          # GitHub Actions CI/CD workflow
├── cypress/
│   ├── e2e/
│   │   ├── TDD/
│   │   │   ├── Test1.cy.ts                     # TDD: E-commerce tests (6 tests, 2 @smoke)
│   │   │   ├── Test2.cy.ts                     # TDD: Practice tests (12 tests, 2 @smoke)
│   │   │   ├── practiceE2E.cy.ts               # TDD: End-to-end flow test
│   │   │   ├── GETApiValidation.cy.ts          # TDD: GET API tests
│   │   │   ├── POSTAPIValidation.cy.ts         # TDD: POST API tests
│   │   │   ├── loginAPI.cy.ts                  # TDD: API login and e-commerce flow
│   │   │   ├── EmployeesDBTest.cy.ts           # TDD: Azure SQL database tests
│   │   │   ├── DBConnectionTest.cy.ts          # TDD: Database connection validation
│   │   │   ├── AdvancedDBValidation.cy.ts      # TDD: Advanced database queries
│   │   │   └── DBValidation.cy.ts              # TDD: Example database tests
│   │   └── BDD/
│   │       ├── ecommerce.feature               # BDD: Feature file with Gherkin syntax
│   │       ├── ecommerceShop.feature           # BDD: Additional feature file
│   │       └── ecommerceStepDef.ts             # BDD: Step definitions
│   ├── fixtures/
│   │   └── example.json                        # Test data (credentials, products)
│   ├── reports/
│   │   ├── html/                               # Mochawesome reports (TDD)
│   │   │   └── index.html
│   │   ├── cucumber-html/                      # Cucumber reports (BDD)
│   │   │   └── index.html
│   │   ├── cucumber-json/                      # Cucumber JSON (auto-generated)
│   │   └── .jsons/                             # Mochawesome JSON (auto-generated)
│   ├── screenshots/                            # Auto-captured on failures
│   ├── support/
│   │   ├── commands.ts                         # Custom Cypress commands
│   │   ├── e2e.ts                              # Global config + tag filtering
│   │   ├── db/
│   │   │   ├── dbConfig.ts                     # Database connection config
│   │   │   └── dbHelper.ts                     # Database helper functions
│   │   └── pageObjects/
│   │       ├── products.json                   # Product page selectors
│   │       └── selectors.json                  # Practice page selectors
│   └── videos/                                 # Test execution videos
├── allure-results/                             # Allure test results (auto-generated)
├── allure-report/                              # Allure HTML report (auto-generated)
├── .cypress-cucumber-preprocessorrc.json       # Cucumber preprocessor config
├── cucumber-report.js                          # BDD report generator script
├── cypress.config.js                           # Cypress + reporters + database config
├── package.json                                # Dependencies and NPM scripts
├── tsconfig.json                               # TypeScript configuration
├── .gitignore                                  # Excludes node_modules, .env, reports
├── REPORTING_SETUP_GUIDE.md                    # Reporting configuration guide
├── DATABASE_SETUP_GUIDE.md                     # Azure SQL database integration guide
├── DB_QUICK_REFERENCE.md                       # Quick reference for database commands
├── AZURE_SQL_SETUP_SUMMARY.md                  # Database setup summary
├── GitHub_Actions_Setup_Guide.md               # Complete CI/CD workflow guide
├── ALLURE_SETUP_GUIDE.md                       # Allure reporter configuration guide
├── ALLURE_QUICK_START.md                       # Quick start for Allure commands
└── README.md                                   # This file
```

---

## 📥 Installation

### Prerequisites

- **Node.js** - Version 20.x or higher
- **npm** - Version 9.x or higher
- **Git** - For version control

### Setup Steps

1. **Clone the repository:**

```bash
git clone https://github.com/sauravkmr780/CypressAutomationFramework.git
cd CypressAutomationFramework
```

2. **Install dependencies:**

```bash
npm install
```

**Installed Packages:**
- `cypress@15.6.0` - E2E testing framework
- `typescript@5.0.0` - TypeScript compiler
- `@badeball/cypress-cucumber-preprocessor@23.2.1` - BDD support
- `cypress-mochawesome-reporter@4.0.2` - TDD HTML reports
- `multiple-cucumber-html-reporter@3.9.3` - BDD HTML reports
- `@mmisty/cypress-allure-adapter@3.3.2` - Allure reporter integration
- `allure-commandline@2.34.1` - Allure CLI for report generation
- `@cypress/webpack-preprocessor@7.0.2` - TypeScript & feature file compilation
- `ts-loader@9.5.4` - TypeScript loader for webpack
- `webpack@5.103.0` - Module bundler
- `cypress-iframe@1.0.1` - iframe support
- `@types/node@20.0.0` - Node.js type definitions
- `mssql@12.1.1` - Microsoft SQL Server client
- `cypress-sql-server@1.0.0` - Cypress SQL Server wrapper
- `dotenv@17.2.3` - Environment variables management
- `@types/mssql@9.1.8` - TypeScript types for MSSQL

---

## 🚀 Test Execution

### TDD Tests (Traditional Cypress)

**Run All TDD Tests:**
```bash
# Run all tests and auto-open Mochawesome report
npm run cypress:report

# Run all tests without opening report
npm run cypress:run
```

**Run TDD Smoke Tests:**
```bash
# Run tests tagged with @smoke and auto-open report
npm run test:smoke:report

# Run smoke tests without opening report
npm run test:smoke

# Open Cypress UI with smoke test filter
npm run test:smoke:headed
```

**Run Specific TDD Test File:**
```bash
npx cypress run --spec "cypress/e2e/TDD/Test1.cy.ts"
npx cypress run --spec "cypress/e2e/TDD/Test2.cy.ts"
npx cypress run --spec "cypress/e2e/TDD/practiceE2E.cy.ts"
```

---

### BDD Tests (Cucumber Gherkin)

**Run All BDD Tests:**
```bash
# Run all feature files and auto-open Cucumber HTML report
npm run test:bdd:all:report

# Run all BDD tests without opening report
npm run test:bdd:all
```

**Run BDD Smoke Tests:**
```bash
# Run scenarios tagged with @smoke and auto-open report
npm run test:bdd:smoke:report

# Run smoke scenarios without opening report
npm run test:bdd:smoke
```

**Run Specific Feature File:**
```bash
npx cypress run --spec "cypress/e2e/BDD/ecommerce.feature"
npx cypress run --spec "cypress/e2e/BDD/**/*.feature"
```

---

### Tag-Based Execution

#### TDD Tag Format (in test name):
```typescript
it('@smoke should validate login functionality', () => {
  // Test code
})

it('@regression @api should test full flow', () => {
  // Test code
})
```

**Run TDD tests by tag:**
```bash
npm run test:smoke:report           # Runs tests with @smoke in name
npx cypress run --env grep=@smoke   # Alternative syntax
```

#### BDD Tag Format (above scenario):
```gherkin
Feature: Ecommerce Application

@smoke
Scenario: Quick checkout
  Given I am on Ecommerce Page
  When I login to the application
  Then order should be placed

@regression
Scenario: Full validation flow
  Given I am on Ecommerce Page
  When I login to the application
  And I add items to cart
  Then complete the order
```

**Run BDD scenarios by tag:**
```bash
npm run test:bdd:smoke:report                           # Runs @smoke scenarios
npx cypress run --spec "cypress/e2e/BDD/**/*.feature" --env tags=@regression
```

---

### Interactive Mode (Cypress UI)

**Open Test Runner:**
```bash
npm run cypress:open

# With tag filter (TDD only)
npm run test:smoke:headed
```

---

### Multi-Browser Execution

```bash
# Chrome (default)
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge

# Electron (headless)
npx cypress run --browser electron
```

---

## 📊 Test Suites

### TDD Test Suites (Traditional Cypress)

#### TDD/Test1.cy.ts - E-commerce Test Suite
- **Total Tests:** 6 (2 tagged with @smoke)
- **Application:** https://rahulshettyacademy.com/seleniumPractise/

**Test Coverage:**
1. ✅ **@smoke** My First Test Case - API validation & basic flow
2. ✅ Product search functionality
3. ✅ Product filtering by name
4. ✅ Add to cart functionality
5. ✅ Brand logo and navigation verification
6. ✅ **@smoke** Complete checkout flow with assertions

#### TDD/Test2.cy.ts - Practice Test Suite
- **Total Tests:** 12 (2 tagged with @smoke)
- **Application:** https://rahulshettyacademy.com/AutomationPractice/

**Test Coverage:**
1. ✅ Checkbox operations
2. ✅ Static dropdown selection
3. ✅ Dynamic dropdown/autocomplete
4. ✅ Element visibility toggle
5. ✅ Radio button selection
6. ✅ Alert and confirm dialogs
7. ✅ Tab switching and window handling
8. ✅ Web table data extraction
9. ✅ Mouse hover interactions
10. ✅ Window.open handling
11. ✅ **@smoke** iframe interactions with custom command
12. ✅ **@smoke** React date picker selection

#### TDD/practiceE2E.cy.ts - End-to-End Flow
- **Total Tests:** 1
- **Application:** https://rahulshettyacademy.com/loginpagePractise/

**Complete User Journey:**
1. ✅ User login with role selection (Teacher/Student)
2. ✅ Product browsing and filtering
3. ✅ Add multiple products to cart
4. ✅ Cart price validation and calculation
5. ✅ Checkout process
6. ✅ Country selection from dropdown
7. ✅ Terms acceptance
8. ✅ Order confirmation and success message

---

### BDD Test Suites (Cucumber Gherkin)

#### ecommerce.feature - E-commerce BDD Flow
- **Total Scenarios:** 2 (1 @smoke, 1 @regression)
- **Application:** https://rahulshettyacademy.com/loginpagePractise/

**Scenarios:**

**@smoke Scenario: Ecommerce product delivery**
```gherkin
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit
Then select the country, submit and verify Thank You
```

**@regression Scenario: Verify cart total calculation**
```gherkin
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit
```

**Step Definitions:** `cypress/e2e/BDD/ecommerceStepDef.ts`
- 5 step definitions (1 Given, 3 When, 1 Then)
- Uses custom commands (`cy.loginToShop`)
- Page Object Model integration
- Fixture data management

---

### Test Summary

| Test Type | Test Files | Total Tests/Scenarios | Smoke Tests | Applications |
|-----------|------------|----------------------|-------------|--------------|
| **TDD** | 3 files | 19 tests | 4 @smoke | 3 apps |
| **BDD** | 2 features | 2 scenarios | 1 @smoke | 1 app |
| **Total** | 5 files | 21 tests | 5 smoke | 3 apps |

---

## 📊 Reporting

### Mochawesome Reports (TDD)

**Purpose:** Optimized for traditional Cypress test reporting with technical details

**Location:** `cypress/reports/html/index.html`

**Features:**
- ✅ **Dashboard Summary** - Total tests, pass/fail/skipped counts, pass rate percentage
- ✅ **Visual Charts** - Pie chart for test distribution, bar chart for duration
- ✅ **Test Details** - Each test with status indicator, error messages, stack traces
- ✅ **Embedded Screenshots** - Screenshots for failed tests captured at failure point
- ✅ **Expandable Suites** - Collapsible test suites with nested organization
- ✅ **Single HTML File** - All assets embedded, easy to share via email/storage
- ✅ **Execution Metrics** - Duration, retries, browser info

**Generate & View:**
```bash
# Auto-generate and open report after tests
npm run cypress:report          # All TDD tests
npm run test:smoke:report       # Smoke tests only

# Open existing report
npm run open:report

# Manual generation (if needed)
npm run generate:report
```

**Report Workflow:**
1. Tests run → JSON files generated to `cypress/reports/.jsons/`
2. NPM script merges JSONs → `cypress/reports/report.json`
3. Marge converts JSON → HTML at `cypress/reports/html/index.html`
4. Report auto-opens in default browser

---

### Cucumber HTML Reports (BDD)

**Purpose:** Optimized for BDD feature reporting with Gherkin syntax visualization

**Location:** `cypress/reports/cucumber-html/index.html`

**Features:**
- ✅ **Feature Overview** - All features listed with pass/fail status
- ✅ **Gherkin Syntax Display** - Proper Given/When/Then/And steps
- ✅ **Step-by-Step Status** - Green checkmarks for passed steps, red X for failures
- ✅ **Tag Display** - Visual display of @smoke, @regression, and custom tags
- ✅ **Scenario Details** - Duration per scenario, background steps
- ✅ **Metadata** - Browser, platform, execution date, project info
- ✅ **Multi-Feature Support** - Multiple feature files in single report
- ✅ **Business Readable** - Perfect for non-technical stakeholders

**Generate & View:**
```bash
# Auto-generate and open report after tests
npm run test:bdd:all:report      # All BDD scenarios
npm run test:bdd:smoke:report    # Smoke scenarios only

# Open existing report
npm run open:bdd:report

# Manual generation (if needed)
npm run generate:cucumber:report
```

**Report Workflow:**
1. Feature files run → Cucumber JSON generated to `cypress/reports/cucumber-json/`
2. Node script (`cucumber-report.js`) processes JSON
3. Multiple-cucumber-html-reporter generates HTML at `cypress/reports/cucumber-html/`
4. Report auto-opens in default browser

---

### Report Comparison

| Feature | Mochawesome (TDD) | Cucumber HTML (BDD) | Allure (Unified) |
|---------|------------------|---------------------|------------------|
| **Best For** | Technical test details | Business-readable features | Complete analysis + history |
| **Test Format** | .cy.ts files | .feature files | Both TDD + BDD |
| **Syntax Display** | TypeScript code | Gherkin (Given/When/Then) | Both + step details |
| **Charts** | ✅ Pie & Bar charts | ❌ No charts | ✅ Multiple chart types |
| **Screenshots** | ✅ Embedded | ⚠️ Limited | ✅ Fully embedded |
| **Tags** | In test name | ✅ Prominent display | ✅ Filterable tags |
| **Historical Data** | ❌ No history | ❌ No history | ✅ Trend graphs |
| **Timeline** | ❌ No timeline | ❌ No timeline | ✅ Gantt chart |
| **Categorization** | ❌ No categories | ❌ No categories | ✅ Auto-categorized |
| **Retries** | ⚠️ Basic | ❌ Not shown | ✅ Visual tracking |
| **Audience** | Developers/QA | Business + Technical | All stakeholders |
| **File Type** | Single HTML | Single HTML | Multiple files + server |
| **Location** | `html/index.html` | `cucumber-html/index.html` | Served at `http://127.0.0.1:<port>` |

**Recommendation:**
- **Daily Dev Testing:** Mochawesome (TDD) or Cucumber HTML (BDD)
- **Complete Analysis:** Allure for unified view
- **Historical Tracking:** Allure (accumulate results across runs)
- **Stakeholder Demos:** Cucumber HTML (BDD) + Allure dashboard

---

### Screenshots and Videos

- **Screenshots:** Auto-captured on failures → `cypress/screenshots/`
- **Videos:** Test execution recordings (disabled by default) → `cypress/videos/`
- **Embedded:** Screenshots automatically embedded in Mochawesome reports

---

### Report Scripts Reference

```bash
# TDD Reports
npm run generate:report           # Generate Mochawesome HTML
npm run open:report              # Open TDD report

# BDD Reports  
npm run generate:cucumber:report # Generate Cucumber HTML
npm run open:bdd:report         # Open BDD report

# Clean Reports
npm run clean:reports           # Remove all old reports
```

---

### Allure Reports (Unified TDD+BDD)

**Purpose:** Enterprise-grade unified reporting with historical tracking and advanced analytics

**⚠️ Note:** Allure reports require a web server to function (served at `http://127.0.0.1:<port>`). This is different from Mochawesome/Cucumber HTML which are static HTML files. The server is started automatically by `npx allure open` command.

**Location:** `allure-report/index.html` (served via Allure's built-in server)

**Features:**
- ✅ **Unified Dashboard** - Single view for all TDD + BDD tests
- ✅ **Historical Trends** - Track test results across multiple runs with trend graphs
- ✅ **Timeline View** - Visual Gantt chart of test execution timeline
- ✅ **Categorized Failures** - Automatic grouping by failure type (product defects, test defects, system issues)
- ✅ **Behaviors View** - BDD feature/scenario/step hierarchy with Gherkin syntax
- ✅ **Suites View** - Tests organized by file with pass/fail status
- ✅ **Graphs** - Status chart, severity chart, duration chart
- ✅ **Attachments** - Screenshots, videos, logs automatically embedded
- ✅ **Retry Tracking** - Visual representation of retry attempts
- ✅ **Tags/Labels** - Filter by @smoke, @regression, custom tags
- ✅ **Severity Levels** - Blocker, critical, normal, minor, trivial
- ✅ **Test Details** - Step-by-step execution with screenshots and stack traces
- ✅ **Environment Info** - Browser, platform, Cypress version metadata
- ✅ **Beautiful UI** - Modern, interactive, professional dashboard

**Generate & View:**
```bash
# Auto-generate and open report after tests
npm run test:allure              # All tests
npm run test:smoke:allure        # TDD smoke tests
npm run test:bdd:allure          # All BDD tests
npm run test:bdd:smoke:allure    # BDD smoke tests

# Open existing report
npm run open:allure:report

# Manual generation (if needed)
npm run generate:allure:report
```

**Report Workflow:**
1. Tests run → Allure results generated to `allure-results/`
2. NPM script converts results → HTML at `allure-report/`
3. Allure's built-in server starts and report auto-opens in browser at `http://127.0.0.1:<port>`
4. View dashboard, suites, graphs, timeline, behaviors

**Why Allure needs a server:**
- Allure uses AJAX to load JSON data dynamically
- Unlike Mochawesome (single HTML), Allure has multiple data files
- The `npx allure open` command starts a lightweight server automatically
- Server runs only while viewing reports, stops when terminal is closed

**Historical Tracking:**
```bash
# Run 1 - Initial baseline
npx cypress run
npm run generate:allure:report

# Run 2 - Accumulate results (don't clean)
npx cypress run
npm run generate:allure:report

# Now trend graph shows historical data!
```

**Advanced Annotations:**
```typescript
// Add metadata to tests
it('should validate checkout', () => {
  cy.allure().description('Complete checkout flow validation')
  cy.allure().severity('critical')
  cy.allure().tag('smoke', 'regression', 'checkout')
  cy.allure().issue('JIRA-123', 'https://jira.company.com/JIRA-123')
  
  // Test code with steps
  cy.allure().step('Add product to cart', () => {
    cy.get('.add-to-cart').click()
  })
})
```

---

### Complete Documentation

For detailed reporting setup, configuration, and troubleshooting, see:
- 📄 **[REPORTING_SETUP_GUIDE.md](./REPORTING_SETUP_GUIDE.md)** - Mochawesome & Cucumber HTML setup
- 📄 **[ALLURE_SETUP_GUIDE.md](./ALLURE_SETUP_GUIDE.md)** - Complete Allure configuration and features
- 📄 **[ALLURE_QUICK_START.md](./ALLURE_QUICK_START.md)** - Quick reference for Allure commands

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

**File:** `.github/workflows/cypress.yml`

**Automated Triggers:**
- ✅ Push to main branch
- ✅ Pull requests
- ✅ Manual workflow dispatch

**Workflow Features:**
- ✅ **Multi-Test Support** - Run TDD, BDD, or specific test files
- ✅ **Tag-Based Execution** - Run smoke tests or full regression suite
- ✅ **Multi-Browser Testing** - Chrome, Firefox, Edge support
- ✅ **Dual Report Generation** - Both Mochawesome and Allure reports
- ✅ **GitHub Pages Deployment** - Allure reports published automatically
- ✅ **Artifact Upload** - Reports, screenshots, videos (30-day retention)
- ✅ **Historical Tracking** - Last 20 Allure reports with trends
- ✅ **PR Comments** - Automatic report links on pull requests
- ✅ **Environment Variables** - Configurable base URLs and credentials

**Manual Workflow Dispatch:**

1. Navigate to [Actions Tab](https://github.com/sauravkmr780/CypressAutomationFramework/actions)
2. Select "Cypress Tests" workflow
3. Click "Run workflow" dropdown
4. Configure options:
   - **Test Type:** All / TDD Smoke / BDD Smoke / Specific Suite
   - **Browser:** Chrome / Firefox / Edge / Electron
   - **Environment:** Staging / Production
5. Click "Run workflow" button

**Workflow Jobs:**
```yaml
jobs:
  cypress-run:
    - Install dependencies
    - Run Cypress tests (TDD or BDD)
    - Generate Mochawesome report
    - Generate Allure report with history (last 20 runs)
    - Deploy Allure to GitHub Pages (gh-pages branch)
    - Deploy Mochawesome to GitHub Pages (gh-pages-mochawesome branch)
    - Upload artifacts (reports, screenshots, videos)
    - Post report links as PR comment (optional)
```

**View Reports After Workflow:**

**Allure Report (Live):**
```
https://sauravkmr780.github.io/CypressAutomationFramework/
```
- Interactive dashboard with historical trends
- Last 20 test runs with graphs
- No download needed - view directly in browser

**Mochawesome Report (Artifacts):**
- Download from workflow artifacts
- Available for 30 days

**Setup GitHub Pages (One-Time):**
1. Go to: Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` → `/` (root)
4. Save

After enabling, every workflow run automatically updates the Allure report at the URL above.

**Example Workflow Commands:**
```yaml
# TDD tests with Allure
npm run cypress:run

# Specific test file
npx cypress run --spec "cypress/e2e/Test1.cy.ts"

# Generate Mochawesome report
npm run generate:report

# Generate Allure report with history
# (handled by simple-elf/allure-report-action in CI)
```

**GitHub Pages URLs:**
- **Allure Report:** `https://sauravkmr780.github.io/CypressAutomationFramework/`
- **Mochawesome Report:** Available as downloadable artifact (30-day retention)

---

## ⚙️ Configuration

### Database Credentials & GitHub Secrets

**For Local Testing (`.env` file):**
```env
DB_SERVER=your-server.database.windows.net
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

**For CI/CD (GitHub Actions):**
Since `.env` is in `.gitignore`, GitHub Actions won't have access to these credentials. You must add them as GitHub Secrets:

1. Go to: **Repository → Settings → Secrets and variables → Actions**
2. Click **"New repository secret"** and add:
   - `DB_SERVER` - Your Azure SQL Server name
   - `DB_USER` - Your database username
   - `DB_PASSWORD` - Your database password
   - `DB_NAME` - Your database name

3. The workflow automatically uses these secrets via environment variables:
```yaml
env:
  DB_SERVER: ${{ secrets.DB_SERVER }}
  DB_USER: ${{ secrets.DB_USER }}
  DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
  DB_NAME: ${{ secrets.DB_NAME }}
```

**Note:** Never commit `.env` file to GitHub - it's already in `.gitignore` for security.

---

### Cypress Configuration (`cypress.config.js`)

```javascript
import { defineConfig } from "cypress";
import reporter from 'cypress-mochawesome-reporter/plugin.js';
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import webpack from "@cypress/webpack-preprocessor";

export default defineConfig({
  projectId: "ts6nbs",
  
  // Mochawesome Reporter (TDD)
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  
  e2e: {
    env: {
      url: "https://rahulshettyacademy.com"
    },
    async setupNodeEvents(on, config) {
      // Register Cucumber Preprocessor (BDD) - MUST BE FIRST
      await addCucumberPreprocessorPlugin(on, config);
      
      // Register Mochawesome Reporter (TDD)
      reporter(on);
      
      // Register Allure Reporter (TDD & BDD) - MUST BE AFTER CUCUMBER
      await configureAllureAdapterPlugins(on, config, {
        enableInfo: false // Disable Allure server during test run (opens after)
      });
      
      // Webpack for TypeScript and Feature files
      on("file:preprocessor", webpack({
        webpackOptions: {
          resolve: { extensions: [".ts", ".js"] },
          module: {
            rules: [
              {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: [{ loader: "ts-loader" }]
              },
              {
                test: /\.feature$/,
                use: [{
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config
                }]
              }
            ]
          }
        }
      }));
      
      return config;
    },
    retries: {
      runMode: 1,      // Retry once in CI
      openMode: 0      // No retry in dev
    },
    specPattern: [
      "cypress/e2e/**/*.cy.ts",      // TDD tests
      "cypress/e2e/**/*.feature"     // BDD tests
    ],
    screenshotOnRunFailure: true,
    video: false
  }
});
```

### Cucumber Preprocessor Configuration

**File:** `.cypress-cucumber-preprocessorrc.json`

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

**Key Settings:**
- `stepDefinitions` - Location of step definition files
- `json.enabled` - Generate JSON for report creation
- `filterSpecs` - Enable tag-based filtering
- `omitFiltered` - Skip scenarios not matching tags

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "types": ["cypress", "node"],
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "strict": true
  },
  "include": ["cypress/**/*.ts"]
}
```

### Environment Variables & Tags

**Set Base URL:**
```javascript
// cypress.config.js
env: {
  url: "https://rahulshettyacademy.com"
}

// Access in tests
cy.visit(Cypress.env('url') + '/seleniumPractise/')
```

**Azure SQL Database Configuration:**

Create a `.env` file in the project root (automatically gitignored):

```env
DB_SERVER=sauravdbdemo.database.windows.net
DB_USER=skdblogin
DB_PASSWORD=@1Infosys
DB_NAME=PracticeDBSetup
```

**Database Tasks Available:**

```typescript
// Query database (SELECT)
cy.task('dbQuery', 'SELECT * FROM Employees').then((rows) => {
  cy.log(JSON.stringify(rows))
})

// Insert data
cy.task('dbInsert', {
  table: 'Employees',
  data: {
    FullName: 'Test User',
    Department: 'QA',
    Salary: 75000
  }
})

// Update data
cy.task('dbUpdate', {
  table: 'Employees',
  data: { Salary: 80000 },
  where: "FullName = 'Test User'"
})

// Delete data
cy.task('dbDelete', {
  table: 'Employees',
  where: "FullName = 'Test User'"
})
```

**Command Line:**
```bash
# Override base URL
npx cypress run --env url=https://staging.example.com

# Set multiple env variables
npx cypress run --env url=https://test.com,apiKey=abc123

# Tag-based execution
npx cypress run --env grep=@smoke          # TDD tags
npx cypress run --env tags=@smoke          # BDD tags
```

### NPM Scripts

**Complete script list:**
```json
{
  "cypress:open": "cypress open",
  
  "clean:reports": "if exist cypress\\reports rmdir /s /q cypress\\reports && mkdir cypress\\reports",
  
  "generate:report": "npx mochawesome-merge cypress/reports/.jsons/*.json -o cypress/reports/report.json && npx marge cypress/reports/report.json -f index -o cypress/reports/html",
  "generate:cucumber:report": "node cucumber-report.js",
  
  "cypress:run": "npm run clean:reports && cypress run && npm run generate:report",
  "cypress:report": "npm run clean:reports && cypress run && npm run generate:report && start cypress\\reports\\html\\index.html",
  
  "test:smoke": "npm run clean:reports && cypress run --env grep=@smoke && npm run generate:report",
  "test:smoke:report": "npm run clean:reports && cypress run --env grep=@smoke && npm run generate:report && start cypress\\reports\\html\\index.html",
  "test:smoke:headed": "cypress open --env grep=@smoke",
  
  "test:bdd:all": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' && npm run generate:cucumber:report",
  "test:bdd:all:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' && npm run generate:cucumber:report && start cypress\\reports\\cucumber-html\\index.html",
  "test:bdd:smoke": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' --env tags=@smoke && npm run generate:cucumber:report",
  "test:bdd:smoke:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/BDD/**/*.feature' --env tags=@smoke && npm run generate:cucumber:report && start cypress\\reports\\cucumber-html\\index.html",
  
  "test:db": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/EmployeesDBTest.cy.ts' && npm run generate:report",
  "test:db:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/EmployeesDBTest.cy.ts' && npm run generate:report && start cypress\\reports\\html\\index.html",
  "test:db:allure": "npm run clean:allure && cypress run --spec 'cypress/e2e/TDD/EmployeesDBTest.cy.ts' && npm run generate:allure:report && npm run open:allure:report",
  "test:db:advanced": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/AdvancedDBValidation.cy.ts' && npm run generate:report && start cypress\\reports\\html\\index.html",
  "test:db:all": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/EmployeesDBTest.cy.ts,cypress/e2e/TDD/AdvancedDBValidation.cy.ts,cypress/e2e/TDD/DBConnectionTest.cy.ts' && npm run generate:report && start cypress\\reports\\html\\index.html",
  
  "open:report": "start cypress\\reports\\html\\index.html",
  "open:bdd:report": "start cypress\\reports\\cucumber-html\\index.html"
}
```

---

## 🗄️ Database Testing (Azure SQL Server)

### Database Integration

This framework includes built-in Azure SQL Server integration for database validation tests.

**Quick Start:**
```bash
# Run database tests with report
npm run test:db:report

# Run database tests with Allure
npm run test:db:allure

# Run specific database test file
npx cypress run --spec "cypress/e2e/TDD/EmployeesDBTest.cy.ts"
```

### Available Database Commands

| Command | Purpose | Example |
|---------|---------|---------|
| `cy.dbQuery(sql)` | Execute SELECT queries | `cy.dbQuery('SELECT * FROM Employees')` |
| `cy.dbInsert(table, data)` | Insert records | `cy.dbInsert('Employees', {FullName: 'John', Dept: 'QA'})` |
| `cy.dbUpdate(table, data, where)` | Update records | `cy.dbUpdate('Employees', {Salary: 85000}, "Id = 1")` |
| `cy.dbDelete(table, where)` | Delete records | `cy.dbDelete('Employees', "Id = 5")` |
| `cy.dbExecuteProc(name, params)` | Execute stored procedures | `cy.dbExecuteProc('sp_GetUsers', ['Admin'])` |

### Database Configuration

**Local Setup:**
1. Update `.env` with your Azure SQL Server credentials:
```env
DB_SERVER=your-server.database.windows.net
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
```

2. Run tests locally: `npm run test:db:report`

**GitHub Actions Setup:**
1. Add 4 GitHub Secrets (DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME)
2. Tests run automatically on push or manual trigger
3. Database validation happens in CI/CD pipeline

### Example Database Test

```typescript
describe('Employee Database Tests', () => {
  it('should retrieve and validate employee data', () => {
    cy.dbQuery('SELECT * FROM Employees WHERE FullName = "Saurav Kumar"')
      .then((results) => {
        expect(results).to.have.length(1);
        expect(results[0].Department).to.equal('QA Automation');
        expect(results[0].Salary).to.equal(82000);
      });
  });
  
  it('should insert and verify new employee', () => {
    cy.dbInsert('Employees', {
      FullName: 'Test User',
      Department: 'Testing',
      Salary: 75000
    });
    
    cy.dbQuery('SELECT * FROM Employees WHERE FullName = "Test User"')
      .then((results) => {
        expect(results[0].Salary).to.equal(75000);
        
        // Cleanup
        cy.dbDelete('Employees', "FullName = 'Test User'");
      });
  });
});
```

### Real-World Use Case

```typescript
describe('UI vs Database Validation', () => {
  it('should verify UI displays correct data from database', () => {
    // Get employee from database
    cy.dbQuery('SELECT * FROM Employees WHERE Id = 1')
      .then((dbEmployee) => {
        const employee = dbEmployee[0];
        
        // Navigate to employee profile
        cy.visit('https://yourapp.com/employee/1');
        
        // Verify UI matches database
        cy.get('.employee-name').should('contain', employee.FullName);
        cy.get('.employee-salary').should('contain', employee.Salary);
        cy.get('.employee-dept').should('contain', employee.Department);
      });
  });
});
```

### Test Suites Included

- **EmployeesDBTest.cy.ts** - Basic CRUD operations (Insert, Read, Update, Delete)
- **DBConnectionTest.cy.ts** - Connection validation and simple queries
- **AdvancedDBValidation.cy.ts** - Complex queries, joins, aggregations
- **DBValidation.cy.ts** - Example template for custom database tests

For complete database documentation, see: **[DATABASE_SETUP_GUIDE.md](./DATABASE_SETUP_GUIDE.md)**

---

### Available Custom Commands

#### 1. `cy.loginToShop()`

Login to e-commerce application with role selection.

**Usage:**

```typescript
cy.loginToShop(username, password, role, roleValue)
```

**Example:**

```typescript
cy.loginToShop('rahulshettyacademy', 'learning', 'Teacher', 'teach')
```

#### 2. `cy.loginAPI()`

API-based login that returns JWT token for authentication.

**Usage:**

```typescript
cy.loginAPI().then(() => {
  cy.visit('/client', {
    onBeforeLoad: (window) => {
      window.localStorage.setItem('token', Cypress.env('token'))
    }
  })
})
```

**Example:**

```typescript
cy.loginAPI() // Token stored in Cypress.env('token')
```

#### 3. `cy.selectDate()`

Select date from React date picker component.

**Usage:**

```typescript
cy.selectDate(day, month, year)
```

**Example:**

```typescript
cy.selectDate(12, 'November', 2026)
```

**Features:**
- Automatic year navigation
- Month selection
- Day filtering (excludes neighboring months)
- Validation of selected date

### Creating Custom Commands

Add new commands in `cypress/support/commands.ts`:

```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      yourCommand(param: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('yourCommand', (param: string) => {
  // Your command logic
})
```

---

## 📦 Page Object Model

### Selector Management

All selectors are centralized in JSON files for easy maintenance.

#### `products.json` - E-commerce Selectors

```json
{
  "username": "#username",
  "password": "#password",
  "roleDropdown": "select",
  "productCard": "[class*='card']",
  "productName": ".card-title a",
  "cartCheckoutButton": "button[class='btn btn-success']",
  "countryInput": "#country"
}
```

**Usage in Tests:**

```typescript
import products from '../support/pageObjects/products.json'

cy.get(products.username).type('user@example.com')
cy.get(products.productCard).should('be.visible')
```

#### `selectors.json` - Practice Page Selectors

```json
{
  "checkBoxOption1": "#checkBoxOption1",
  "staticDropdown": "select#dropdown-class-example",
  "autocomplete": "#autocomplete",
  "radioButtons": "input[type=\"radio\"]",
  "alertBtn": "#alertbtn",
  "coursesIframe": "#courses-iframe"
}
```

### Benefits of Page Object Model

✅ **Maintainability** - Change selector in one place  
✅ **Reusability** - Use same selectors across tests  
✅ **Readability** - Meaningful names instead of CSS selectors  
✅ **Type Safety** - TypeScript autocomplete for JSON imports  

---

## 💡 Best Practices

### 1. Test Organization

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Common setup
    cy.visit('/')
  })

  it('should perform specific action', () => {
    // Test logic
  })
})
```

### 2. Assertions

```typescript
// Use descriptive assertions
cy.get('.product').should('have.length', 4)
cy.url().should('include', '/checkout')
cy.get('.success-message').should('be.visible')
```

### 3. Waiting

```typescript
// Implicit waits (preferred)
cy.get('.element', { timeout: 10000 })

// Explicit waits for specific conditions
cy.get('.loading').should('not.exist')
```

### 4. Data Management

```typescript
// Use fixtures for test data
cy.fixture('example.json').then((data) => {
  cy.get(products.username).type(data.username)
})

// Or import directly
import testdata from '../fixtures/example.json'
cy.get(products.username).type(testdata.username)
```

### 5. Clean Tests

```typescript
// ✅ Good - Independent test
it('should add product to cart', () => {
  cy.visit('/products')
  cy.get('.add-to-cart').first().click()
  cy.get('.cart-count').should('have.text', '1')
})

// ❌ Bad - Depends on previous test
it('should checkout', () => {
  // Assumes cart already has items
  cy.get('.checkout-btn').click()
})
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Tests fail in CI but pass locally

**Solution:** Check timeouts and viewport settings

```javascript
// cypress.config.js
{
  e2e: {
    defaultCommandTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080
  }
}
```

#### 2. Element not found

**Solution:** Add explicit waits or increase timeout

```typescript
cy.get('.dynamic-element', { timeout: 15000 })
  .should('be.visible')
  .click()
```

#### 3. Flaky tests

**Solution:** Add retries in config

```javascript
{
  retries: {
    runMode: 2,    // Retry twice in CI
    openMode: 0    // No retry in dev
  }
}
```

#### 4. Module import errors

**Solution:** Check tsconfig.json includes TypeScript files

```json
{
  "include": ["cypress/**/*.ts"],
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all test files
- Follow Page Object Model pattern
- Add descriptive test names
- Include comments for complex logic
- Update documentation for new features

---

## 📝 Complete Scripts Reference

### Development
```bash
npm run cypress:open              # Open Cypress Test Runner
npm run test:smoke:headed         # Open Cypress UI with smoke test filter
```

### TDD Test Execution
```bash
npm run cypress:report            # All TDD tests + report + auto-open
npm run cypress:run               # All TDD tests + report (no open)
npm run test:smoke:report         # TDD smoke tests + report + auto-open
npm run test:smoke                # TDD smoke tests + report (no open)
```

### BDD Test Execution
```bash
npm run test:bdd:all:report       # All BDD scenarios + report + auto-open
---

## 🔗 Useful Resources

### Framework Documentation
- 📄 [REPORTING_SETUP_GUIDE.md](./REPORTING_SETUP_GUIDE.md) - Complete reporting setup documentation
- 📁 [GitHub Repository](https://github.com/sauravkmr780/CypressAutomationFramework)
- ⚡ [GitHub Actions Workflows](https://github.com/sauravkmr780/CypressAutomationFramework/actions)

### Official Documentation
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Gherkin Syntax Reference](https://cucumber.io/docs/gherkin/reference/)

### Plugins & Tools
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [Multiple Cucumber HTML Reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)
- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
npm run open:report               # Open TDD report in browser
npm run open:bdd:report           # Open BDD report in browser
npm run clean:reports             # Remove all old reports
```

### Utilities
```bash
npm install                       # Install all dependencies
npm update cypress                # Update Cypress version
npx cypress verify                # Verify Cypress installation
npx cypress info                  # Show Cypress environment info
```

---

## 🔗 Useful Links

- [Cypress Documentation](https://docs.cypress.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

---

## 📄 License

This project is licensed under the ISC License.

---

## 👤 Author

**Saurav Kumar**

- GitHub: [@sauravkmr780](https://github.com/sauravkmr780)
- Repository: [CypressAutomationFramework](https://github.com/sauravkmr780/CypressAutomationFramework)

---

## 🙏 Acknowledgments

- Rahul Shetty Academy for test applications
- Cypress.io for the amazing testing framework
- GitHub Actions for CI/CD platform

---

## 📊 Project Statistics

### Test Coverage
- **Total Test Files:** 9 (7 TDD + 2 BDD)
- **Total Tests/Scenarios:** 31 (27 TDD + 4 BDD)
- **Smoke Tests:** 5 (@smoke tagged)
- **Database Tests:** 13 (Employees table validation)
- **API Tests:** 6 (GET/POST endpoints)
- **UI Tests:** 12 (Web interactions)
- **Applications Under Test:** 3

### Test Files Breakdown
- **E-commerce Tests:** Test1.cy.ts (6 tests)
- **Practice Tests:** Test2.cy.ts (12 tests)
- **End-to-End Flow:** practiceE2E.cy.ts (1 test)
- **API Tests:** GETApiValidation.cy.ts, POSTAPIValidation.cy.ts, loginAPI.cy.ts (6 tests)
- **Database Tests:** EmployeesDBTest.cy.ts, DBConnectionTest.cy.ts, AdvancedDBValidation.cy.ts (13 tests)
- **BDD Features:** ecommerce.feature, ecommerceShop.feature (4 scenarios)

### Framework Components
- **Custom Commands:** 5+ including `cy.loginToShop`, `cy.selectDate`, `cy.dbQuery`, `cy.dbInsert`, `cy.dbUpdate`, `cy.dbDelete`, `cy.dbExecuteProc`
- **Page Object Files:** 2 JSON files (products, selectors)
- **Step Definitions:** 5 BDD steps (1 Given, 3 When, 1 Then)
- **Feature Files:** 2 files
- **Reporting Systems:** 3 (Mochawesome, Cucumber HTML, Allure)
- **Database Support:** Azure SQL Server integration

### Technology Stack
- **Testing Framework:** Cypress 15.6.0
- **Language:** TypeScript 5.0.0
- **BDD Support:** Cucumber (Gherkin)
- **Database:** Azure SQL Server + MSSQL driver
- **Reporters:** Mochawesome + Cucumber HTML + Allure
- **Build Tool:** Webpack 5.103.0
- **CI/CD:** GitHub Actions with GitHub Secrets

### Browser Support
- ✅ Chrome (default)
- ✅ Firefox
- ✅ Edge
- ✅ Electron (headless)

---

## 🎯 Key Highlights

✅ **Dual Testing Approach** - TDD and BDD in single framework  
✅ **Tag-Based Execution** - Run smoke or regression suites  
✅ **Triple Reporting** - Mochawesome + Cucumber HTML + Allure  
✅ **Historical Tracking** - Allure provides test trends over time  
✅ **Type Safety** - Full TypeScript integration  
✅ **CI/CD Ready** - GitHub Actions with manual dispatch  
✅ **Production Ready** - Complete documentation and best practices  

---

**Happy Testing! 🚀**

*Last Updated: November 28, 2025*
