# 🚀 Quick Start: Allure Reports

## ✅ Installation Complete!

Your framework now has **3 reporting systems**:

### 📊 Triple Reporting Summary

| Reporter | Purpose | Command | Location |
|----------|---------|---------|----------|
| **Mochawesome** | TDD technical details | `npm run test:smoke:report` | `cypress/reports/html/` (static HTML) |
| **Cucumber HTML** | BDD business view | [Disabled] | [Allure used for BDD] |
| **Allure** | Unified TDD+BDD dashboard | `npm run test:smoke:allure` | Served at `http://127.0.0.1:<port>` |

**Important:** Allure requires a web server (automatically started by `npx allure open`). Unlike static HTML reports, Allure uses AJAX to load data dynamically.

---

## 🎯 Quick Commands

### Run Tests with Allure

```bash
# All tests with Allure
npm run test:allure

# TDD smoke tests with Allure
npm run test:smoke:allure

# BDD tests with Allure
npm run test:bdd:allure

# BDD smoke tests with Allure
npm run test:bdd:smoke:allure
```

### Manual Operations

```bash
# Clean Allure artifacts
npm run clean:allure

# Generate Allure report (from existing results)
npm run generate:allure:report

# Open Allure report
npm run open:allure:report
```

### Generate All Reports

```bash
# Run tests and generate all 3 reports
npm run test:all:reports

# Then open each:
npm run open:report              # Mochawesome (TDD)
npm run open:bdd:report          # Cucumber (BDD)
npm run open:allure:report       # Allure (Unified)
```

---

## 📁 Report Locations

```
CypressAutomationFramework/
├── cypress/reports/
│   ├── html/                    # Mochawesome (TDD) - static HTML
│   │   └── index.html
│   └── cucumber-html/           # [Not used - Allure used for BDD]
│       └── index.html
├── allure-results/              # Allure JSON (auto-generated during tests)
└── allure-report/               # Allure HTML (must be served via HTTP)
    └── index.html               # Opens at http://127.0.0.1:<port>
```

**Note:** Allure report opens via `npx allure open` which starts a web server automatically.

---

## 🎨 Allure Report Features

✅ **Unified Dashboard** - Single view for TDD + BDD tests  
✅ **Historical Trends** - Track test results over time  
✅ **Timeline View** - Visual test execution timeline  
✅ **Categories** - Automatic failure categorization  
✅ **Attachments** - Screenshots, logs, videos  
✅ **Retries** - Retry attempts visualization  
✅ **Tags** - Filter by @smoke, @regression  
✅ **BDD Support** - Feature/Scenario/Step hierarchy  
✅ **Beautiful UI** - Modern, interactive interface  

---

## 📊 When to Use Each Report

| Use Case | Report to Use |
|----------|--------------|
| Quick TDD smoke check | **Mochawesome** |
| BDD stakeholder demo | **Cucumber HTML** |
| Complete test analysis | **Allure** |
| Historical tracking | **Allure** |
| Timeline analysis | **Allure** |
| Unified TDD+BDD view | **Allure** |
| Technical deep dive (TDD) | **Mochawesome** |
| Business requirements (BDD) | **Cucumber HTML** |

---

## ✨ What Just Happened?

### ✅ Installed Packages:
- `@mmisty/cypress-allure-adapter@3.3.2` - Cypress Allure integration
- `allure-commandline@2.34.1` - Allure CLI for report generation

### ✅ Configuration Updated:
- **cypress.config.js** - Added Allure plugin
- **cypress/support/e2e.ts** - Added Allure support import
- **package.json** - Added 8 new Allure scripts
- **.gitignore** - Added Allure artifacts exclusion

### ✅ Test Results (Smoke Tests):
- **Test1.cy.ts** - 2 @smoke tests passed ✅
- **Test2.cy.ts** - 2 @smoke tests passed ✅
- **Total: 4 smoke tests passed**

### ✅ Reports Generated:
- **Mochawesome JSON** → `cypress/reports/.jsons/`
- **Allure Results** → `allure-results/` (20+ JSON files)
- **Allure HTML** → `allure-report/index.html`

---

## 🚀 Next Steps

### 1. View Your Allure Report

The report should be open in your browser at `http://localhost:port`

**Explore:**
- **Overview** - Dashboard with test statistics
- **Suites** - Tests organized by file
- **Graphs** - Status, severity, duration charts
- **Timeline** - Execution timeline visualization
- **Behaviors** - BDD feature/scenario hierarchy

### 2. Run More Tests

```bash
# Run all tests to see complete Allure report
npm run test:allure
```

### 3. Accumulate History

```bash
# Run 1
npx cypress run
npm run generate:allure:report

# Run 2 (don't clean - accumulate results)
npx cypress run
npm run generate:allure:report

# Now you'll see historical trends in Allure!
```

### 4. Add Allure Annotations

Enhance reports with metadata:

```typescript
it('should validate login', () => {
  cy.allure().description('Validates user login flow')
  cy.allure().tag('smoke', 'auth')
  cy.allure().severity('critical')
  
  // Test code
})
```

---

## 📖 Documentation

- **Complete Allure Guide:** `ALLURE_SETUP_GUIDE.md`
- **Reporting Setup:** `REPORTING_SETUP_GUIDE.md`
- **Main README:** `README.md`

---

## 🎯 Key Takeaways

✅ **Triple Reporting** - Mochawesome + Cucumber + Allure  
✅ **Unified Dashboard** - All tests in one Allure report  
✅ **Historical Tracking** - Trend analysis across runs  
✅ **Professional UI** - Beautiful, interactive reports  
✅ **Easy to Use** - One command generates and opens  
✅ **Production Ready** - Complete setup with documentation  

---

## 🆘 Quick Troubleshooting

### Report not generating?
```bash
# Check if results exist
ls allure-results

# Manually generate
npm run generate:allure:report
```

### Port already in use?
```bash
# Allure server already running? Close terminal or:
Get-Process -Name "java" | Where-Object {$_.Path -like "*allure*"} | Stop-Process

# Or use different port
npx allure open allure-report -p 5001
```

### Why does Allure need a server?
- Allure uses AJAX to dynamically load JSON data files
- Browser security (CORS) blocks AJAX with `file://` protocol
- Opening `index.html` directly shows "Loading..." forever
- **Solution:** Use `npx allure open` which starts HTTP server automatically
- Mochawesome/Cucumber HTML don't need server (single file with embedded data)

### No tests showing?
```bash
# Verify Allure is enabled
# Check cypress.config.js:
env: { allure: true }

# Verify support import
# Check cypress/support/e2e.ts:
import '@mmisty/cypress-allure-adapter/support';
```

---

**🎉 Congratulations! Your Cypress framework now has enterprise-grade triple reporting!**

*Last Updated: November 28, 2025*
