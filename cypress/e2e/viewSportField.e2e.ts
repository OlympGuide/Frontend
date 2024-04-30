describe('View sport field', () => {
  before('create sport field', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');

    const expectedLat = 47.497169148299186;
    const expectedLong = 8.728895187377931;

    cy.get('#map').click();
    cy.get('[data-cy=sportsfield-dialog-button]').should('be.visible').click();

    cy.get('#coordinates').should(
      'have.value',
      expectedLat + ', ' + expectedLong
    );

    cy.get('#name').type('Sport field view');
    cy.get('[data-cy=speichern-button]').click();
  });

  it('should ', () => {
    cy.get('#name').type('Sport field view');
  });
});
