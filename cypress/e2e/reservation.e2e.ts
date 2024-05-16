describe('Make a reservation', () => {
  describe('When logged in', () => {
    beforeEach('Log in user', () => {
      cy.login('cypress@olympguide.ch', 'CypressTest1$');
    });

    it('should make a reservation', () => {
      cy.get('#map').click(900, 895);
      cy.get('[data-cy=button-reserve]').click();
      cy.get('div.sx-vue-calendar-wrapper.calendar').click();

      cy.get('div.event.me').within(() => {
        cy.get('.pi-check').click();
      });

      cy.get('.p-toast-message-success').should('be.visible');

      cy.get('div.event.me').should('exist');

      cy.get('div.event.me').within(() => {
        cy.get('.pi-trash').click();
      });

      cy.get('.p-toast-message-success').should('be.visible');
      cy.get('.p-toast-detail').should(
        'contain',
        'Ihre Reservation wurde gelöscht'
      );
    });
  });
});
