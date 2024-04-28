describe('Create Sport Field when logged in', () => {
  beforeEach('Go to dashboard', () => {
    cy.visit('/');

    cy.get('[data-cy="menu-item-Karte"]').click();
  });

  it('should open create sportfields dialog', () => {
    cy.get('[data-cy=sportsfield-dialog-button]').should('be.visible').click();

    cy.get('#name').type('Sportfield test');
    cy.get('#name').should('have.value', 'Sportfield test');

    cy.get('#coordinates').type('47, 8');
    cy.get('#coordinates').should('have.value', '47, 8');

    cy.get('#description').type('This is my first cypress test description');
    cy.get('#description').should(
      'have.value',
      'This is my first cypress test description'
    );

    cy.get('[data-cy=speichern-button]').click();
  });
});
