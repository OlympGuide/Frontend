/// <reference path="../global.d.ts" />
// cypress/support/e2e.js
import '@cypress/code-coverage/support';

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

  cy.get('[data-cy="menu-item-Ausloggen"]', { timeout: 10000 }).should(
    'be.visible'
  );
});

Cypress.Commands.add(
  'loginByAuth0Api',
  (username: string, password: string) => {
    cy.log(`Logging in as ${username}`);
    const client_id = 'cnWkVX30s8jQC2BQsfG3Yse9yAOaPHWZ';
    const audience = 'OlympGuideBackend';
    //const secret = ('vR0P4RT_od-cz0BW91UAquEgtDJrmDDsemYQ5BjfEbBqYgQTy_q-WSJaYt8rF8RO');

    cy.request({
      method: 'POST',
      url: `https://dev-ooenivxi0xqapns6.us.auth0.com/oauth/token`,
      body: {
        grant_type: 'password',
        username,
        password,
        audience,
        client_id,
      },
    }).then(({ body }) => {
      const item = {
        body: {
          ...body,
          decodedToken: {
            audience,
            client_id,
          },
        },
      };
      window.localStorage.setItem('auth0Cypress', JSON.stringify(item));
      //cy.visit('/');
    });
  }
);
