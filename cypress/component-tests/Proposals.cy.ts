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
                name: 'User',
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
      //@ts-ignore
      expect(store.sportFieldProposals).to.have.length(1);
      //@ts-ignore
      expect(store.sportFieldProposals[0]).to.deep.equal({
        id: '1',
        state: 0,
        sportFieldName: 'Marker test',
        sportFieldDescription: 'Testbeschreibung',
        sportFieldLatitude: 47,
        sportFieldLongitude: 8,
        sportFieldAddress: undefined,
        user: {
          name: 'User',
        },
      });
    });

    cy.get('@store').its('loadSportFieldProposals').should('be.called');
  });
});
