const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    specPattern: 'cypress/e2e/CAC-TAT.cy.js'
  },
})
