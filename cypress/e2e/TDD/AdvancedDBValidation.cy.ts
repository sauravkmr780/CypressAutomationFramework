describe.skip('User Login with Database Validation', () => {
  //skipping all test cases as credential are in .env file which don't want to setup in public repo
  it('should validate user login credentials against database', () => {
    // Get user credentials from database
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Saurav Kumar'").then((dbResults) => {
      const employee = dbResults[0];
      
      cy.log('Employee from DB:', employee.FullName);
      cy.log('Department:', employee.Department);
      cy.log('Salary:', employee.Salary);
      
      // Verify database record exists
      expect(employee).to.exist;
      expect(employee.FullName).to.equal('Saurav Kumar');
      expect(employee.Department).to.equal('QA Automation');
    });
  });

  it('should validate all employees are present in database', () => {
    const expectedEmployees = [
      { name: 'Saurav Kumar', dept: 'QA Automation', salary: 82000.00 },
      { name: 'Priyanka Singh', dept: 'IAM Security', salary: 98000.00 },
      { name: 'Anil Verma', dept: 'Development', salary: 105000.00 }
    ];

    cy.dbQuery('SELECT * FROM Employees ORDER BY EmployeeID').then((dbResults) => {
      expect(dbResults).to.have.length(expectedEmployees.length);
      
      dbResults.forEach((employee: any, index: number) => {
        expect(employee.FullName).to.equal(expectedEmployees[index].name);
        expect(employee.Department).to.equal(expectedEmployees[index].dept);
        expect(employee.Salary).to.equal(expectedEmployees[index].salary);
      });
    });
  });

  it('should get employee by department and validate salary', () => {
    cy.dbQuery("SELECT * FROM Employees WHERE Department = 'QA Automation'").then((results) => {
      expect(results).to.have.length(1);
      const qaEmployee = results[0];
      
      expect(qaEmployee.FullName).to.equal('Saurav Kumar');
      expect(qaEmployee.Salary).to.be.greaterThan(80000);
      expect(qaEmployee.Salary).to.be.lessThan(85000);
    });
  });

  it('should validate database statistics', () => {
    // Get total employees
    cy.dbQuery('SELECT COUNT(*) AS TotalEmployees FROM Employees').then((countResult) => {
      cy.log('Total Employees:', countResult[0].TotalEmployees);
      expect(countResult[0].TotalEmployees).to.equal(3);
    });

    // Get average salary
    cy.dbQuery('SELECT AVG(Salary) AS AvgSalary FROM Employees').then((avgResult) => {
      const avgSalary = avgResult[0].AvgSalary;
      cy.log('Average Salary:', avgSalary);
      expect(avgSalary).to.be.closeTo(95000, 5000); // Within 5000 of 95000
    });

    // Get highest salary
    cy.dbQuery('SELECT MAX(Salary) AS MaxSalary FROM Employees').then((maxResult) => {
      cy.log('Highest Salary:', maxResult[0].MaxSalary);
      expect(maxResult[0].MaxSalary).to.equal(105000.00);
    });

    // Get lowest salary
    cy.dbQuery('SELECT MIN(Salary) AS MinSalary FROM Employees').then((minResult) => {
      cy.log('Lowest Salary:', minResult[0].MinSalary);
      expect(minResult[0].MinSalary).to.equal(82000.00);
    });
  });

  it('should group employees by department', () => {
    const query = `
      SELECT Department, COUNT(*) AS EmpCount, AVG(Salary) AS AvgSalary
      FROM Employees
      GROUP BY Department
      ORDER BY Department
    `;

    cy.dbQuery(query).then((results) => {
      expect(results).to.have.length(3);
      
      results.forEach((dept: any) => {
        cy.log(`Department: ${dept.Department} - Employees: ${dept.EmpCount} - Avg Salary: ${dept.AvgSalary}`);
        expect(dept.EmpCount).to.equal(1);
      });
    });
  });

  it('should handle database transactions - insert, update, delete', () => {
    // Step 1: Insert a test employee
    const testEmployee = {
      FullName: 'Integration Test User',
      Department: 'QA Automation',
      Salary: 70000.00
    };

    cy.dbInsert('Employees', testEmployee);
    cy.log('✅ Test employee inserted');

    // Step 2: Verify insertion
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Integration Test User'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].Department).to.equal('QA Automation');
      expect(results[0].Salary).to.equal(70000.00);
      cy.log('✅ Insertion verified');
    });

    // Step 3: Update the employee
    cy.dbUpdate('Employees', { Salary: 72000.00 }, "FullName = 'Integration Test User'");
    cy.log('✅ Test employee updated');

    // Step 4: Verify update
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Integration Test User'").then((results) => {
      expect(results[0].Salary).to.equal(72000.00);
      cy.log('✅ Update verified');
    });

    // Step 5: Delete the test employee
    cy.dbDelete('Employees', "FullName = 'Integration Test User'");
    cy.log('✅ Test employee deleted');

    // Step 6: Verify deletion
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Integration Test User'").then((results) => {
      expect(results).to.have.length(0);
      cy.log('✅ Deletion verified');
    });

    // Step 7: Verify original count
    cy.dbQuery('SELECT COUNT(*) AS TotalEmployees FROM Employees').then((countResult) => {
      expect(countResult[0].TotalEmployees).to.equal(3);
      cy.log('✅ Database restored to original state');
    });
  });

  it('should search employees with LIKE operator', () => {
    // Search for employees with name containing 'Kumar'
    cy.dbQuery("SELECT * FROM Employees WHERE FullName LIKE '%Kumar%'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].FullName).to.equal('Saurav Kumar');
    });

    // Search for employees with name containing 'Singh' or 'Verma'
    cy.dbQuery("SELECT * FROM Employees WHERE FullName LIKE '%Singh%' OR FullName LIKE '%Verma%'").then((results) => {
      expect(results).to.have.length(2);
      const names = results.map((emp: any) => emp.FullName);
      expect(names).to.include('Priyanka Singh');
      expect(names).to.include('Anil Verma');
    });
  });

  it('should validate data types and formats', () => {
    cy.dbQuery('SELECT * FROM Employees WHERE EmployeeID = 1').then((results) => {
      const employee = results[0];
      
      // Validate data types
      expect(employee.EmployeeID).to.be.a('number');
      expect(employee.FullName).to.be.a('string');
      expect(employee.Department).to.be.a('string');
      expect(employee.Salary).to.be.a('number');
      
      // Validate string lengths
      expect(employee.FullName.length).to.be.greaterThan(0);
      expect(employee.Department.length).to.be.greaterThan(0);
      
      // Validate salary range
      expect(employee.Salary).to.be.greaterThan(0);
      expect(employee.Salary).to.be.lessThan(200000);
      
      cy.log('✅ All data types and formats validated');
    });
  });

});
