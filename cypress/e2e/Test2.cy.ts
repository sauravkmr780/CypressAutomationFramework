import selectors from '../support/pageObjects/selectors.json'
import 'cypress-iframe'

describe('Automation Practice Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('should check and uncheck checkboxes', () => {
        // Working with checkboxes
        cy.get(selectors.checkBoxOption1).check().should('be.checked').and('have.value', 'option1').and('have.attr', 'type', 'checkbox')//check checkbox
        cy.get(selectors.checkBoxOption1).uncheck().should('not.be.checked')//Uncheck
        cy.get(selectors.checkboxes).check(['option2', 'option3'])// Multiple checkboxes
    })
    it('should select option from static dropdown', () => {
        // Working with Static Dropdowns
        cy.get(selectors.staticDropdown).select('Option2').should('have.value', 'option2')
    })
    it('should select country from dynamic dropdown', () => {
        // Working with Dynamic Dropdowns
        cy.get(selectors.autocomplete).type('Ind');
        cy.get(selectors.dynamicDropdownItems).each(($el, index, $list) => {
            if ($el.text() === 'India') {
                cy.wrap($el).click()
                return false
            }
        })
        cy.get(selectors.autocomplete).should('have.value', 'India')
    })
    it('should show and hide textbox', () => {
        // Working with Visibility of Elements
        cy.get(selectors.displayedText).should('be.visible')
        cy.get(selectors.hideTextboxBtn).click()
        cy.get(selectors.displayedText).should('not.be.visible')
        cy.get(selectors.showTextboxBtn).click()
        cy.get(selectors.displayedText).should('be.visible')
    })
    it('should select radio buttons', () => {
        // Working with Radio Buttons (it can be checked using check() or click())
        cy.get(selectors.radioButtons).check('radio2').should('be.checked')
        cy.get(selectors.radioOption3).click().should('be.checked')
    })    
    it('should handle alert and confirm dialogs', () => {
        // Working with Alerts
        const name = 'Saurav'
        const expectedAlertMsg = `Hello ${name}, share this practice page and share your knowledge`
        const expectedConfirmMsg = 'Hello , Are you sure you want to confirm?'

        // Handle Alert
        cy.get(selectors.nameInput).type(name)
        cy.get(selectors.alertBtn).click()
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal(expectedAlertMsg)
            return true // Click OK
        })

        // Handle Confirm - Accept (OK)
        cy.get(selectors.confirmBtn).click()
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal(expectedConfirmMsg)
            return true  // Click OK
        })

        // Handle Confirm - Dismiss (Cancel)
        cy.get(selectors.confirmBtn).click()
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal(expectedConfirmMsg)
            return false  // Click Cancel
        })
    })
    it('should handle switch tab or child windows', () => {
        // Working with switch tab or child window in same tab
        cy.get(selectors.openTabBtn)
            .invoke('removeAttr', 'target')
            .click()

        // Redirects to another domain
        cy.origin('https://www.qaclickacademy.com/', () => {
            cy.url().should('include', 'qaclickacademy')
            cy.get('li.nav-item a').contains('About us').click()
            cy.get('div[class="section-title mt-50"] h2').should('have.text', 'Welcome to QAClick Academy ')

        })
    })
    it('should handle web tables', () => {
    // Working with web tables
    cy.get(selectors.webTableRows).find(selectors.webTableProductName).each(($el, index, $list) => {
        const productName = $el.text()
        if (productName === 'Master Selenium Automation in simple Python Language') {
            cy.wrap($el).next().then((price) => {
                const productPrice = price.text()
                expect(productPrice).to.equal('25')
            })
            cy.wrap($el).prev().then((Instructor) => {
                const productInstructor = Instructor.text()
                expect(productInstructor).to.equal('Rahul Shetty')
            })
            return false // Exit the each loop
        }
    })   
    })    
    it('should handle Mouse hover', () => {
    // Working with mouse over
    cy.get(selectors.mouseHoverContent).invoke('show') // Force show the hidden div  
    cy.contains('Top').click()
    cy.url().should('include', 'top')
    })  
    it('should handle Switch Window', () => {
    // Working with opening new window
    cy.get(selectors.openTabBtn).invoke('attr', 'href').then((url) => {
        cy.log('URL is: ' + url)
        expect(url).to.be.a('string')
        cy.visit(url as string)
        cy.url().should('include', 'qaclickacademy')    
    })
    cy.origin('https://www.qaclickacademy.com/', () => {
        cy.contains('Blog').click()
    })
    })
    it('@smoke should handle iFrames', () => {
        // Working with iFrames
        cy.frameLoaded(selectors.coursesIframe)
        cy.iframe(selectors.coursesIframe)
            .contains(selectors.iframeMentorship).click()
        
        cy.iframe(selectors.coursesIframe)
            .find(selectors.iframePromoText)
            .should('contain.text', 'Get any 2 courses FREE with Platinum subscription')
    })
    it('@smoke should handle date picker', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
        
        // Select date: 12 November 2026
        cy.selectDate(12, 'November', 2026)
    })
})