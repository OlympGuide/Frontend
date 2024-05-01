import { SportFieldProposal } from '../../src/types/Proposal';

describe('View sport field', () => {
  before('create sport field', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');

    const testSportField: SportFieldProposal = {
      id: '',
      name: 'Testsportfeld',
      description: 'Testbeschreibung',
      latitude: 47,
      longitude: 8,
      address: undefined,
      file: undefined,
    };

    let proposalId = '';

    cy.get('@authToken').then((token) => {
      cy.postSportFieldProposal(testSportField, token);

      cy.getSportFieldProposals().then((proposals) => {
        expect(proposals).to.have.length(1);
      });
    });

    cy.get('@authtoken').then((token) => {
      cy.getSportFieldProposals().then((proposals) => {
        expect(proposals).to.have.length(1);

        proposalId = proposals[0].id;
      });
    });
  });

  it('should ', () => {
    cy.get('#name').should('contain', Testsportfeld);
  });
});
