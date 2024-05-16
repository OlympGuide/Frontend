describe('Make a reservation', () => {
  describe('When logged in', () => {
    beforeEach('Log in user', () => {
      cy.login('cypress@olympguide.ch', 'CypressTest1$');
    });

    it('should create and delete a reservation', () => {
      cy.get('#map').click(900, 895);
      cy.get('[data-cy=button-reserve]').click();
      cy.get('div.sx-vue-calendar-wrapper.calendar')
        .should('be.visible')
        .click(300, 400);

      cy.wait(500);

      cy.get('div.event.me')
        .first()
        .within(() => {
          cy.get('.pi-check').click();
        });

      cy.get('div.event.me')
        .first()
        .within(() => {
          cy.get('.pi-trash').click();
        });

      cy.get('.p-toast-message-success').should('be.visible');
      cy.get('.p-toast-detail').should(
        'contain',
        'Ihre Reservation wurde gelöscht'
      );
    });

    it('should create a reservation', () => {
      cy.get('#map').click(900, 895);
      cy.get('[data-cy=button-reserve]').click();
      cy.get('div.sx-vue-calendar-wrapper.calendar').click();

      cy.get('div.event.me')
        .first()
        .within(() => {
          cy.get('.pi-check').click();
        });

      cy.get('.p-toast-message-success').should('be.visible');

      cy.get('div.event.me').should('exist');

      cy.get('[data-cy="menu-item-Reservationen"]')
        .should('be.visible')
        .click();

      cy.get('table').contains('td', '12:00');
    });

    it('should delete a reservation', () => {
      cy.get('[data-cy="menu-item-Reservationen"]')
        .should('be.visible')
        .click();

      cy.get('table')
        .contains('td', '12:00')
        .then((tableCell) => {
          const tableRow = tableCell.closest('tr');
          cy.wrap(tableRow).find('.p-button').click();
        });

      cy.get('div.event.me-selected').within(() => {
        cy.get('.pi-trash').click();
      });

      cy.get('.p-toast-message-success').should('be.visible');
      cy.get('.p-toast-detail').should(
        'contain',
        'Ihre Reservation wurde gelöscht'
      );
    });
  });

  describe('When not logged in', () => {
    it('should not be possible to create a reservation', () => {
      cy.visit('/');
      cy.wait(2000);
      cy.get('#map').should('be.visible').click(900, 895);
      cy.get('[data-cy=button-reserve]').click();

      cy.wait(500);
      cy.origin('https://dev-ooenivxi0xqapns6.us.auth0.com', () => {
        cy.url().should('include', 'https://dev-ooenivxi0xqapns6.us.auth0.com');

        cy.get('#prompt-logo-center').should('be.visible');
      });
    });
  });
});
