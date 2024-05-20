describe('Use sport field filter', () => {
  before('Log in user', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');

    cy.get('#map').click(1000, 300);
    cy.get('[data-cy=sportsfield-dialog-button]').should('be.visible').click();
    cy.get('[data-cy=category]').click();
    cy.get('[id$="_1"]').should('be.visible').click();
    cy.get('#name').type('Volleyball test');
    cy.get('[data-cy=save-button]').click();
    cy.get('[data-cy="menu-item-Sportplatz-Anträge"]').click();
    cy.get('table')
      .contains('td', 'Volleyball test')
      .then((tableCell) => {
        const tableRow = tableCell.closest('tr');
        cy.wrap(tableRow).find('.pi-check').click();
      });
    cy.get('[data-cy="menu-item-Karte"]').click();
  });

  it('should filter for existing sport fields', () => {
    cy.get('[aria-label="Volleyball"]').click();
    cy.get('#map').click(1000, 295);
    cy.get('[data-pc-section=header]').should('contain', 'Volleyball test');
    cy.get('[aria-label="Abbrechen"]').click();
  });

  it('should filter for non existing sport fields', () => {
    cy.visit('/');
    cy.get('[aria-label="Schwimmen"]').click();
    cy.get('#map').click(1000, 295);
    cy.get('[data-pc-section=header]').should('not.exist');
  });
});
