const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  projectId: "eajssn",
  e2e: {
    pecPattern: 'cypress/e2e/*.cy.js'
  },
  
})
