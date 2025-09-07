describe('API Testes', () => {
    const apiUrl = 'https://fakestoreapi.com/users/1';

    it('Deve retornar sucesso ao buscar um post existente (positivo)', () => {
        cy.api({
            method: 'GET',
            url: `${apiUrl}`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', 1);
        });
    });

    it('Deve retornar erro ao buscar um post inexistente (negativo)', () => {
        cy.api({
            method: 'GET',
            url: `${apiUrl}/99999`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});