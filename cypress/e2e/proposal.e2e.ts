describe('View sport field', () => {
  before('login', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');
  });

  it('should accept proposal', () => {
    cy.get('[data-cy="menu-item-Sportplatz-Anträge"]').click();

    cy.get('[data-p-index=0]').should('be.visible');
    cy.get('[data-p-index=1]').should('be.visible');
    cy.get('[data-p-index=2]').should('not.exist');

    cy.get('[data-pc-name=button]')
      .find('span')
      .should('have.class', 'pi-check')
      .first()
      .click();

    cy.get('[data-cy="menu-item-Karte"]').click();

    cy.get('#map').click();

    cy.get('[data-pc-section=header]').should('contain', 'Marker test');
  });
});
