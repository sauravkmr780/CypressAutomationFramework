import Papa from "papaparse";
describe('Login API Tests', () => {
    it.skip('should successfully login and complete e-commerce flow', () => {
        //skipping it download folder does not exist on github due to .gitignore has hences test fails but it works in local
        const ProductToPurchase = 'ADIDAS ORIGINAL'
        cy.loginAPI().then(() => {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: (window) => {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
            cy.log('Login successful, token received: ' + Cypress.env('token'))
        })

        // Wait for products to load and add to cart
        cy.get('.card-body h5 b', { timeout: 10000 }).should('be.visible')
        cy.intercept('POST', '**/user/add-to-cart').as('addToCartAPI')

        cy.get('.card-body').each(($el, index, $list) => {
            const productName = $el.find('h5 b').text()
            if (productName.includes(ProductToPurchase)) {
                cy.wrap($el).find('button.btn.w-10.rounded').click()
                return false
            }
        })

        cy.wait('@addToCartAPI').then(({ response }) => {
            expect(response?.statusCode).to.equal(200)
        })

        // Navigate to cart and checkout
        cy.get(".btn.btn-custom[routerlink='/dashboard/cart']", { timeout: 5000 }).click({ force: true })
        cy.get("li[class='totalRow'] button[type='button']", { timeout: 5000 }).should('be.visible').click()

        // Select country
        cy.get("input[placeholder='Select Country']", { timeout: 5000 }).should('be.visible').type('Ind')
        cy.get('.ta-results.list-group.ng-star-inserted button', { timeout: 5000 }).should('be.visible')
        cy.get('.ta-results.list-group.ng-star-inserted button').each(($el, index, $list) => {
            if ($el.text().trim() === 'India') {
                cy.wrap($el).click()
                return false
            }
        })

        // Submit order
        cy.intercept('POST', '**/order/create-order').as('submitOrderAPI')
        cy.get('.btnn.action__submit.ng-star-inserted').click()
        cy.wait('@submitOrderAPI').then(({ response }) => {
            expect(response?.statusCode).to.equal(201)
            cy.log('Order created successfully')
        })

        // Verify success message
        cy.get('.hero-primary', { timeout: 10000 }).should('contain.text', 'Thankyou for the order')

        // Download CSV file
        cy.get('.btn.btn-primary.mt-3.mb-3').should('be.visible').click()

        // Wait for file to download and verify it exists
        const downloadsFolder = Cypress.config('downloadsFolder')
        cy.wait(3000) // Wait for download to complete
        cy.readFile(`${downloadsFolder}/order-invoice_sauravkmr780.csv`, { timeout: 15000 }).should('exist')
        cy.log('CSV file downloaded successfully to: ' + downloadsFolder)
        cy.readFile(`${downloadsFolder}/order-invoice_sauravkmr780.csv`).then((csvContent) => {
            const parsed = Papa.parse(csvContent, {
                header: true,
                skipEmptyLines: true,
            });

            cy.log(JSON.stringify(parsed.data)); 
            
            // Get first product and log specific details
            const product = parsed.data[0] as any;
            cy.log(`Product Name: ${product['Product Name']}`);
            cy.log(`Product Price: ${product['Product Price']}`);
            cy.log(`Product Description: ${product['Product Description']}`);
            
            // Verify product name matches
            expect(product['Product Name']).to.include(ProductToPurchase);
            expect(JSON.stringify(parsed.data)).to.include(ProductToPurchase);
            expect(product['Product Name']).to.equal(ProductToPurchase);

        });
    });
}); 