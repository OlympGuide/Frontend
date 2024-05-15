describe('Create Sport Field when logged in', () => {
  beforeEach('Go to dashboard', () => {
    cy.visit('/');
    cy.get('[data-cy="menu-item-Login"]').click();

    cy.origin('https://dev-ooenivxi0xqapns6.us.auth0.com', () => {
      cy.get('#password').type('CypressTest1$');
      cy.get('#username').type('cypress@olympguide.ch');
      cy.get('button[data-action-button-primary="true"]').click();
    });

    cy.get('[data-cy="menu-item-Ausloggen"]').should('be.visible');
  });

  it('should create a new sportfield with its address', () => {
    cy.get('[data-cy=sportsfield-dialog-button]').should('be.visible').click();

    cy.get('#name').type('Sportfield test');
    cy.get('#name').should('have.value', 'Sportfield test');

    cy.get('[data-cy=address-autocomplete]').type(
      'Hörnlistrasse 33 Winterthur'
    );
    cy.wait(200);
    cy.get('[id^="pv_id_"][id$="_list"]').should('be.visible').first().click();
    cy.wait(200);
    cy.get('[data-cy=address-autocomplete] input').should(
      'have.value',
      'Schulhaus Hörnlistrasse, Hörnlistrasse 33, 8400 Winterthur, Schweiz'
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

    //cy.get('[data-cy="menu-item-Sportplatz-Anträge"]').click();
  });
});
