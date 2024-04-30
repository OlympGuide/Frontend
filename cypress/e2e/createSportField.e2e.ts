describe('Create sport field', () => {
  describe('When logged in', () => {
    beforeEach('Log in user', () => {
      cy.login('cypress@olympguide.ch', 'CypressTest1$');
    });

    it('should create a new sport field with its address', () => {
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('#name').type('Sportfield test');
      cy.get('#name').should('have.value', 'Sportfield test');

      cy.get('[data-cy=address-autocomplete]').type(
        'Hörnlistrasse 33 Winterthur'
      );
      cy.wait(200);
      cy.get('[id^="pv_id_"][id$="_list"]')
        .should('be.visible')
        .first()
        .click();
      cy.wait(200);
      cy.get('[data-cy=address-autocomplete] input').should(
        'have.value',
        'Schulhaus Hörnlistrasse, 33, Hörnlistrasse, Gutschick, Mattenbach, Winterthur, Bezirk Winterthur, Zurich, 8400, Switzerland'
      );

      cy.get('#coordinates').should(
        'have.value',
        '47.492729499999996, 8.745953891759001'
      );

      cy.get('#description').type('This is my first cypress test description');
      cy.get('#description').should(
        'have.value',
        'This is my first cypress test description'
      );

      cy.get('[data-cy=speichern-button]').click();

      cy.get('.p-toast-message-success').should('be.visible');
    });

    it('should create a new sportfield by setting a marker', () => {
      const expectedLat = 47.497169148299186;
      const expectedLong = 8.728895187377931;

      cy.get('#map').click();
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('#coordinates').should(
        'have.value',
        expectedLat + ', ' + expectedLong
      );

      cy.get('#name').type('Marker test');
      cy.get('#name').should('have.value', 'Marker test');

      cy.get('[data-cy=speichern-button]').click();

      cy.get('.p-toast-message-success').should('be.visible');
    });
  });

  describe('When not logged in', () => {
    beforeEach('Log in user', () => {
      cy.visit('/');
    });

    it('should not open the sport field creation dialog ', () => {
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.url().should('include', 'https://dev-ooenivxi0xqapns6.us.auth0.com');
    });
  });
});
