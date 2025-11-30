# 📊 Excel File Validation Setup Guide

Complete guide for reading and validating Excel files in Cypress framework.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [Excel Tasks](#excel-tasks)
- [Usage Examples](#usage-examples)
- [Sample Excel Structure](#sample-excel-structure)
- [Test Patterns](#test-patterns)
- [NPM Scripts](#npm-scripts)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This framework supports Excel file validation using the `xlsx` library. You can:

- ✅ Read Excel files from `fixtures` folder
- ✅ Read downloaded Excel files from `downloads` folder
- ✅ Validate data from single or multiple sheets
- ✅ Compare Excel data with Database records
- ✅ Extract and validate specific columns/rows
- ✅ Support for `.xlsx`, `.xls`, and `.csv` formats

**Library Used:** `xlsx@0.18.5` - Most popular Excel library (20M+ weekly downloads)

---

## 📥 Installation

### 1. Install Required Packages

```bash
npm install xlsx --save-dev
npm install @types/xlsx --save-dev
```

### 2. Verify Installation

Check `package.json` for:

```json
{
  "devDependencies": {
    "xlsx": "^0.18.5",
    "@types/xlsx": "^0.0.35"
  }
}
```

---

## ⚙️ Configuration

### 1. Import xlsx in `cypress.config.js`

```javascript
import XLSX from 'xlsx';
```

### 2. Add Excel Tasks

Add these tasks in `cypress.config.js` under `setupNodeEvents`:

```javascript
on('task', {
  // Read specific sheet from Excel file
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
  
  // Get all sheet names
  readExcelSheetNames(filePath) {
    try {
      const workbook = XLSX.readFile(filePath);
      return workbook.SheetNames;
    } catch (error) {
      console.error('Excel sheet names error:', error);
      throw error;
    }
  },
  
  // Read all sheets at once
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
```

---

## 🛠️ Excel Tasks

### Task 1: `readExcel` - Read Specific Sheet

**Purpose:** Read data from a specific Excel sheet

**Parameters:**
- `filePath` (string) - Absolute or relative path to Excel file
- `sheetName` (string, optional) - Sheet name (defaults to first sheet)

**Returns:** Array of objects (each row as an object)

**Example:**
```typescript
cy.task('readExcel', {
  filePath: 'cypress/fixtures/employees.xlsx',
  sheetName: 'Employees'
}).then((data) => {
  const rows = data as any[];
  expect(rows).to.have.length.greaterThan(0);
});
```

---

### Task 2: `readExcelSheetNames` - Get Sheet Names

**Purpose:** Get list of all sheet names in Excel file

**Parameters:**
- `filePath` (string) - Path to Excel file

**Returns:** Array of strings (sheet names)

**Example:**
```typescript
cy.task('readExcelSheetNames', 'cypress/fixtures/employees.xlsx')
  .then((names) => {
    const sheetNames = names as string[];
    expect(sheetNames).to.include('Employees');
  });
```

---

### Task 3: `readExcelAllSheets` - Read All Sheets

**Purpose:** Read data from all sheets in one call

**Parameters:**
- `filePath` (string) - Path to Excel file

**Returns:** Object with sheet names as keys, data arrays as values

**Example:**
```typescript
cy.task('readExcelAllSheets', 'cypress/fixtures/employees.xlsx')
  .then((allSheets) => {
    const sheets = allSheets as any;
    expect(sheets.Employees).to.exist;
    expect(sheets.Products).to.exist;
  });
```

---

## 💡 Usage Examples

### Example 1: Read and Validate Employee Data

```typescript
it('should validate employee records', () => {
  cy.task('readExcel', {
    filePath: 'cypress/fixtures/employees.xlsx',
    sheetName: 'Employees'
  }).then((employees) => {
    const empData = employees as any[];
    
    // Validate structure
    expect(empData).to.have.length(5);
    expect(empData[0]).to.have.property('FullName');
    expect(empData[0]).to.have.property('Department');
    expect(empData[0]).to.have.property('Salary');
    
    // Validate specific record
    const saurav = empData.find(e => e.FullName === 'Saurav Kumar');
    expect(saurav.Department).to.equal('QA Automation');
    expect(saurav.Salary).to.be.greaterThan(80000);
  });
});
```

---

### Example 2: Filter and Validate Department-wise

```typescript
it('should filter QA employees', () => {
  cy.task('readExcel', {
    filePath: 'cypress/fixtures/employees.xlsx',
    sheetName: 'Employees'
  }).then((employees) => {
    const empData = employees as any[];
    
    // Filter QA team
    const qaTeam = empData.filter(e => e.Department === 'QA Automation');
    expect(qaTeam).to.have.length.greaterThan(0);
    
    // Calculate average salary
    const avgSalary = qaTeam.reduce((sum, e) => sum + e.Salary, 0) / qaTeam.length;
    cy.log(`Average QA Salary: ${avgSalary}`);
    expect(avgSalary).to.be.greaterThan(70000);
  });
});
```

---

### Example 3: Compare Excel with Database

```typescript
it('should match Excel data with Database', () => {
  let excelData: any[];
  
  // Read Excel
  cy.task('readExcel', {
    filePath: 'cypress/fixtures/employees.xlsx',
    sheetName: 'Employees'
  }).then((data) => {
    excelData = data as any[];
  });
  
  // Query Database
  cy.task('dbQuery', 'SELECT * FROM Employees ORDER BY EmployeeID')
    .then((dbData) => {
      const dbRecords = dbData as any[];
      
      // Compare counts
      expect(excelData.length).to.equal(dbRecords.length);
      
      // Compare each record
      excelData.forEach((excelRow, index) => {
        expect(dbRecords[index].FullName).to.equal(excelRow.FullName);
        expect(dbRecords[index].Department).to.equal(excelRow.Department);
      });
    });
});
```

---

### Example 4: Validate Downloaded Excel File

```typescript
it('should validate downloaded report', () => {
  // Trigger download
  cy.visit('https://example.com/reports');
  cy.get('.download-excel-btn').click();
  cy.wait(3000); // Wait for download
  
  // Validate downloaded file
  cy.task('readExcel', {
    filePath: 'cypress/downloads/employee-report.xlsx',
    sheetName: 'Report'
  }).then((data) => {
    const reportData = data as any[];
    
    expect(reportData).to.have.length.greaterThan(0);
    expect(reportData[0]).to.have.property('EmployeeName');
    expect(reportData[0]).to.have.property('Department');
  });
});
```

---

### Example 5: Read Multiple Sheets

```typescript
it('should validate all sheets', () => {
  cy.task('readExcelAllSheets', 'cypress/fixtures/employees.xlsx')
    .then((allSheets) => {
      const sheets = allSheets as any;
      
      // Validate Employees sheet
      expect(sheets.Employees).to.have.length(5);
      
      // Validate Products sheet
      expect(sheets.Products).to.have.length(4);
      
      // Cross-validate data
      const totalEmployees = sheets.Employees.length;
      const totalProducts = sheets.Products.length;
      cy.log(`Employees: ${totalEmployees}, Products: ${totalProducts}`);
    });
});
```

---

### Example 6: Data-Driven Testing with Excel

```typescript
it('should run tests from Excel test data', () => {
  cy.task('readExcel', {
    filePath: 'cypress/fixtures/test-data.xlsx',
    sheetName: 'LoginTests'
  }).then((testCases) => {
    const tests = testCases as any[];
    
    tests.forEach((testCase) => {
      cy.log(`Running Test: ${testCase.TestCase}`);
      
      cy.visit('/login');
      cy.get('#username').type(testCase.Username);
      cy.get('#password').type(testCase.Password);
      cy.get('#login-btn').click();
      
      if (testCase.ExpectedResult === 'Success') {
        cy.url().should('include', '/dashboard');
      } else {
        cy.get('.error-message').should('be.visible');
      }
    });
  });
});
```

---

## 📁 Sample Excel Structure

### Employees Sheet

| EmployeeID | FullName | Department | Salary | JoinDate |
|------------|----------|------------|--------|----------|
| 1 | Saurav Kumar | QA Automation | 82000 | 2025-11-29 |
| 2 | Priyanka Singh | IAM Security | 98000 | 2025-11-29 |
| 3 | Anil Verma | Development | 105000 | 2025-11-29 |

### Products Sheet

| ProductID | ProductName | Category | Price | Stock |
|-----------|-------------|----------|-------|-------|
| P001 | ADIDAS ORIGINAL | Shoes | 82000 | 50 |
| P002 | NIKE REVOLUTION | Shoes | 65000 | 30 |

### TestData Sheet

| TestCase | Username | Password | ExpectedResult |
|----------|----------|----------|----------------|
| TC001 | test@example.com | Test@123 | Success |
| TC002 | invalid@test.com | wrong | Failure |

---

## 🧪 Test Patterns

### Pattern 1: Basic Validation

```typescript
cy.task('readExcel', { filePath: '...', sheetName: '...' })
  .then((data) => {
    const rows = data as any[];
    expect(rows).to.have.length(5);
    expect(rows[0]).to.have.property('ColumnName');
  });
```

### Pattern 2: Field-Level Validation

```typescript
cy.task('readExcel', { filePath: '...', sheetName: '...' })
  .then((data) => {
    const rows = data as any[];
    rows.forEach((row) => {
      expect(row.Email).to.include('@');
      expect(row.Age).to.be.a('number');
      expect(row.Status).to.be.oneOf(['Active', 'Inactive']);
    });
  });
```

### Pattern 3: Calculation Validation

```typescript
cy.task('readExcel', { filePath: '...', sheetName: '...' })
  .then((data) => {
    const rows = data as any[];
    
    // Sum
    const total = rows.reduce((sum, row) => sum + row.Amount, 0);
    expect(total).to.equal(expectedTotal);
    
    // Average
    const average = total / rows.length;
    expect(average).to.be.greaterThan(threshold);
    
    // Min/Max
    const salaries = rows.map(r => r.Salary);
    const maxSalary = Math.max(...salaries);
    expect(maxSalary).to.be.lessThan(200000);
  });
```

### Pattern 4: Conditional Validation

```typescript
cy.task('readExcel', { filePath: '...', sheetName: '...' })
  .then((data) => {
    const rows = data as any[];
    
    const activeUsers = rows.filter(r => r.Status === 'Active');
    const inactiveUsers = rows.filter(r => r.Status === 'Inactive');
    
    expect(activeUsers.length).to.be.greaterThan(inactiveUsers.length);
  });
```

---

## 📜 NPM Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test:excel": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/ExcelValidation.cy.ts' && npm run generate:report",
    "test:excel:report": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/ExcelValidation.cy.ts' && npm run generate:report && start cypress\\reports\\html\\index.html",
    "test:excel:allure": "npm run clean:allure && cypress run --spec 'cypress/e2e/TDD/ExcelValidation.cy.ts' && npm run generate:allure:report && npm run open:allure:report",
    "test:excel:smoke": "npm run clean:reports && cypress run --spec 'cypress/e2e/TDD/ExcelValidation.cy.ts' --env grep=@smoke && npm run generate:report && start cypress\\reports\\html\\index.html",
    "generate:excel": "node cypress/support/excelGenerator.js"
  }
}
```

### Run Commands

```bash
# Run Excel tests with Mochawesome report
npm run test:excel:report

# Run Excel tests with Allure report
npm run test:excel:allure

# Run only smoke Excel tests
npm run test:excel:smoke

# Generate sample Excel file
npm run generate:excel
```

---

## ✅ Best Practices

### 1. File Paths

**Use absolute paths or relative to project root:**

```typescript
// ✅ Good - Relative to project root
const filePath = 'cypress/fixtures/employees.xlsx';

// ✅ Good - Downloaded files
const filePath = 'cypress/downloads/report.xlsx';

// ❌ Bad - Absolute system path
const filePath = 'C:/Users/...'; // Breaks in CI/CD
```

---

### 2. Type Casting

**Always cast the task result:**

```typescript
// ✅ Good
cy.task('readExcel', { filePath, sheetName }).then((data) => {
  const rows = data as any[];
  // Use rows
});

// ❌ Bad - TypeScript error
cy.task('readExcel', { filePath, sheetName }).then((data: any[]) => {
  // Error: Type 'unknown' is not assignable to type 'any[]'
});
```

---

### 3. Error Handling

**Check for empty data:**

```typescript
cy.task('readExcel', { filePath, sheetName }).then((data) => {
  const rows = data as any[];
  
  // Validate data exists
  expect(rows, 'Excel data should not be empty').to.have.length.greaterThan(0);
  
  // Then proceed with validation
  rows.forEach((row) => {
    // Validate row
  });
});
```

---

### 4. Sheet Name Validation

**Verify sheet exists before reading:**

```typescript
// Step 1: Check sheet names
cy.task('readExcelSheetNames', filePath).then((names) => {
  const sheetNames = names as string[];
  expect(sheetNames).to.include('Employees');
});

// Step 2: Read the sheet
cy.task('readExcel', { filePath, sheetName: 'Employees' })
  .then((data) => {
    // Process data
  });
```

---

### 5. Data Cleanup

**Clear downloads folder before tests:**

```typescript
before(() => {
  // Clear downloads folder
  cy.task('exec', 'del cypress\\downloads\\*.xlsx');
});

it('should download and validate report', () => {
  // Download Excel
  cy.get('.download-btn').click();
  cy.wait(3000);
  
  // Validate
  cy.task('readExcel', {
    filePath: 'cypress/downloads/report.xlsx',
    sheetName: 'Report'
  }).then((data) => {
    // Validate data
  });
});
```

---

### 6. Test Data Generation

**Create helper to generate Excel files:**

```javascript
// cypress/support/excelGenerator.js
const XLSX = require('xlsx');

const employeesData = [
  { ID: 1, Name: 'Saurav', Dept: 'QA', Salary: 82000 },
  { ID: 2, Name: 'Priyanka', Dept: 'Security', Salary: 98000 }
];

const workbook = XLSX.utils.book_new();
const sheet = XLSX.utils.json_to_sheet(employeesData);
XLSX.utils.book_append_sheet(workbook, sheet, 'Employees');
XLSX.writeFile(workbook, 'cypress/fixtures/employees.xlsx');
```

**Run before tests:**
```bash
npm run generate:excel
```

---

### 7. Logging

**Log important information:**

```typescript
cy.task('readExcel', { filePath, sheetName }).then((data) => {
  const rows = data as any[];
  
  cy.log(`📊 Total Records: ${rows.length}`);
  cy.log(`📝 First Record: ${JSON.stringify(rows[0])}`);
  
  // Validation
});
```

---

## 🐛 Troubleshooting

### Issue 1: File Not Found Error

**Error:**
```
Excel read error: ENOENT: no such file or directory
```

**Solution:**
- Check file path is correct (use forward slashes `/`)
- Ensure file exists in `cypress/fixtures` or `cypress/downloads`
- Use relative path from project root

```typescript
// ✅ Correct
const filePath = 'cypress/fixtures/employees.xlsx';

// ❌ Wrong
const filePath = 'fixtures/employees.xlsx';
```

---

### Issue 2: Sheet Name Not Found

**Error:**
```
Cannot read property 'Sheets' of undefined
```

**Solution:**
- Verify sheet name is correct (case-sensitive)
- Use `readExcelSheetNames` to get available sheets

```typescript
// Check available sheets first
cy.task('readExcelSheetNames', filePath).then((names) => {
  cy.log(`Available sheets: ${names}`);
});
```

---

### Issue 3: Empty Data Array

**Error:**
```
Expected data to have length > 0 but got []
```

**Solution:**
- Ensure Excel sheet has data rows
- First row should be headers
- Check if sheet has merged cells (may cause issues)

```typescript
// Validate data exists
cy.task('readExcel', { filePath, sheetName }).then((data) => {
  const rows = data as any[];
  if (rows.length === 0) {
    throw new Error('Excel sheet is empty');
  }
});
```

---

### Issue 4: TypeScript Type Error

**Error:**
```
Type 'unknown' is not assignable to type 'any[]'
```

**Solution:**
- Use `as any[]` type assertion after task result

```typescript
// ✅ Correct
.then((data) => {
  const rows = data as any[];
})

// ❌ Wrong
.then((data: any[]) => {
  // Error
})
```

---

### Issue 5: Download Wait Time

**Error:**
```
File not found - downloaded too slowly
```

**Solution:**
- Increase wait time for large files
- Use `cy.readFile` with retry logic

```typescript
// Wait for file to exist
cy.wait(5000); // Adjust based on file size

// Or use retry
cy.readFile('cypress/downloads/report.xlsx', { timeout: 15000 })
  .should('exist');

// Then validate
cy.task('readExcel', {
  filePath: 'cypress/downloads/report.xlsx',
  sheetName: 'Report'
}).then((data) => {
  // Validate
});
```

---

## 🎯 Advanced Use Cases

### Use Case 1: Multi-Sheet Validation

```typescript
it('should validate related data across sheets', () => {
  cy.task('readExcelAllSheets', 'cypress/fixtures/company-data.xlsx')
    .then((allSheets) => {
      const sheets = allSheets as any;
      
      const employees = sheets.Employees;
      const departments = sheets.Departments;
      
      // Validate all employee departments exist
      employees.forEach((emp: any) => {
        const deptExists = departments.some((d: any) => 
          d.DepartmentName === emp.Department
        );
        expect(deptExists, `Department ${emp.Department} should exist`).to.be.true;
      });
    });
});
```

---

### Use Case 2: Excel vs API Validation

```typescript
it('should match Excel data with API response', () => {
  let excelData: any[];
  
  // Read Excel
  cy.task('readExcel', {
    filePath: 'cypress/fixtures/products.xlsx',
    sheetName: 'Products'
  }).then((data) => {
    excelData = data as any[];
  });
  
  // Call API
  cy.request('GET', 'https://api.example.com/products')
    .then((response) => {
      const apiProducts = response.body;
      
      // Compare counts
      expect(apiProducts.length).to.equal(excelData.length);
      
      // Compare each product
      excelData.forEach((excelProduct) => {
        const apiProduct = apiProducts.find((p: any) => 
          p.id === excelProduct.ProductID
        );
        expect(apiProduct).to.exist;
        expect(apiProduct.name).to.equal(excelProduct.ProductName);
        expect(apiProduct.price).to.equal(excelProduct.Price);
      });
    });
});
```

---

### Use Case 3: Parameterized Tests from Excel

```typescript
describe('Data-Driven Tests from Excel', () => {
  let testData: any[];
  
  before(() => {
    cy.task('readExcel', {
      filePath: 'cypress/fixtures/test-cases.xlsx',
      sheetName: 'LoginTests'
    }).then((data) => {
      testData = data as any[];
    });
  });
  
  it('should run all test cases from Excel', () => {
    testData.forEach((testCase) => {
      cy.log(`🧪 Test Case: ${testCase.TestCase}`);
      
      cy.visit('/login');
      cy.get('#username').type(testCase.Username);
      cy.get('#password').type(testCase.Password);
      cy.get('#login-btn').click();
      
      if (testCase.ExpectedResult === 'Success') {
        cy.url().should('include', testCase.ExpectedURL);
      } else {
        cy.get('.error').should('contain', testCase.ExpectedError);
      }
    });
  });
});
```

---

## 📚 Additional Resources

### Official xlsx Documentation
- **GitHub:** https://github.com/SheetJS/sheetjs
- **Documentation:** https://docs.sheetjs.com/

### Cypress Documentation
- **Tasks:** https://docs.cypress.io/api/commands/task
- **Fixtures:** https://docs.cypress.io/api/commands/fixture

### Related Guides
- **[REPORTING_SETUP_GUIDE.md](./REPORTING_SETUP_GUIDE.md)** - Test reporting setup
- **[README.md](./README.md)** - Main framework documentation
- **[DB_SETUP_GUIDE.md](./DB_SETUP_GUIDE.md)** - Database testing setup (if exists)

---

## 📞 Support

For issues or questions:
1. Check this guide thoroughly
2. Review test file: `cypress/e2e/TDD/ExcelValidation.cy.ts`
3. Check Cypress config: `cypress.config.js`
4. Open GitHub issue: [Repository Issues](https://github.com/sauravkmr780/CypressAutomationFramework/issues)

---

**Last Updated:** November 30, 2025  
**Author:** Saurav Kumar  
**Framework Version:** 1.0.0
