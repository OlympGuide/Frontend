describe('View sport field', () => {
  before('create sport field', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');
  });

  it('should ', () => {
    cy.get('#map').click();

    cy.get('[data-pc-section=header]').should('contain', 'Marker test');

    cy.get('[data-cy=date]').find('label').should('contain', 'Date');
    cy.get('[data-cy=from]').find('label').should('contain', 'From');
    cy.get('[data-cy=to]').find('label').should('contain', 'To');

    cy.get('[data-cy=date]').find('input').clear();
    cy.get('[data-cy=date]').find('input').type('06.06.2024');
    cy.get('[data-cy=date]').find('svg').click();

    cy.get('[data-cy=date]').find('input').should('have.value', '06.06.2024');

    cy.get('[data-cy=button-book]').click();
  });
});
