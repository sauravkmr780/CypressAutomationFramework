# Azure SQL Server Database Setup Guide

This guide explains how to set up and use Azure SQL Server database integration in your Cypress automation framework.

## 📦 Installed Packages

- **mssql** - Microsoft SQL Server client for Node.js
- **cypress-sql-server** - Cypress plugin wrapper for SQL Server operations
- **dotenv** - Environment variable management

## 🔧 Configuration

### 1. Environment Variables

Update the `.env` file in the root directory with your Azure SQL Server credentials:

```env
DB_SERVER=your-azure-server.database.windows.net
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

**Important:** The `.env` file is already added to `.gitignore` to protect your credentials.

### 2. Database Configuration

The database configuration is set up in:
- `cypress.config.js` - Main configuration with connection settings
- `cypress/support/db/dbConfig.ts` - Typed configuration interface
- `cypress/support/db/dbHelper.ts` - Helper functions for database operations

## 📝 Available Custom Commands

### 1. Execute SELECT Query
```typescript
cy.dbQuery('SELECT * FROM Users WHERE Status = "Active"').then((results) => {
  expect(results).to.be.an('array');
  cy.log(`Found ${results.length} records`);
});
```

### 2. Insert Data
```typescript
const userData = {
  Name: 'John Doe',
  Email: 'john@example.com',
  Status: 'Active'
};

cy.dbInsert('Users', userData);
```

### 3. Update Data
```typescript
const updateData = { Status: 'Inactive' };
const whereClause = "Email = 'john@example.com'";

cy.dbUpdate('Users', updateData, whereClause);
```

### 4. Delete Data
```typescript
cy.dbDelete('Users', "Email = 'john@example.com'");
```

### 5. Execute Stored Procedure
```typescript
cy.dbExecuteProc('sp_GetUsersByRole', ['Admin']).then((results) => {
  expect(results).to.be.an('array');
  cy.log(`Found ${results.length} admin users`);
});
```

## 🧪 Running Database Tests

### Run database tests with Mochawesome report:
```bash
npm run test:db
```

### Run database tests and open report:
```bash
npm run test:db:report
```

### Run database tests with Allure report:
```bash
npm run test:db:allure
```

## 📁 File Structure

```
CypressAutomation/
├── .env                                    # Database credentials (not committed)
├── cypress.config.js                       # Updated with database tasks
├── cypress/
│   ├── support/
│   │   ├── commands.ts                    # Database custom commands
│   │   └── db/
│   │       ├── dbConfig.ts                # Database configuration
│   │       └── dbHelper.ts                # Database helper functions
│   └── e2e/
│       └── TDD/
│           └── DBValidation.cy.ts         # Example database tests
```

## 💡 Usage Examples

### Example 1: Validate UI Data Against Database
```typescript
it('should validate order data matches database', () => {
  // Get data from database
  cy.dbQuery('SELECT * FROM Orders WHERE OrderId = 12345').then((dbResults) => {
    const order = dbResults[0];
    
    // Visit application
    cy.visit('/orders/12345');
    
    // Verify UI matches database
    cy.get('.order-total').should('have.text', `$${order.TotalAmount}`);
    cy.get('.order-status').should('have.text', order.Status);
    cy.get('.customer-name').should('have.text', order.CustomerName);
  });
});
```

### Example 2: Setup Test Data Before Test
```typescript
describe('User Management Tests', () => {
  before(() => {
    // Insert test user before running tests
    const testUser = {
      Name: 'Test User',
      Email: 'testuser@example.com',
      Role: 'User',
      Status: 'Active',
      CreatedDate: new Date().toISOString()
    };
    
    cy.dbInsert('Users', testUser);
  });
  
  it('should display user in the list', () => {
    cy.visit('/users');
    cy.contains('testuser@example.com').should('be.visible');
  });
  
  after(() => {
    // Clean up test data
    cy.dbDelete('Users', "Email = 'testuser@example.com'");
  });
});
```

### Example 3: Data-Driven Testing
```typescript
it('should validate multiple users from database', () => {
  cy.dbQuery('SELECT * FROM Users WHERE Status = "Active" LIMIT 5').then((users) => {
    users.forEach((user) => {
      cy.visit(`/profile/${user.UserId}`);
      cy.get('.profile-name').should('have.text', user.Name);
      cy.get('.profile-email').should('have.text', user.Email);
    });
  });
});
```

### Example 4: Execute Complex Query with JOIN
```typescript
it('should validate order details with customer information', () => {
  const query = `
    SELECT o.OrderId, o.TotalAmount, c.CustomerName, c.Email
    FROM Orders o
    INNER JOIN Customers c ON o.CustomerId = c.CustomerId
    WHERE o.OrderId = 12345
  `;
  
  cy.dbQuery(query).then((results) => {
    expect(results).to.have.length(1);
    expect(results[0].CustomerName).to.equal('John Doe');
  });
});
```

## 🔒 Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use environment-specific credentials** - Create `.env.staging`, `.env.production` as needed
3. **Limit database user permissions** - Use a read-only user for validation tests
4. **Use parameterized queries** - Avoid SQL injection (already implemented in helpers)
5. **Rotate credentials regularly** - Update credentials periodically

## 🐛 Troubleshooting

### Connection Issues
```typescript
// Test database connection
cy.dbQuery('SELECT 1 AS Test').then((result) => {
  cy.log('Database connected successfully!');
});
```

### Common Errors

**Error: Login failed for user**
- Verify credentials in `.env` file
- Check if user has access to the database
- Ensure firewall rules allow your IP address

**Error: Failed to connect to server**
- Verify server name is correct (should include `.database.windows.net`)
- Check if `encrypt: true` is set for Azure SQL
- Ensure server is running

**Error: Invalid object name 'TableName'**
- Verify table exists in the database
- Check if user has SELECT permissions on the table
- Ensure correct database is specified in `.env`

## 📚 Additional Resources

- [Azure SQL Database Documentation](https://docs.microsoft.com/en-us/azure/azure-sql/)
- [MSSQL Node.js Driver](https://www.npmjs.com/package/mssql)
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

## 🎯 Next Steps

1. Update `.env` file with your Azure SQL Server credentials
2. Test the connection: `npm run test:db`
3. Modify `DBValidation.cy.ts` with your actual database tables
4. Create additional test files as needed

---

**Setup Complete!** 🚀 Your Cypress framework is now ready for Azure SQL Server database testing.
