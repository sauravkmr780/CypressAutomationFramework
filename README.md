# Cypress Automation Framework

[![Cypress Tests](https://github.com/sauravkmr780/CypressAutomationFramework/workflows/Cypress%20Tests/badge.svg)](https://github.com/sauravkmr780/CypressAutomationFramework/actions)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

> A comprehensive end-to-end testing framework built with Cypress, TypeScript, and modern best practices including Page Object Model, custom commands, and CI/CD integration.

---

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Test Suites](#-test-suites)
- [Reports](#-reports)
- [CI/CD Integration](#-cicd-integration)
- [Configuration](#-configuration)
- [Custom Commands](#-custom-commands)
- [Page Object Model](#-page-object-model)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Author](#-author)

---

## ✨ Features

- ✅ **TypeScript Support** - Full TypeScript integration for type safety and better IDE support
- ✅ **Page Object Model** - Centralized selectors in JSON files for better maintainability
- ✅ **Custom Commands** - Reusable custom commands (login, date picker selection)
- ✅ **Multiple Test Suites** - E-commerce, practice scenarios, and end-to-end flows
- ✅ **Mochawesome Reports** - Beautiful HTML reports with charts and screenshots
- ✅ **CI/CD Ready** - GitHub Actions workflow with manual test selection
- ✅ **Multi-Browser Support** - Chrome, Firefox, and Edge browser testing
- ✅ **iframe Support** - cypress-iframe plugin integration
- ✅ **Environment Configuration** - Centralized configuration with environment variables
- ✅ **Test Data Management** - Fixtures for test data separation
- ✅ **Screenshot on Failure** - Automatic screenshot capture for failed tests

---

## 📁 Project Structure

```
CypressAutomationFramework/
├── .github/
│   └── workflows/
│       └── cypress.yml                 # GitHub Actions CI/CD workflow
├── cypress/
│   ├── e2e/
│   │   ├── Test1.cy.ts                # E-commerce test suite (6 tests)
│   │   ├── Test2.cy.ts                # Practice test suite (12 tests)
│   │   └── practiceE2E.cy.ts          # End-to-end flow test
│   ├── fixtures/
│   │   └── example.json               # Test data (credentials, products)
│   ├── reports/                       # Mochawesome HTML reports
│   ├── screenshots/                   # Auto-captured on test failures
│   ├── support/
│   │   ├── commands.ts                # Custom Cypress commands
│   │   ├── e2e.ts                     # Global configuration
│   │   └── pageObjects/
│   │       ├── products.json          # Product page selectors
│   │       └── selectors.json         # Practice page selectors
│   └── videos/                        # Recorded test videos
├── cypress.config.js                  # Cypress configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # This file
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 20.x or higher
- **npm** - Version 9.x or higher
- **Git** - For version control

Check your versions:

```bash
node --version    # Should be v20.x or higher
npm --version     # Should be v9.x or higher
git --version     # Any recent version
```

---

## 📥 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/sauravkmr780/CypressAutomationFramework.git
cd CypressAutomationFramework
```

2. **Install dependencies:**

```bash
npm install
```

This will install:
- Cypress v15.6.0
- TypeScript v5.0.0
- cypress-mochawesome-reporter
- cypress-iframe
- @types/node

---

## 🚀 Running Tests

### Interactive Mode (Cypress Test Runner)

Open Cypress Test Runner for development and debugging:

```bash
npm run cypress:open
```

Then select a test file to run with live reloading and time-travel debugging.

### Headless Mode (Command Line)

Run all tests in headless mode:

```bash
npm run cypress:run
```

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/Test1.cy.ts"
```

### Run with Specific Browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

### Run with Custom Configuration

```bash
npx cypress run --config viewportWidth=1920,viewportHeight=1080
```

---

## 📊 Test Suites

### Test1.cy.ts - E-commerce Test Suite (6 tests)

Tests for GreenKart e-commerce application:

1. ✅ API validation (product data)
2. ✅ Search functionality
3. ✅ Product filtering
4. ✅ Add to cart functionality
5. ✅ Brand logo verification
6. ✅ Complete checkout flow

**Application Under Test:** https://rahulshettyacademy.com/seleniumPractise/

### Test2.cy.ts - Practice Test Suite (12 tests)

Comprehensive UI interaction tests:

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
11. ✅ iframe interactions
12. ✅ React date picker selection

**Application Under Test:** https://rahulshettyacademy.com/AutomationPractice/

### practiceE2E.cy.ts - End-to-End Flow (1 test)

Complete user journey test:

1. ✅ User login with role selection
2. ✅ Product browsing and filtering
3. ✅ Add multiple products to cart
4. ✅ Cart price validation
5. ✅ Checkout process
6. ✅ Country selection
7. ✅ Order confirmation

**Application Under Test:** https://rahulshettyacademy.com/loginpagePractise/

**Total Tests:** 19 passing tests

---

## 📈 Reports

### Mochawesome HTML Reports

After running tests, beautiful HTML reports are generated automatically.

**Location:** `cypress/reports/index.html`

**Features:**
- ✅ Test execution summary
- ✅ Pass/Fail statistics
- ✅ Execution time for each test
- ✅ Interactive charts and graphs
- ✅ Screenshots embedded for failures
- ✅ Detailed error messages
- ✅ Browser and environment info

**View Report:**

```bash
# Open report in default browser (Windows)
start cypress/reports/index.html

# Mac
open cypress/reports/index.html

# Linux
xdg-open cypress/reports/index.html
```

### Screenshots and Videos

- **Screenshots:** Automatically captured on test failures → `cypress/screenshots/`
- **Videos:** Test execution recordings (if enabled) → `cypress/videos/`

---

## 🔄 CI/CD Integration

### GitHub Actions

Automated testing runs on every push and can be triggered manually.

**Workflow Features:**
- ✅ Runs on push to main branch
- ✅ Manual workflow dispatch with options
- ✅ Select specific test file to run
- ✅ Choose browser (Chrome/Firefox/Edge)
- ✅ Automatic report generation
- ✅ Artifact upload (30-day retention)

**Manual Test Execution:**

1. Go to [Actions Tab](https://github.com/sauravkmr780/CypressAutomationFramework/actions)
2. Click "Cypress Tests" workflow
3. Click "Run workflow" button
4. Select:
   - Test file (All Tests / Test1 / Test2 / practiceE2E)
   - Browser (Chrome / Firefox / Edge)
5. Click "Run workflow"

**View Results:**

- Workflow runs are visible in Actions tab
- Download artifacts (reports, screenshots) after completion
- Test reports deployed to GitHub Pages (if enabled)

**Configuration File:** `.github/workflows/cypress.yml`

---

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.js`)

```javascript
{
  projectId: "4b7344",              // Cypress Cloud project ID
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    env: {
      url: "https://rahulshettyacademy.com"  // Base URL
    },
    specPattern: "cypress/e2e/**/*.cy.ts",   // Test file pattern
    screenshotOnRunFailure: true,             // Auto screenshot
    video: false                              // Video recording
  }
}
```

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

### Environment Variables

Set base URL and other configs:

```javascript
// Access in tests
Cypress.env('url')

// Set via command line
npx cypress run --env url=https://staging.example.com

// Set in cypress.config.js
env: {
  url: "https://rahulshettyacademy.com",
  apiKey: "your-api-key"
}
```

---

## 🎯 Custom Commands

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

#### 2. `cy.selectDate()`

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

## 📝 Scripts Reference

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run all tests headlessly
npm run cypress:run

# Run with report generation
npm run cypress:report

# Install dependencies
npm install

# Update Cypress
npm update cypress
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

## 📊 Project Stats

- **Total Tests:** 19
- **Test Suites:** 3
- **Custom Commands:** 2
- **Page Objects:** 2
- **Browsers Supported:** Chrome, Firefox, Edge
- **CI/CD:** GitHub Actions
- **Reporting:** Mochawesome HTML

---

**Happy Testing! 🚀**

*Last Updated: November 25, 2025*
