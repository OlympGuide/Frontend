///<reference path="../global.d.ts" />

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('[data-cy="menu-item-Login"]').click();

  cy.origin(
    'https://dev-ooenivxi0xqapns6.us.auth0.com',
    { args: { email, password } },
    ({ email, password }) => {
      cy.get('#username').type(email);
      cy.get('#password').type(password);
      cy.get('button[data-action-button-primary="true"]').click();
    }
  );

  cy.get('[data-cy="menu-item-Ausloggen"]').should('be.visible');
});
