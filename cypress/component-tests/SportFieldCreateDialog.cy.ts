import SportFieldCreateDialog from '../../src/components/SportFieldCreateDialog.vue';
import { createTestingPinia } from '@pinia/testing';
import { useSportFieldProposalStore } from '../../src/stores/SportFieldProposalStore';

describe('<SportFieldCreateDialog />', () => {
  beforeEach(() => {
    createTestingPinia({
      initialState: {
        sportFieldProposal: {
          proposals: [
            {
              id: '1',
              state: 0,
              name: 'Marker test',
              description: 'Testbeschreibung',
              latitude: 47,
              longitude: 8,
              address: undefined,
              file: undefined,
            },
          ],
        },
      },
      createSpy: cy.spy,
    });
    cy.wrap(useSportFieldProposalStore()).as('store');
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue

    cy.mountWithSetup(SportFieldCreateDialog, {
      props: {
        isVisible: true,
      },
    });

    cy.get('@store').its('loadSportFieldProposals').should('not.be.called');

    //todo
  });
});
