describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')    
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    const longText = Cypress._.repeat('afiasjfajfjiaofjafdtdtdodtdt', 10)

    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('paulo.amd@outlook.com')
    cy.get('#phone').type('11974954317')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    //cy.get('.success').should(not.be.visible)
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('...')
    cy.get('#phone').type('11974954317')
    cy.get('#open-text-area').type('test!')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio qunado preenchido com um valor não-númerico', () => {
    cy.get('#phone')
      .type('abcdef')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('paulo.amd@outlook.com')
    cy.get('#open-text-area').type('obrigado!')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')    
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Paulo')
      .clear()
    cy.get('#lastName')
      .type('Correia')
      .clear()
    cy.get('#email')
      .type('paulo.amd@outlook.com')
      .clear()    
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('#email-checkbox').check()
    cy.get('button[type="submit"]').click()  
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu value', () => {
    cy.get('#product')
      .select('youtube')	
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor texto', () => {
    cy.get('#product')
      .select('Mentoria')	
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)	
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get(':nth-child(4) > input')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('#support-type > :nth-child(2) > input')
      .check()
      .should('have.value', 'ajuda')
    cy.get(':nth-child(3) > input')
      .check()
      .should('have.value', 'elogio')
    cy.get(':nth-child(4) > input')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#email-checkbox')
      .check()
    cy.get('#phone-checkbox')
      .check()
      .uncheck()
  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })    
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'um texto qualquer')
      .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)

    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT') 
  })

  it('encontra o gato', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  })

})
