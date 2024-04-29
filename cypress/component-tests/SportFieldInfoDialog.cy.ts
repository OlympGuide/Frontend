import SportFieldInfoDialog from '../../src/components/SportFieldInfoDialog.vue';
import { SportField } from '../../src/types/Map';

describe('<SportFieldInfoDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue

    const testSportField: SportField = {
      id: '',
      name: 'Testsportfeld',
      description: 'Testbeschreibung',
      latitude: 47,
      longitude: 8,
      address: undefined,
      file: undefined,
    };

    cy.mount(SportFieldInfoDialog, {
      props: {
        sportField: testSportField,
      },
    });

    cy.get('span').should('contain', testSportField.description);
  });
});
