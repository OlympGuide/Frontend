import SportFieldInfoDialog from '../../src/components/SportFieldInfoDialog.vue';
import { SportField } from '../../src/types/Map';
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import Dialog from 'primevue/dialog';

import '../../src/assets/styles/style.css';
import '../../src/assets/styles/olympGuideTheme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { SportField, SportFieldCategory } from '../../src/types/SportField';

describe('<SportFieldInfoDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue

    const testSportField: SportField = {
      id: '',
      name: 'Testsportfeld',
      description: 'Testbeschreibung',
      latitude: 47,
      longitude: 8,
      category: SportFieldCategory.Football,
      address: undefined,
      file: undefined,
    };

    cy.mount(SportFieldInfoDialog, {
      global: {
        plugins: [PrimeVue],
        components: {
          Calendar,
          Button,
          InputIcon,
          Dialog,
        },
      },
      props: {
        sportField: testSportField,
        visible: true,
      },
    });

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    cy.get('span').should('contain', testSportField.description);
    cy.get('[data-cy=calendar]')
      .find('input')
      .should('have.value', formattedDate);
  });
});
