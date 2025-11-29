import selectors from '../support/pageObjects/selectors.json'

describe('My First Test Suite', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/data/products.json').as('productAPI')
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
    })

    it('@smoke My First Test Case', () => {
        cy.wait('@productAPI').then(({ response }) => {
            if (response) {
                expect(response.statusCode).to.equal(200)
                expect(response.body[0].name).to.equal('Brocolli - 1 Kg')
            }
        })
    })

    it('My Second Test Case', () => {
        cy.get(selectors.searchInput).type('ca')
        cy.get(selectors.productsWrapper).should('have.length', 4)
    })

    it('My Third Test Case', () => {
        cy.get(selectors.searchInput).type('ca')
        cy.get(selectors.productVisible).should('have.length', 4)
        cy.contains(selectors.productName, 'Carrot')
            .parents('.product')
            .find('button')
            .click()
    })

    it('My Fourth Test Case', () => {
        cy.get(selectors.searchInput).type('ca')
        cy.get(selectors.productVisible).should('have.length', 4)
        cy.get(selectors.productsWrapper).each(($el, index, $list) => {
            const productName = $el.find(selectors.productName).text()
            if(productName.includes('Carrot')){
                cy.wrap($el).find(selectors.productAction).click()
            }
        })
    })

    it('My Fifth Test Case', () => { 
        cy.get(selectors.brandLogo).should('have.text', 'GREENKART')
    })

    it('@smoke My Sixth Test Case', () => { 
        cy.get(selectors.searchInput).type('Berry')
        cy.contains(selectors.productName, 'Strawberry')
            .parents('.product')
            .find(selectors.productAction)
            .click()    
        cy.get(selectors.cartIcon).click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        cy.get(selectors.countryDropdown).select('India')
        cy.get(selectors.termsCheckbox).check()
        cy.contains('Proceed').click()
        cy.get(selectors.successMessage).should('have.text', 'Thank you, your order has been placed successfully  You\'ll be redirected to Home page shortly!!')
    })    
})