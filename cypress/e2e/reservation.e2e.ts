describe('Make a reservation', () => {
  describe('When logged in', () => {
    it('should make a reservation', () => {
      cy.get('#map').click();

      cy.get('[data-cy=button-reserve]');
    });
  });
});
