const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  projectId: "eajssn",
  e2e: {
    pecPattern: 'cypress/e2e/*.cy.js'
  },
  
})

const allureWriter = require('@shelex/cypress-allure-plugin/writer');
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
  projectId: 'eajssn',
    e2e: {
        setupNodeEvents(on, config) {
            allureWriter(on, config);
            return config;
        }
    }
});
