// Script to generate sample Excel files for testing
const XLSX = require('xlsx');
const path = require('path');

// Create sample employee data
const employeesData = [
  { EmployeeID: 1, FullName: 'Saurav Kumar', Department: 'QA Automation', Salary: 82000, JoinDate: '2025-11-29' },
  { EmployeeID: 2, FullName: 'Priyanka Singh', Department: 'IAM Security', Salary: 98000, JoinDate: '2025-11-29' },
  { EmployeeID: 3, FullName: 'Anil Verma', Department: 'Development', Salary: 105000, JoinDate: '2025-11-29' },
  { EmployeeID: 4, FullName: 'Rahul Sharma', Department: 'QA Automation', Salary: 75000, JoinDate: '2025-11-30' },
  { EmployeeID: 5, FullName: 'Sneha Patel', Department: 'HR', Salary: 65000, JoinDate: '2025-11-30' }
];

// Create products data
const productsData = [
  { ProductID: 'P001', ProductName: 'ADIDAS ORIGINAL', Category: 'Shoes', Price: 82000, Stock: 50 },
  { ProductID: 'P002', ProductName: 'NIKE REVOLUTION', Category: 'Shoes', Price: 65000, Stock: 30 },
  { ProductID: 'P003', ProductName: 'PUMA SPORTS', Category: 'Shoes', Price: 55000, Stock: 45 },
  { ProductID: 'P004', ProductName: 'REEBOK CLASSIC', Category: 'Shoes', Price: 48000, Stock: 60 }
];

// Create test data with validation rules
const testData = [
  { TestCase: 'TC001', Username: 'sauravkmr780@gmail.com', Password: '@1Infosys', ExpectedResult: 'Success' },
  { TestCase: 'TC002', Username: 'test@example.com', Password: 'Test@123', ExpectedResult: 'Success' },
  { TestCase: 'TC003', Username: 'invalid@test.com', Password: 'wrong', ExpectedResult: 'Failure' }
];

// Create workbook with multiple sheets
const workbook = XLSX.utils.book_new();

// Add Employees sheet
const employeesSheet = XLSX.utils.json_to_sheet(employeesData);
XLSX.utils.book_append_sheet(workbook, employeesSheet, 'Employees');

// Add Products sheet
const productsSheet = XLSX.utils.json_to_sheet(productsData);
XLSX.utils.book_append_sheet(workbook, productsSheet, 'Products');

// Add TestData sheet
const testDataSheet = XLSX.utils.json_to_sheet(testData);
XLSX.utils.book_append_sheet(workbook, testDataSheet, 'TestData');

// Save the file
const outputPath = path.join(__dirname, '../fixtures/employees.xlsx');
XLSX.writeFile(workbook, outputPath);

console.log('✅ Sample Excel file created successfully at:', outputPath);
console.log('📊 Contains 3 sheets: Employees, Products, TestData');
console.log('📝 Total records: Employees(5), Products(4), TestData(3)');
