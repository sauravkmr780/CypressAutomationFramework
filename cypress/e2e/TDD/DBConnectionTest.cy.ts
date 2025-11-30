describe.skip('Database Connection Test', () => {
    //skipping all test cases as credential are in .env file which don't want to setup in public repo
  it('should connect to Azure SQL Server successfully', () => {
    cy.dbQuery('SELECT 1 AS TestConnection').then((results) => {
      expect(results).to.be.an('array');
      expect(results).to.have.length(1);
      expect(results[0].TestConnection).to.equal(1);
      cy.log('✅ Database connection successful!');
    });
  });

  it('should retrieve database version', () => {
    cy.dbQuery('SELECT @@VERSION AS Version').then((results) => {
      expect(results).to.be.an('array');
      expect(results[0]).to.have.property('Version');
      cy.log('Database Version:', results[0].Version);
    });
  });

  it('should get current database name', () => {
    cy.dbQuery('SELECT DB_NAME() AS DatabaseName').then((results) => {
      expect(results).to.be.an('array');
      expect(results[0]).to.have.property('DatabaseName');
      cy.log('Connected to Database:', results[0].DatabaseName);
    });
  });

  it('should list available tables', () => {
    const query = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;
    
    cy.dbQuery(query).then((results) => {
      expect(results).to.be.an('array');
      cy.log(`Found ${results.length} tables in the database`);
      results.forEach((table: any) => {
        cy.log(`- ${table.TABLE_NAME}`);
      });
    });
  });

});
