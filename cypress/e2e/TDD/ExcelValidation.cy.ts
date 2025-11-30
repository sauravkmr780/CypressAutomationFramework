describe('Excel File Validation Tests', () => {
    const excelFilePath = 'cypress/fixtures/employees.xlsx';

    it('should read and validate Employees sheet data', () => {
        cy.task('readExcel', {
            filePath: excelFilePath,
            sheetName: 'Employees'
        }).then((employees) => {
            const employeesData = employees as any[];
            // Log the data
            cy.log(`Total Employees: ${employeesData.length}`);
            cy.log(JSON.stringify(employeesData, null, 2));

            // Validate total count
            expect(employeesData).to.have.length(5);

            // Validate first employee
            expect(employeesData[0]).to.deep.include({
                EmployeeID: 1,
                FullName: 'Saurav Kumar',
                Department: 'QA Automation',
                Salary: 82000
            });

            // Validate all employees have required fields
            employeesData.forEach((employee) => {
                expect(employee).to.have.all.keys('EmployeeID', 'FullName', 'Department', 'Salary', 'JoinDate');
                expect(employee.FullName).to.be.a('string').and.not.be.empty;
                expect(employee.Salary).to.be.a('number').and.be.greaterThan(0);
            });

            // Validate salary ranges
            const salaries = employeesData.map(emp => emp.Salary);
            const minSalary = Math.min(...salaries);
            const maxSalary = Math.max(...salaries);
            cy.log(`Salary Range: ${minSalary} - ${maxSalary}`);
            expect(minSalary).to.be.greaterThan(60000);
            expect(maxSalary).to.be.lessThan(120000);
        });
    });

    it('should read and validate Products sheet data', () => {
        cy.task('readExcel', {
            filePath: excelFilePath,
            sheetName: 'Products'
        }).then((products) => {
            const productsData = products as any[];
            cy.log(`Total Products: ${productsData.length}`);

            // Validate product count
            expect(productsData).to.have.length(4);

            // Validate product structure
            productsData.forEach((product) => {
                expect(product).to.have.all.keys('ProductID', 'ProductName', 'Category', 'Price', 'Stock');
                expect(product.ProductID).to.match(/^P\d{3}$/); // Format: P001, P002, etc.
                expect(product.Category).to.equal('Shoes');
                expect(product.Price).to.be.greaterThan(0);
                expect(product.Stock).to.be.greaterThan(0);
            });

            // Find specific product
            const adidasProduct = productsData.find(p => p.ProductName === 'ADIDAS ORIGINAL');
            expect(adidasProduct).to.exist;
            expect(adidasProduct.Price).to.equal(82000);
            expect(adidasProduct.Stock).to.equal(50);
        });
    });

    it('should read and validate TestData sheet', () => {
        cy.task('readExcel', {
            filePath: excelFilePath,
            sheetName: 'TestData'
        }).then((testData) => {
            const testDataArray = testData as any[];
            cy.log(`Total Test Cases: ${testDataArray.length}`);

            // Validate test data structure
            expect(testDataArray).to.have.length(3);

            testDataArray.forEach((test) => {
                expect(test).to.have.all.keys('TestCase', 'Username', 'Password', 'ExpectedResult');
                expect(test.TestCase).to.match(/^TC\d{3}$/);
                expect(test.Username).to.include('@');
                expect(test.ExpectedResult).to.be.oneOf(['Success', 'Failure']);
            });

            // Filter successful test cases
            const successCases = testDataArray.filter(t => t.ExpectedResult === 'Success');
            cy.log(`Success Test Cases: ${successCases.length}`);
            expect(successCases).to.have.length(2);
        });
    });

    it('should get all sheet names from Excel file', () => {
        cy.task('readExcelSheetNames', excelFilePath).then((sheetNames) => {
            const sheetNamesArray = sheetNames as string[];
            cy.log(`Sheet Names: ${sheetNamesArray.join(', ')}`);

            // Validate sheet names
            expect(sheetNamesArray).to.have.length(3);
            expect(sheetNamesArray).to.include.members(['Employees', 'Products', 'TestData']);
        });
    });

    it('should read all sheets at once', () => {
        cy.task('readExcelAllSheets', excelFilePath).then((allSheets) => {
            const allSheetsData = allSheets as any;
            cy.log('All Sheets Data:', JSON.stringify(Object.keys(allSheetsData)));

            // Validate all sheets are present
            expect(allSheetsData).to.have.all.keys('Employees', 'Products', 'TestData');

            // Validate each sheet has data
            expect(allSheetsData.Employees).to.have.length(5);
            expect(allSheetsData.Products).to.have.length(4);
            expect(allSheetsData.TestData).to.have.length(3);

            // Cross-validate data between sheets
            const totalEmployees = allSheetsData.Employees.length;
            const qaEmployees = allSheetsData.Employees.filter((e: any) => e.Department === 'QA Automation').length;
            cy.log(`QA Automation Employees: ${qaEmployees} out of ${totalEmployees}`);
            expect(qaEmployees).to.be.greaterThan(0);
        });
    });

    it('should filter and validate specific department employees', () => {
        cy.task('readExcel', {
            filePath: excelFilePath,
            sheetName: 'Employees'
        }).then((employees) => {
            const employeesData = employees as any[];
            // Filter QA Automation employees
            const qaEmployees = employeesData.filter(emp => emp.Department === 'QA Automation');
            cy.log(`QA Automation Employees: ${qaEmployees.length}`);

            expect(qaEmployees).to.have.length.greaterThan(0);

            // Validate QA employees
            qaEmployees.forEach((emp) => {
                expect(emp.Department).to.equal('QA Automation');
                cy.log(`${emp.FullName} - Salary: ${emp.Salary}`);
            });

            // Calculate average salary for QA team
            const avgSalary = qaEmployees.reduce((sum, emp) => sum + emp.Salary, 0) / qaEmployees.length;
            cy.log(`Average QA Salary: ${avgSalary}`);
            expect(avgSalary).to.be.greaterThan(70000);
        });
    });

    it('should compare Excel data with expected values', () => {
        cy.task('readExcel', {
            filePath: excelFilePath,
            sheetName: 'Products'
        }).then((products) => {
            const productsData = products as any[];
            // Expected product list
            const expectedProducts = ['ADIDAS ORIGINAL', 'NIKE REVOLUTION', 'PUMA SPORTS', 'REEBOK CLASSIC'];

            // Validate all expected products exist
            expectedProducts.forEach((expectedName) => {
                const product = productsData.find(p => p.ProductName === expectedName);
                expect(product, `Product ${expectedName} should exist`).to.exist;
                expect(product.Price).to.be.greaterThan(40000);
            });

            // Validate total inventory value
            const totalValue = productsData.reduce((sum, p) => sum + (p.Price * p.Stock), 0);
            cy.log(`Total Inventory Value: ${totalValue}`);
            expect(totalValue).to.be.greaterThan(1000000);
        });
    });

    it('@smoke should validate Excel file exists and is readable', () => {
        cy.task('readExcelSheetNames', excelFilePath).then((sheetNames) => {
            const sheetNamesArray = sheetNames as string[];
            expect(sheetNamesArray).to.be.an('array').and.not.be.empty;
            cy.log(`✅ Excel file is accessible with ${sheetNamesArray.length} sheets`);
        });
    });
});
