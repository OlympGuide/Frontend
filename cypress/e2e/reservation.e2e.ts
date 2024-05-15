describe('Make a reservation', () => {
  describe('When logged in', () => {
    beforeEach('Log in user', () => {
      cy.login('cypress@olympguide.ch', 'CypressTest1$');
    });

    it('should make a reservation', () => {
      cy.wait(5000);
      cy.get('#map').click(900, 895);
      cy.get('[data-cy=button-reserve]').click();
      cy.get('div.sx-vue-calendar-wrapper.calendar').click();

      cy.get('div.event.me').within(() => {
        cy.get('.pi-check').click();
      });

      // TODO: When backend response comes uncomment below
      /*
      cy.reload();
      cy.get('div.event.me').should('exist');
      */
    });
  });
});
