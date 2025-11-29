import testdata from '../../fixtures/example.json'
import products from '../../support/pageObjects/products.json'

describe('End to End E-commerce Flow Test Suite', () => {

    it('Validate e-commerce page e2e flow', () => {
        // Login
        cy.visit(Cypress.env('url') + '/loginpagePractise/#')
        cy.loginToShop(testdata.username, testdata.password, testdata.role, testdata.roleValue)
        
        // Verify navigation to shop page
        cy.url().should('include', 'shop')
        cy.get(products.productName, { timeout: 10000 }).should('have.length', 4)
        
        // Add products to cart
        cy.get(products.productName).each(($el, index, $list) => {
            const productName = $el.text()
            if(testdata.products.some(product => productName.includes(product))){
                cy.wrap($el).parents(products.productCard).find(products.productButton).should('be.visible').click()
            }
        })
        
        // Navigate to checkout
        cy.contains('Checkout').click()
        
        // Calculate and verify total price
        cy.get(products.cartTable, { timeout: 10000 }).should('be.visible')
        
        let totalPrice = 0
        cy.get(products.cartPrice).each(($priceElement) => {
            const priceText = $priceElement.text().trim()
            const price = parseInt(priceText.replace(/[^\d]/g, ''))
            totalPrice += price
            cy.log(`Individual Price: ₹${price}`)
        }).then(() => {
            cy.log(`Calculated Total: ₹${totalPrice}`)
            
            // Verify calculated total matches displayed total
            cy.get(products.totalAmount).should('be.visible').invoke('text').then((displayedTotal) => {
                const expectedTotal = parseInt(displayedTotal.trim().replace(/[^\d]/g, ''))
                cy.log(`Expected Total: ₹${expectedTotal}`)
                expect(totalPrice).to.equal(expectedTotal, 'Sum of individual prices should match the total')
            })
        })
        
        // Proceed to final checkout
        cy.get(products.cartCheckoutButton).should('be.visible').click()
        
        // Select country from dropdown
        cy.get(products.countryInput, { timeout: 8000 }).should('be.visible').type(testdata.country)
        cy.get(products.countryDropdown, { timeout: 8000 }).should('be.visible')
        cy.get(products.countryDropdown).each(($el, index, $list) => {
            if ($el.text() === testdata.countryName) {
                cy.wrap($el).click()
                return false
            }
        })
        
        // Accept terms and complete purchase
        cy.get(products.agreementCheckbox).check({ force: true }).should('be.checked')
        cy.contains(testdata.purchaseButton).should('be.visible').click()
        
        // Verify success message
        cy.get(products.successMessage, { timeout: 8000 })
            .should('be.visible')
            .and('contain.text', testdata.successMessage)
})
})    