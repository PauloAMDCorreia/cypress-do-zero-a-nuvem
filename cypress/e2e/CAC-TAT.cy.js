describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')    
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('paulo.amd@outlook.com')
    cy.get('#phone').type('11974954317')
    cy.get('#open-text-area').type('obrigado!')
    cy.get('button[type="submit"]').click()
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
    cy.get('#phone-checkbox').click()
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

  it.only('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)	
      .should('have.value', 'blog')
  })

})
