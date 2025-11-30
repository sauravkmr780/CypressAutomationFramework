# Azure SQL Database Integration - Setup Complete ✅

## 🎉 Successfully Connected to Your Database!

**Database:** `PracticeDBSetup`  
**Server:** `sauravdbdemo.database.windows.net`  
**Status:** ✅ All 13 tests passed successfully!

---

## 🚀 GitHub Actions & CI/CD Setup

### Configure GitHub Secrets for Database Tests

For GitHub Actions CI/CD to access your database, you must add credentials as secrets:

1. **Go to:** Repository → Settings → Secrets and variables → Actions
2. **Click:** "New repository secret"
3. **Add these secrets:**

| Secret Name | Value | Example |
|------------|-------|---------|
| `DB_SERVER` | Your Azure SQL Server | `sauravdbdemo.database.windows.net` |
| `DB_USER` | Your database username | `skdblogin` |
| `DB_PASSWORD` | Your database password | `your_secure_password` |
| `DB_NAME` | Your database name | `PracticeDBSetup` |

**⚠️ Important:** Without these GitHub Secrets, database tests will fail in CI/CD!

### Verify GitHub Actions Workflow

The workflow in `.github/workflows/cypress.yml` automatically uses these secrets:

```yaml
env:
  DB_SERVER: ${{ secrets.DB_SERVER }}
  DB_USER: ${{ secrets.DB_USER }}
  DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
  DB_NAME: ${{ secrets.DB_NAME }}
```

### Run Database Tests in GitHub Actions

1. Push code to GitHub repository
2. Go to: **Actions tab**
3. Select **"Cypress Tests"** workflow
4. Click **"Run workflow"** button
5. Select test type (TDD / BDD / All)
6. Choose browser (Chrome / Firefox / Edge)
7. Click **"Run workflow"**

---

## 📊 Test Results Summary

| Test | Status |
|------|--------|
| Database Connection | ✅ Passed |
| Retrieve All Employees | ✅ Passed |
| Verify Saurav Kumar Record | ✅ Passed |
| Verify Priyanka Singh Record | ✅ Passed |
| Verify Anil Verma Record | ✅ Passed |
| Count Total Employees | ✅ Passed |
| Get Employees by Department | ✅ Passed |
| Calculate Average Salary | ✅ Passed |
| Get Highest Paid Employee | ✅ Passed |
| Insert New Employee | ✅ Passed |
| Update Employee Salary | ✅ Passed |
| Delete Test Employee | ✅ Passed |
| Verify Database Cleanup | ✅ Passed |

---

## 🗂️ Your Employees Table

| EmployeeID | FullName | Department | Salary |
|------------|----------|------------|--------|
| 1 | Saurav Kumar | QA Automation | $82,000.00 |
| 2 | Priyanka Singh | IAM Security | $98,000.00 |
| 3 | Anil Verma | Development | $105,000.00 |

---

## 🚀 Quick Commands

```bash
# Run database tests with report
npm run test:db:report

# Run only database tests
npm run test:db

# Run with Allure report
npm run test:db:allure

# Run specific employee tests
npx cypress run --spec cypress/e2e/TDD/EmployeesDBTest.cy.ts
```

---

## 📝 Custom Commands Available

### Query Data
```typescript
cy.dbQuery('SELECT * FROM Employees WHERE Department = "QA Automation"')
```

### Insert Data
```typescript
cy.dbInsert('Employees', {
  FullName: 'New Employee',
  Department: 'Testing',
  Salary: 75000.00
})
```

### Update Data
```typescript
cy.dbUpdate('Employees', 
  { Salary: 90000.00 }, 
  "FullName = 'Saurav Kumar'"
)
```

### Delete Data
```typescript
cy.dbDelete('Employees', "FullName = 'Test Employee'")
```

---

## 📁 Files Created

✅ **Configuration:**
- `.env` - Database credentials (configured)
- `cypress.config.js` - Database tasks added
- `cypress/support/commands.ts` - Custom DB commands

✅ **Helper Files:**
- `cypress/support/db/dbConfig.ts`
- `cypress/support/db/dbHelper.ts`

✅ **Test Files:**
- `cypress/e2e/TDD/EmployeesDBTest.cy.ts` - Employee table tests
- `cypress/e2e/TDD/DBConnectionTest.cy.ts` - Connection tests
- `cypress/e2e/TDD/DBValidation.cy.ts` - Example tests

✅ **Documentation:**
- `DATABASE_SETUP_GUIDE.md` - Complete guide
- `DB_QUICK_REFERENCE.md` - Quick reference
- `AZURE_SQL_SETUP_SUMMARY.md` - This file

---

## 💡 Example: Real-World Test Scenario

```typescript
describe('Employee Salary Validation', () => {
  it('should validate UI displays correct employee data from database', () => {
    // Get employee data from database
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Saurav Kumar'")
      .then((dbResults) => {
        const employee = dbResults[0];
        
        // Visit your application
        cy.visit('https://yourapp.com/employee/1');
        
        // Verify UI matches database
        cy.get('.employee-name').should('have.text', employee.FullName);
        cy.get('.employee-dept').should('have.text', employee.Department);
        cy.get('.employee-salary').should('contain', employee.Salary);
      });
  });
  
  it('should update employee salary and verify in database', () => {
    // Update via UI
    cy.visit('https://yourapp.com/employee/1/edit');
    cy.get('#salary-input').clear().type('85000');
    cy.get('#save-btn').click();
    
    // Verify database was updated
    cy.dbQuery("SELECT Salary FROM Employees WHERE FullName = 'Saurav Kumar'")
      .then((results) => {
        expect(results[0].Salary).to.equal(85000.00);
      });
  });
});
```

---

## 🔒 Security Notes

✅ Credentials are stored in `.env` file  
✅ `.env` is in `.gitignore` (not committed to Git)  
✅ Connection uses `encrypt: true` for Azure SQL security  
✅ All queries have error handling  

---

## 📦 Packages Installed

- ✅ `mssql@12.1.1` - SQL Server client
- ✅ `@types/mssql` - TypeScript types
- ✅ `cypress-sql-server@1.0.0` - Cypress wrapper
- ✅ `dotenv@17.2.3` - Environment variables

---

## 🎯 What You Can Do Now

1. ✅ Run database tests: `npm run test:db:report`
2. ✅ Create custom tests for your application
3. ✅ Integrate database validation in existing tests
4. ✅ Add more tables and complex queries
5. ✅ Use database setup/teardown in test fixtures

---

**🎊 Setup Complete! Your Cypress framework is now fully integrated with Azure SQL Server!**

For detailed documentation, see: `DATABASE_SETUP_GUIDE.md`  
For quick reference, see: `DB_QUICK_REFERENCE.md`
