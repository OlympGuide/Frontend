/// <reference> types="cypress" />

import { SportFieldProposal } from '../src/types/Proposal';

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): void;
      postSportFieldProposal(data: SportFieldProposal, token: string): void;
      loginByAuth0Api(email: string, password: string): void;
    }
  }
}
