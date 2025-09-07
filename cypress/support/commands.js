Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Paulo')
    cy.get('#lastName').type('Correia')
    cy.get('#email').type('paulo.amd@outlook.com')
    cy.get('#phone').type('11974954317')
    cy.get('#open-text-area').type('test!')
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add("gerarCNPJ", () => {
  function randomiza(n) {
    return Math.round(Math.random() * n);
  }

  function mod(dividendo, divisor) {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
  }

  let n = 9;
  let n1 = randomiza(n);
  let n2 = randomiza(n);
  let n3 = randomiza(n);
  let n4 = randomiza(n);
  let n5 = randomiza(n);
  let n6 = randomiza(n);
  let n7 = randomiza(n);
  let n8 = randomiza(n);

  // Os 4 dígitos da filial padrão (0001)
  let n9 = 0;
  let n10 = 0;
  let n11 = 0;
  let n12 = 1;

  let d1 =
    n12 * 2 +
    n11 * 3 +
    n10 * 4 +
    n9 * 5 +
    n8 * 6 +
    n7 * 7 +
    n6 * 8 +
    n5 * 9 +
    n4 * 2 +
    n3 * 3 +
    n2 * 4 +
    n1 * 5;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n12 * 3 +
    n11 * 4 +
    n10 * 5 +
    n9 * 6 +
    n8 * 7 +
    n7 * 8 +
    n6 * 9 +
    n5 * 2 +
    n4 * 3 +
    n3 * 4 +
    n2 * 5 +
    n1 * 6;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
});
