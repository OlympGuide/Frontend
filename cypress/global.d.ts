/// <reference> types="cypress" />

import { SportFieldProposal } from '../src/types/Proposal';

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
    postSportFieldProposal(data: SportFieldProposal): void;
    getSportFieldProposals(): SportFieldProposal[];
  }
}
