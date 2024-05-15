import Proposals from '../../src/pages/Proposals.vue';
import { createTestingPinia } from '@pinia/testing';
import { useSportFieldProposalStore } from '../../src/stores/SportFieldProposalStore';

describe('<Proposals />', () => {
  beforeEach(() => {
    createTestingPinia({
      initialState: {
        sportFieldProposal: {
          sportFieldProposals: [
            {
              id: '1',
              state: 0,
              sportFieldName: 'Marker test',
              sportFieldDescription: 'Testbeschreibung',
              sportFieldLatitude: 47,
              sportFieldLongitude: 8,
              sportFieldAddress: undefined,
              user: {
                name: 'Bouba',
              },
            },
          ],
          isLoading: false,
          errorMessage: '',
          successMessage: '',
        },
      },
      createSpy: cy.spy,
    });
    cy.wrap(useSportFieldProposalStore()).as('store');
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mountWithSetup(Proposals, {});

    cy.get('@store').then((store) => {
      expect(store.sportFieldProposals).to.have.length(1);
      expect(store.sportFieldProposals[0]).to.deep.equal({
        id: '1',
        state: 0,
        sportFieldName: 'Marker test',
        sportFieldDescription: 'Testbeschreibung',
        sportFieldLatitude: 47,
        sportFieldLongitude: 8,
        sportFieldAddress: undefined,
        user: {
          name: 'Bouba',
        },
      });
    });

    cy.get('@store').its('loadSportFieldProposals').should('be.called');
  });
});
