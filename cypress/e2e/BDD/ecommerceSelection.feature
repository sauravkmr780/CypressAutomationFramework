Feature: Ecommerce Product Selection Validation

@smoke
Scenario: User selects and purchases specific products
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit
Then select the country , submit and verify Thank You

@regression
Scenario: Verify multiple product selection
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit
