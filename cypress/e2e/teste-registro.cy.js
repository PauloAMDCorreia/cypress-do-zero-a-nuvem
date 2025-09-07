describe('Cadastro de Empresa no TesteFer', () => {
    // Acessa o site de cadastro
    beforeEach(() => {
        cy.visit('https://testefer.com/cadastroEmpresa.asp')
    })
  it('Deve preencher o formulário de cadastro e clicar em Continuar', () => {
    
    // Chama o gerador de CNPJ
    cy.gerarCNPJ().then((cnpj) => {
      cy.log('CNPJ gerado: ' + cnpj)

    // Preenche os campos do formulário
    cy.get(':nth-child(2) > [style="width:530px;height:25px"] > input').type('Paultrace Tecnologia LTDA')
    cy.get(':nth-child(3) > [style="width:530px;height:25px"] > input').type('Paultrace INC')
    cy.get(':nth-child(4) > [style="width:200px;height:25px"] > input').type(cnpj)
    cy.get(':nth-child(4) > [style="width:190px;height:25px"] > input').type('123456789')
    cy.get(':nth-child(3) > [style="width:530px;height:25px"] > input').type('123456789')
    cy.get('[name="txtEnderecoRua"]').type('Rua Teste')
    cy.get('[name="txtEnderecoNum"]').type('100')
    cy.get('.fase1 > table > tbody > :nth-child(6) > [style="width:530px;height:25px"] > input').type('Sala 1')
    cy.get(':nth-child(7) > [style="width:530px;height:25px"] > input').type('Bairro Teste')
    cy.get(':nth-child(8) > [style="width:200px;height:25px"] > input').type('São Paulo')
    cy.get(':nth-child(8) > [style="width:190px;height:25px"] > input').type('SP')
    cy.get(':nth-child(9) > [style="width:200px;height:25px"] > input').type('05386-050')
    cy.get('[style="width:190px"] > input').type('Brasil')

    cy.get('#bt1').click() // Clica no botão Continuar

    cy.get('#Nao').check().should('be.checked') // Verifica se o rádio "Não" está selecionado

    cy.get('#bt1').click() // Clica no botão Continuar novamente

    // Verifica se o CNPJ gerado aparece na próxima página
    cy.get('.fase3 > table > tbody > :nth-child(2) > td > .Texto14 > b')

    //Dados do responsável
    cy.get(':nth-child(3) > [style="width:200px;height:25px"] > input').type('Paulo')
    cy.get(':nth-child(3) > [style="width:190px;height:25px"] > input').type('Correia')
    cy.get(':nth-child(4) > [style="width:530px;height:25px"] > input').type('paulo.correia@teste.com')
    cy.get(':nth-child(5) > [style="width:530px;height:25px"] > input').type('paulo.correia@teste.com')
    cy.get('.fase3 > table > tbody > :nth-child(6) > [style="width:530px;height:25px"] > input').type('Diretor')
    cy.get(':nth-child(7) > [style="width:200px;height:25px"] > input').type('1137261680')
    cy.get(':nth-child(7) > [style="width:190px;height:25px"] > input').type('11974954317')
    cy.get(':nth-child(8) > [style="width:530px;height:25px"] > input').type('30/09/1981')
    cy.get(':nth-child(10) > [style="width:530px;height:25px"] > .Texto14 > input').type('123456')
    cy.get(':nth-child(11) > [style="width:530px;height:25px"] > input').type('123456')
    cy.get('#bt1').click() // Clica no botão Continuar
    cy.get('[style="width:170px;text-align:right;"] > input').type('teste')
    cy.get('#Cadastrar').click() // Clica no botão Cadastrar

    })

    //valida novo cadastro
    cy.get('.Titulo > b').should('be.visible')
  })
  it('Valida campo CNPJ', () => {
     // Preenche os campos do formulário
    cy.get(':nth-child(2) > [style="width:530px;height:25px"] > input').type('Paultrace Tecnologia LTDA')
    cy.get(':nth-child(3) > [style="width:530px;height:25px"] > input').type('Paultrace INC')
    
    cy.get(':nth-child(4) > [style="width:190px;height:25px"] > input').type('123456789')
    cy.get(':nth-child(3) > [style="width:530px;height:25px"] > input').type('123456789')
    cy.get('[name="txtEnderecoRua"]').type('Rua Teste')
    cy.get('[name="txtEnderecoNum"]').type('100')
    cy.get('.fase1 > table > tbody > :nth-child(6) > [style="width:530px;height:25px"] > input').type('Sala 1')
    cy.get(':nth-child(7) > [style="width:530px;height:25px"] > input').type('Bairro Teste')
    cy.get(':nth-child(8) > [style="width:200px;height:25px"] > input').type('São Paulo')
    cy.get(':nth-child(8) > [style="width:190px;height:25px"] > input').type('SP')
    cy.get(':nth-child(9) > [style="width:200px;height:25px"] > input').type('05386-050')
    cy.get('[style="width:190px"] > input').type('Brasil')

    cy.get('#bt1').click() // Clica no botão Continuar
    cy.get('#Nao').check().should('be.checked') // Verifica se o rádio "Não" está selecionado
    cy.get('#bt1').click() // Clica no botão Continuar novamente

    cy.get('#Nao').check().should('be.checked') // Verifica se o rádio "Não" está selecionado

    cy.get('#bt1').click() // Clica no botão Continuar
    cy.get('#Cadastrar').click() // Clica no botão Cadastrar
    //Valida mensagem "<<Confira" no campo CNPJ
    cy.get('.fase1 > table > tbody > :nth-child(4) > [style="width:80px;height:25px"] > input').should('be.visible')
  })

})
