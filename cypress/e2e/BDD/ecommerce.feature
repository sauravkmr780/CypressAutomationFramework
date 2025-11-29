Feature: End to End Ecommerce Application Validation
@smoke
Scenario: Ecommerce product delivery
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit
Then select the country , submit and verify Thank You


@regression
Scenario: Verify cart total calculation
Given I am on Ecommerce Page
When I login to the application
And I add items to cart and checkout
And Validate the total price limit