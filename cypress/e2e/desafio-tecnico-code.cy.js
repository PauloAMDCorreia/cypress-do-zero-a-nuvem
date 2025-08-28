/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
      
      cy.visit('https://www.amazon.com.br/')
    })
  
    it.only('verifica o título da aplicação', () => {
      cy.title().should('eq', 'Amazon.com.br | Tudo pra você, de A a Z.')
      cy.screenshot()
    })
  
    it('Deve exibir sugestões relacionadas quando o usuário digitar "notebook"', () => {
      
      cy.get('#twotabsearchtextbox')
        .should('be.visible')
        .click()
        .type('notebook', { delay: 200 })
  
      
      cy.get('.s-suggestion-container')
        .should('be.visible')
        .and('contain.text', 'notebook')
  
      
      cy.get('.s-suggestion-container')
        .its('length')
        .should('be.greaterThan', 1)
    })

    it('Não deve exibir sugestões quando o campo de busca estiver vazio', () => {
        cy.get('#twotabsearchtextbox')
          .should('be.visible')
          .click()
          .clear()
    
        // Garante que o container de sugestões não aparece
        cy.get('.s-suggestion-container').should('not.exist')
      })
    
      it('Não deve exibir sugestões para caracteres inválidos', () => {
        cy.get('#twotabsearchtextbox')
          .clear()
          .type('@@@@@@')
    
        // Valida que não aparecem sugestões relacionadas
        cy.get('body').then(($body) => {
          if ($body.find('.s-suggestion-container').length > 0) {
            cy.get('.s-suggestion-container')
              .should('not.contain.text', '@@@@')
          } else {
            cy.log('Nenhuma sugestão exibida, comportamento esperado')
          }
        })
      })
    
      it('Não deve quebrar ao digitar uma sequência muito longa', () => {
        const longText = 'notebook'.repeat(50)
        cy.get('#twotabsearchtextbox')
          .clear()
          .type(longText, { delay: 0 })
    
        // Valida que a aplicação continua funcionando
        cy.get('#twotabsearchtextbox').should('have.value', longText)
      })
    
      it('Não deve exibir sugestões se o usuário apenas clicar no campo de busca', () => {
        cy.get('#twotabsearchtextbox')
          .clear()
          .click()
    
        // Verifica que sugestões não aparecem automaticamente sem texto
        cy.get('.s-suggestion-container').should('not.exist')
      })
  
  })
  