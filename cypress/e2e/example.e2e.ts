describe('Example Test', () => {
  beforeEach('Go to dashboard', () => {
    cy.visit('/');
  });
  it('should open create sportfields dialog', () => {
    cy.get('[data-cy=sportsfield-dialog-button]').should('be.visible').click(); //use data-cy here because there is no id assigned

    cy.get('#name').type('Sportfield test');
    cy.get('#coordinates').type('47, 8');
    cy.get('#description').type('This is my first cypress test description');

    cy.get('[data-cy=speichern-button]').click();
  });
});
