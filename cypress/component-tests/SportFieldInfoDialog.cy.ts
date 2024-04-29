import SportFieldInfoDialog from '../../src/components/SportFieldInfoDialog.vue';

describe('<SportFieldInfoDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue

    const testSportField = {
      id: '',
      name: 'Testsportfeld',
      description: 'Testbeschreibung',
      latitude: 47,
      longitude: 8,
      address: null,
      file: null,
    };

    cy.mount(SportFieldInfoDialog, {
      props: {
        sportField: testSportField,
        modelValue: true,
      },
    });
    cy.get('span').should('contain', testSportField.description);
  });
});
