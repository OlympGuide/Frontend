describe('Example Component', () => {
  it('should open create sportfields dialog', () => {
    cy.visit('/');
    cy.get('#triggerButton').should('be.visible').click();
  });
});
