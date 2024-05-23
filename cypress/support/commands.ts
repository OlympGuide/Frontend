/// <reference path="../global.d.ts" />
// cypress/support/e2e.js
import '@cypress/code-coverage/support';

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('[data-cy="menu-item-Login"]').click();

  cy.origin(
    Cypress.env('auth0Url'),
    { args: { email, password } },
    ({ email, password }) => {
      cy.get('#username').type(email);
      cy.get('#password').type(password);
      cy.get('button[data-action-button-primary="true"]').click();
    }
  );

  cy.get('[data-cy="menu-item-Ausloggen"]', { timeout: 10000 }).should(
    'be.visible'
  );
});
