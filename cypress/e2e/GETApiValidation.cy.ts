describe('API Validation', () => {
// Modify API Response and Request as per own need

    it('Modify API response and sending my own response on UI', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', '**/GetBook.php?AuthorName=shetty', {
            statusCode: 200,
            body: [
                {
                    "book_name": "RestAssured with Java",
                    "isbn": "LSA",
                    "aisle": "2303"
                }
            ]
        }).as('libraryAPI');

        cy.get('.btn.btn-primary').click()
        cy.wait('@libraryAPI').then(({ response }) => {
            expect(response?.statusCode).to.equal(200);
            expect(response?.body[0].book_name).to.equal('RestAssured with Java');
            expect(response?.body[0].isbn).to.equal('LSA');
            cy.log(response?.body.length.toString());
            cy.get('table.table-dark tbody tr').should('have.length', response?.body.length.toString());
        })
        cy.get('app-library-dashboard p').should('have.text', 'Oops only 1 Book available')
    })

    it('Simulate API server error (500)', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', '**/GetBook.php?AuthorName=shetty', {
            statusCode: 500,
            body: {
                error: 'Internal Server Error'
            }
        }).as('libraryAPI');

        cy.get('.btn.btn-primary').click()
        cy.wait('@libraryAPI').then(({ response }) => {
            expect(response?.statusCode).to.equal(500);
            cy.log('API returned 500 error as expected');
        })
    })

    it('Simulate API network failure', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', '**/GetBook.php?AuthorName=shetty', {
            forceNetworkError: true
        }).as('libraryAPI');

        cy.get('.btn.btn-primary').click()
        cy.wait('@libraryAPI').then(({ error }) => {
            expect(error).to.exist;
            cy.log('Network error simulated successfully');
        })
    })

    it('Simulate API timeout (404)', () => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
        cy.intercept('GET', '**/GetBook.php?AuthorName=shetty', {
            statusCode: 404,
            body: {
                error: 'Not Found'
            }
        }).as('libraryAPI');

        cy.get('.btn.btn-primary').click()
        cy.wait('@libraryAPI').then(({ response }) => {
            expect(response?.statusCode).to.equal(404);
            cy.log('API returned 404 error');
        })
    })

    it('Modify request URL and continue with modified URL',  () => {

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

                req.continue((res) => {
                    expect(res.statusCode).to.equal(403)
                })
            }
        ).as("dummyUrl")

        cy.get("button[class='btn btn-primary']").click()
        cy.wait('@dummyUrl')

    })
})