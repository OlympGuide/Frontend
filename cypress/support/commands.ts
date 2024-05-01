///<reference path="../global.d.ts" />

import { useAuth0 } from '@auth0/auth0-vue';

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

  cy.window().then((win) => {
    const token = win.localStorage.getItem('auth_token');
    cy.wrap(token).as('authToken');
  });
});

const sportFieldProposalUrl = `${Cypress.env('apiUrl')}sportfieldproposals`;
Cypress.Commands.add('postSportFieldProposal', (data, token) => {
  cy.request({
    method: 'POST',
    url: sportFieldProposalUrl,
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

Cypress.Commands.add('getSportFieldProposals', (): SportFieldProposal[] => {
  return cy
    .request({
      method: 'GET',
      url: sportFieldProposalUrl,
      qs: {
        state: 'Open',
      },
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      return response.body;
    });
});
