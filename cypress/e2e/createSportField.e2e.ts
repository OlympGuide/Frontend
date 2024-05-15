import '@cypress/code-coverage/support';

describe('Create sport field', () => {
  const expectedLat = 47.488470002922504;
  const expectedLong = 8.726320266723635;

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
      cy.get('[id$="_0"]').should('be.visible').click();
      cy.wait(200);
      cy.get('[data-cy=address-autocomplete] input').should(
        'have.value',
        'Hörnlistrasse 33, 8400 Winterthur, Schweiz'
      );

      cy.get('[data-cy=category]').click();
      cy.get('[id$="_0"]').should('be.visible').click();

      cy.get('#coordinates').should('have.value', '47.492946, 8.745693');

      cy.get('#description').type('This is my first cypress test description');
      cy.get('#description').should(
        'have.value',
        'This is my first cypress test description'
      );

      cy.get('[data-cy=speichern-button]').click();

      cy.get('.p-toast-message-success').should('be.visible');
    });

    it('should create a new sportfield by setting a marker', () => {
      cy.get('#map').click(900, 900);
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('#coordinates').should(
        'have.value',
        expectedLat + ', ' + expectedLong
      );

      cy.get('[data-cy=category]').click();
      cy.get('[id$="_1"]').should('be.visible').click();

      cy.get('#name').type('Marker test');
      cy.get('#name').should('have.value', 'Marker test');

      cy.get('#description').type('This is the marker test');

      cy.get('[data-cy=speichern-button]').click();

      cy.get('.p-toast-message-success').should('be.visible');
    });

    it('should not create a sport field without a name', () => {
      cy.get('#map').click();
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('[data-cy=speichern-button]').click();

      cy.get('[data-cy=name-error]').should(
        'contain',
        'Das Feld darf nicht leer sein'
      );
    });

    it('should not create a sport field without an address or coordinates', () => {
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('#name').type('No address test');
      cy.get('#name').should('have.value', 'No address test');

      cy.get('[data-cy=speichern-button]').click();

      cy.get('[data-cy=coordinates-error]').should(
        'contain',
        'Das Feld darf nicht leer sein'
      );

      cy.get('[data-cy=address-error]').should(
        'contain',
        'Die Adresse darf nicht leer sein, wenn kein Pin gesetzt wurde'
      );
    });

    it('should not create a sport field without an address from autocompletion', () => {
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('[data-cy=address-autocomplete]').type('Teststrasse');

      cy.get('[data-cy=speichern-button]').click();

      cy.get('[data-cy=address-error]').should(
        'contain',
        'Die Adresse darf nicht leer sein, wenn kein Pin gesetzt wurde'
      );
    });

    it('should not create a sport field without a category', () => {
      cy.get('#map').click();

      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.get('#name').type('No category test');

      cy.get('[data-cy=speichern-button]').click();

      cy.get('[data-cy=category-error]').should(
        'contain',
        'Bitte wählen Sie eine Option aus'
      );
    });
  });

  describe('When not logged in', () => {
    beforeEach('Go to dashboardr', () => {
      cy.visit('/');
    });

    it('should not open the sport field creation dialog ', () => {
      cy.get('[data-cy=sportsfield-dialog-button]')
        .should('be.visible')
        .click();

      cy.origin('https://dev-ooenivxi0xqapns6.us.auth0.com', () => {
        cy.url().should('include', 'https://dev-ooenivxi0xqapns6.us.auth0.com');

        cy.get('#prompt-logo-center').should('be.visible');
      });
    });
  });
});
