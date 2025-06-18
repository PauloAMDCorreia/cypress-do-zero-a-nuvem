Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('paulo.amd@outlook.com')
    cy.get('#phone').type('11974954317')
    cy.get('#open-text-area').type('test!')
    cy.get('button[type="submit"]').click()
})