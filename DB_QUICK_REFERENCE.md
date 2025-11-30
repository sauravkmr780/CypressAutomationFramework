# Azure SQL Server - Quick Reference Card

## 🔐 Configure Credentials

**File:** `.env`
```env
DB_SERVER=your-azure-server.database.windows.net
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## 🚀 Run Database Tests

```bash
# Run DB tests with report
npm run test:db:report

# Run DB tests only
npm run test:db

# Run DB tests with Allure
npm run test:db:allure
```

## 📝 Custom Commands

| Command | Description | Example |
|---------|-------------|---------|
| `cy.dbQuery(query)` | Execute SELECT query | `cy.dbQuery('SELECT * FROM Users')` |
| `cy.dbInsert(table, data)` | Insert record | `cy.dbInsert('Users', {Name: 'John', Email: 'john@test.com'})` |
| `cy.dbUpdate(table, data, where)` | Update record | `cy.dbUpdate('Users', {Status: 'Active'}, "Email = 'john@test.com'")` |
| `cy.dbDelete(table, where)` | Delete record | `cy.dbDelete('Users', "Email = 'john@test.com'")` |
| `cy.dbExecuteProc(name, params)` | Execute stored procedure | `cy.dbExecuteProc('sp_GetUsers', ['Admin'])` |

## ✅ Quick Test Template

```typescript
describe('Database Tests', () => {
  it('should query and validate data', () => {
    cy.dbQuery('SELECT * FROM YourTable WHERE Id = 1').then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].Name).to.equal('Expected Name');
    });
  });
});
```

## 📂 Files Created

- ✅ `cypress/support/db/dbConfig.ts` - Database configuration
- ✅ `cypress/support/db/dbHelper.ts` - Helper functions
- ✅ `cypress/support/commands.ts` - Updated with DB commands
- ✅ `cypress.config.js` - Updated with DB tasks
- ✅ `cypress/e2e/TDD/DBValidation.cy.ts` - Example tests
- ✅ `.env` - Credentials (update this!)
- ✅ `DATABASE_SETUP_GUIDE.md` - Full documentation

## 📦 Packages Installed

- ✅ mssql@12.1.1
- ✅ cypress-sql-server@1.0.0
- ✅ dotenv@17.2.3

---

**Next Step:** Update `.env` with your Azure SQL Server credentials and run `npm run test:db:report`
