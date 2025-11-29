describe('POST API Validation', () => {
    it.skip('should successfully create a new resource', () => {
        const requestBody = {
            "name": "Learning Cypress with Rahul Shetty",
            "isbn": "koz",
            "aisle": "347",//skippping it as it requires unique value in each run
            "author": "Saurav Kumar"
        };
        
        const expectedID = requestBody.isbn + requestBody.aisle; // Dynamic ID: koz347
        
        cy.request({
            method: 'POST',
            url: 'http://216.10.245.166/Library/Addbook.php',
            body: requestBody
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('ID');
            expect(response.body.Msg).to.eq('successfully added');
            expect(response.body.ID).to.eq(expectedID);
            cy.log(`Book added with ID: ${response.body.ID}`);
        });
    });

});