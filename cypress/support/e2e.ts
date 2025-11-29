// support/e2e.ts
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'

// Import cypress-mochawesome-reporter for test reporting
import 'cypress-mochawesome-reporter/register'

// Import Allure reporter
import '@mmisty/cypress-allure-adapter/support';

// Tag-based test filtering
beforeEach(function () {
  const grep = Cypress.env('grep')
  if (grep) {
    const testTitle = this.currentTest?.title
    if (testTitle && !testTitle.includes(grep)) {
      this.skip()
    }
  }
})