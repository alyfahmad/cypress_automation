const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.specPattern = [
        'cypress/e2e/LoginModule.cy.js',
        'cypress/e2e/PIMModule.cy.js',
        'cypress/e2e/TimeModule.cy.js',
        'cypress/e2e/DataCleanup.cy.js'
      ]
    },
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080
  },
});
