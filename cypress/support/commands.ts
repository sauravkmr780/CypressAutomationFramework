// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import selectors from './pageObjects/selectors.json'
import products from './pageObjects/products.json'

declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command types here
      // Example: login(email: string, password: string): Chainable<void>
      selectDate(day: number, month: string, year: number): Chainable<void>
      loginToShop(username: string, password: string, role: string, roleValue: string): Chainable<void>
    }
  }
}

// Custom command to select date in React date picker
Cypress.Commands.add('selectDate', (day: number, month: string, year: number) => {
    const monthMap: { [key: string]: string } = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
    }
    
    // Open calendar
    cy.get(selectors.datePickerCalendarBtn).click()
    
    // Navigate to year view
    cy.get(selectors.datePickerNavLabel).click()
    
    // Get current year and navigate to target year
    cy.get(selectors.datePickerNavLabel).invoke('text').then((currentYearText) => {
        const currentYear = parseInt(currentYearText.trim())
        const yearDiff = year - currentYear
        
        if (yearDiff > 0) {
            for (let i = 0; i < yearDiff; i++) {
                cy.get(selectors.datePickerNextBtn).click()
            }
        } else if (yearDiff < 0) {
            for (let i = 0; i < Math.abs(yearDiff); i++) {
                cy.get(selectors.datePickerPrevBtn).click()
            }
        }
    })
    
    // Select month
    cy.contains(selectors.datePickerMonths, month.substring(0, 3)).click()
    
    // Select day
    cy.get(selectors.datePickerDays)
        .not(selectors.datePickerDaysNotNeighbor)
        .contains('abbr', day.toString())
        .click()
    
    // Verify selected date
    cy.get(selectors.dateInputMonth).should('have.value', monthMap[month])
    cy.get(selectors.dateInputDay).should('have.value', day.toString())
    cy.get(selectors.dateInputYear).should('have.value', year.toString())
})

// Custom command to login to e-commerce shop
Cypress.Commands.add('loginToShop', (username: string, password: string, role: string, roleValue: string) => {
    cy.get(products.username, { timeout: 10000 }).should('be.visible').type(username).should('have.value', username)
    cy.get(products.password).should('be.visible').type(password).should('have.value', password)
    cy.get(products.roleDropdown).should('be.visible').select(role).should('have.value', roleValue)
    cy.get(products.termsCheckbox).check().should('be.checked')
    cy.get(products.signInBtn).click()
})

export {}