describe.skip('Employees Database Tests - Azure SQL', () => {
    //skipping all test cases as credential are in .env file which don't want to setup in public repo
  it('should connect to PracticeDBSetup database', () => {
    cy.dbQuery('SELECT DB_NAME() AS DatabaseName').then((results) => {
      expect(results).to.be.an('array');
      expect(results[0].DatabaseName).to.equal('PracticeDBSetup');
      cy.log('✅ Connected to Database:', results[0].DatabaseName);
    });
  });

  it('should retrieve all employees from Employees table', () => {
    cy.dbQuery('SELECT * FROM Employees').then((results) => {
      expect(results).to.be.an('array');
      cy.log(`Found ${results.length} employees in the database`);
      
      results.forEach((employee: any) => {
        cy.log(`Employee: ${employee.FullName} - ${employee.Department} - $${employee.Salary}`);
      });
    });
  });

  it('should verify Saurav Kumar employee record', () => {
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Saurav Kumar'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].Department).to.equal('QA Automation');
      expect(results[0].Salary).to.equal(82000.00);
      cy.log('✅ Saurav Kumar record verified');
    });
  });

  it('should verify Priyanka Singh employee record', () => {
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Priyanka Singh'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].Department).to.equal('IAM Security');
      expect(results[0].Salary).to.equal(98000.00);
      cy.log('✅ Priyanka Singh record verified');
    });
  });

  it('should verify Anil Verma employee record', () => {
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Anil Verma'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].Department).to.equal('Development');
      expect(results[0].Salary).to.equal(105000.00);
      cy.log('✅ Anil Verma record verified');
    });
  });

  it('should count total employees', () => {
    cy.dbQuery('SELECT COUNT(*) AS TotalEmployees FROM Employees').then((results) => {
      expect(results[0].TotalEmployees).to.equal(3);
      cy.log(`Total Employees: ${results[0].TotalEmployees}`);
    });
  });

  it('should get employees by department - QA Automation', () => {
    cy.dbQuery("SELECT * FROM Employees WHERE Department = 'QA Automation'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].FullName).to.equal('Saurav Kumar');
    });
  });

  it('should get average salary', () => {
    cy.dbQuery('SELECT AVG(Salary) AS AvgSalary FROM Employees').then((results) => {
      expect(results[0].AvgSalary).to.be.greaterThan(0);
      cy.log(`Average Salary: $${results[0].AvgSalary}`);
    });
  });

  it('should get highest paid employee', () => {
    cy.dbQuery('SELECT TOP 1 * FROM Employees ORDER BY Salary DESC').then((results) => {
      expect(results[0].FullName).to.equal('Anil Verma');
      expect(results[0].Salary).to.equal(105000.00);
      cy.log(`Highest Paid: ${results[0].FullName} - $${results[0].Salary}`);
    });
  });

  it('should insert a new employee and verify', () => {
    const newEmployee = {
      FullName: 'Test Employee',
      Department: 'Testing',
      Salary: 75000.00
    };

    cy.dbInsert('Employees', newEmployee);

    // Verify insertion
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Test Employee'").then((results) => {
      expect(results).to.have.length(1);
      expect(results[0].Department).to.equal('Testing');
      expect(results[0].Salary).to.equal(75000.00);
      cy.log('✅ New employee inserted successfully');
    });
  });

  it('should update employee salary', () => {
    cy.dbUpdate('Employees', { Salary: 80000.00 }, "FullName = 'Test Employee'");

    // Verify update
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Test Employee'").then((results) => {
      expect(results[0].Salary).to.equal(80000.00);
      cy.log('✅ Salary updated successfully');
    });
  });

  it('should delete test employee and verify', () => {
    cy.dbDelete('Employees', "FullName = 'Test Employee'");

    // Verify deletion
    cy.dbQuery("SELECT * FROM Employees WHERE FullName = 'Test Employee'").then((results) => {
      expect(results).to.have.length(0);
      cy.log('✅ Test employee deleted successfully');
    });
  });

  it('should verify only original 3 employees remain', () => {
    cy.dbQuery('SELECT COUNT(*) AS TotalEmployees FROM Employees').then((results) => {
      expect(results[0].TotalEmployees).to.equal(3);
      cy.log('✅ Database cleaned up - 3 employees remain');
    });
  });

});
