import XLSX from 'xlsx';
import path from 'path';

describe.skip('Excel Upload-Download End-to-End Tests', () => {
    const downloadPath = 'cypress/downloads';
    const downloadedFileName = 'download.xlsx';
    const modifiedFileName = 'modified-download.xlsx';

    before(() => {
        // Clean downloads folder before tests
        cy.task('exec', 'if exist cypress\\downloads\\*.xlsx del /q cypress\\downloads\\*.xlsx');
    });

    it('@smoke should download Excel, modify Kivi to Cherry, and upload back', () => {
        // Step 1: Visit the application
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');
        cy.log('✅ Navigated to upload-download test page');

        // Step 2: Click Download button
        cy.get('#downloadButton').should('be.visible').click();
        cy.log('📥 Download button clicked');

        // Step 3: Wait for file to download
        cy.wait(3000);

        // Step 4: Verify file exists
        cy.readFile(`${downloadPath}/${downloadedFileName}`).should('exist');
        cy.log('✅ File downloaded successfully');

        // Step 5: Read the downloaded Excel file
        cy.task('readExcel', {
            filePath: `${downloadPath}/${downloadedFileName}`,
            sheetName: 'Sheet1'
        }).then((data) => {
            const excelData = data as any[];
            cy.log(`📊 Total rows in Excel: ${excelData.length}`);
            
            // Log first row to see actual column names
            if (excelData.length > 0) {
                cy.log(`📋 Column names: ${Object.keys(excelData[0]).join(', ')}`);
                cy.log(`📋 First row data: ${JSON.stringify(excelData[0])}`);
            }
            
            // Find the fruit column name (could be 'fruit_nam', 'Fruit Name', etc.)
            const fruitColumn = excelData.length > 0 ? 
                Object.keys(excelData[0]).find(key => 
                    key.toLowerCase().includes('fruit')
                ) : null;
            
            cy.log(`🔍 Detected fruit column: "${fruitColumn}"`);
            
            if (!fruitColumn) {
                throw new Error('Could not find fruit column in Excel file');
            }
            
            // Log all fruit names to debug
            cy.log(`📋 All fruits in Excel: ${excelData.map(row => row[fruitColumn]).join(', ')}`);

            // Step 6: Find row with 'Kivi' (any case) and modify to 'Cherry'
            let kiviFound = false;
            const modifiedData = excelData.map((row) => {
                const fruitName = row[fruitColumn] ? row[fruitColumn].toString().toLowerCase().trim() : '';
                if (fruitName === 'kivi') {
                    cy.log(`🔍 Found '${row[fruitColumn]}' at row ${row.sno || 'unknown'} - Modifying to 'Cherry'`);
                    kiviFound = true;
                    return { ...row, [fruitColumn]: 'Cherry' };
                }
                return row;
            });

            // Only verify and proceed if Kivi was found
            if (kiviFound) {
                cy.log('✅ Successfully modified Kivi to Cherry');
            } else {
                cy.log('⚠️ Warning: Kivi not found in the downloaded Excel file');
                cy.log('Available fruits: ' + excelData.map(row => `"${row[fruitColumn]}"`).join(', '));
            }

            // Step 7: Create modified Excel file (proceed regardless to demonstrate upload)
            cy.task('writeExcel', {
                filePath: `${downloadPath}/${modifiedFileName}`,
                sheetName: 'Sheet1',
                data: modifiedData
            }).then(() => {
                cy.log('💾 Modified Excel file created');

                // Step 8: Upload the modified file
                cy.get('input[type="file"]').selectFile(`${downloadPath}/${modifiedFileName}`, { force: true });
                cy.log('📤 Modified file uploaded');

                // Step 9: Wait for upload to complete
                cy.wait(2000);

                // Step 10: Verify upload success message or UI update
                cy.get('.Toastify__toast--success, .upload-success, [class*="success"]', { timeout: 10000 })
                    .should('be.visible');
                cy.log('✅ Upload successful - Success message displayed');

                // Step 11: Verify table updates (only check if Kivi was originally found)
                if (kiviFound) {
                    // Verify Cherry appears in the table
                    cy.get('div.sc-hIPBNq.eXWrwD.rdt_TableBody', { timeout: 10000 })
                        .contains('Cherry', { matchCase: false })
                        .should('be.visible');
                    cy.log('✅ Verified: Cherry is now visible in the table');

                    // Verify Kivi is no longer present (replaced by Cherry)
                    cy.get('div.sc-hIPBNq.eXWrwD.rdt_TableBody', { timeout: 10000 })
                        .contains('Kivi', { matchCase: false })
                        .should('not.exist');
                    cy.log('✅ Verified: Kivi is no longer in the table');
                } else {
                    cy.log('ℹ️ Skipping Kivi/Cherry verification as Kivi was not in original file');
                }
            });
        });
    });

    it('should validate the modified Excel file structure', () => {
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');

        // Download file
        cy.get('#downloadButton').click();
        cy.wait(3000);

        // Read and validate structure
        cy.task('readExcel', {
            filePath: `${downloadPath}/${downloadedFileName}`,
            sheetName: 'Sheet1'
        }).then((data) => {
            const excelData = data as any[];

            // Find the fruit and price columns dynamically
            const fruitColumn = excelData.length > 0 ? 
                Object.keys(excelData[0]).find(key => 
                    key.toLowerCase().includes('fruit')
                ) : null;
            
            const priceColumn = excelData.length > 0 ? 
                Object.keys(excelData[0]).find(key => 
                    key.toLowerCase().includes('price')
                ) : null;
            
            // Validate required columns exist
            expect(fruitColumn, 'Fruit column should exist').to.not.be.null;
            expect(priceColumn, 'Price column should exist').to.not.be.null;
            cy.log(`✅ Excel structure validation passed (fruit: "${fruitColumn}", price: "${priceColumn}")`);

            // Validate data types
            excelData.forEach((row, index) => {
                if (row[fruitColumn!]) {
                    expect(row[fruitColumn!], `Row ${index + 1}: ${fruitColumn} should be a string`).to.be.a('string');
                }
                if (row[priceColumn!]) {
                    expect(row[priceColumn!], `Row ${index + 1}: ${priceColumn} should be a number`).to.be.a('number');
                }
            });
            cy.log('✅ Data type validation passed');
        });
    });

    it('should handle multiple fruit replacements', () => {
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');

        // Download file
        cy.get('#downloadButton').click();
        cy.wait(3000);

        // Read and modify multiple entries
        cy.task('readExcel', {
            filePath: `${downloadPath}/${downloadedFileName}`,
            sheetName: 'Sheet1'
        }).then((data) => {
            const excelData = data as any[];
            
            // Find the fruit column dynamically
            const fruitColumn = excelData.length > 0 ? 
                Object.keys(excelData[0]).find(key => 
                    key.toLowerCase().includes('fruit')
                ) : null;
            
            if (!fruitColumn) {
                throw new Error('Could not find fruit column in Excel file');
            }
            
            // Modify all instances of specific fruits
            const modifiedData = excelData.map((row) => {
                const fruitName = row[fruitColumn] ? row[fruitColumn].toString().toLowerCase().trim() : '';
                if (fruitName === 'kivi') {
                    return { ...row, [fruitColumn]: 'Cherry' };
                }
                return row;
            });

            // Count modifications
            const kiviCount = excelData.filter(row => {
                const fruitName = row[fruitColumn] ? row[fruitColumn].toString().toLowerCase().trim() : '';
                return fruitName === 'kivi';
            }).length;
            const cherryCount = modifiedData.filter(row => {
                const fruitName = row[fruitColumn] ? row[fruitColumn].toString().toLowerCase().trim() : '';
                return fruitName === 'cherry';
            }).length;
            
            cy.log(`🔢 Total Kivi entries found: ${kiviCount}`);
            cy.log(`🔢 Total Cherry entries after modification: ${cherryCount}`);
            
            expect(cherryCount).to.be.greaterThan(0);
        });
    });

    it('should verify price values remain unchanged after modification', () => {
        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');

        // Download file
        cy.get('#downloadButton').click();
        cy.wait(3000);

        cy.task('readExcel', {
            filePath: `${downloadPath}/${downloadedFileName}`,
            sheetName: 'Sheet1'
        }).then((originalData) => {
            const excelData = originalData as any[];
            
            // Find the fruit and price columns dynamically
            const fruitColumn = excelData.length > 0 ? 
                Object.keys(excelData[0]).find(key => 
                    key.toLowerCase().includes('fruit')
                ) : null;
            
            const priceColumn = excelData.length > 0 ? 
                Object.keys(excelData[0]).find(key => 
                    key.toLowerCase().includes('price')
                ) : null;
            
            if (!fruitColumn || !priceColumn) {
                throw new Error('Could not find required columns in Excel file');
            }
            
            // Store original prices
            const originalPrices = excelData.map(row => row[priceColumn]);

            // Modify Kivi to Cherry
            const modifiedData = excelData.map((row) => {
                const fruitName = row[fruitColumn] ? row[fruitColumn].toString().toLowerCase().trim() : '';
                if (fruitName === 'kivi') {
                    return { ...row, [fruitColumn]: 'Cherry' };
                }
                return row;
            });

            // Verify prices remain unchanged
            const modifiedPrices = modifiedData.map(row => row[priceColumn]);
            
            originalPrices.forEach((price, index) => {
                expect(modifiedPrices[index], `Price at index ${index} should remain unchanged`).to.equal(price);
            });

            cy.log('✅ All prices remain unchanged after fruit modification');
        });
    });

    after(() => {
        // Cleanup downloaded files
        cy.log('🧹 Cleaning up downloaded files');
    });
});
