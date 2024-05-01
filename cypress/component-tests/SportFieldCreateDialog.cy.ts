import SportFieldCreateDialog from '../../src/components/SportFieldCreateDialog.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';

import '../../src/assets/styles/style.css';
import '../../src/assets/styles/olympGuideTheme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
describe('<SportFieldCreateDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue

    cy.mount(SportFieldCreateDialog, {
      global: {
        plugins: [PrimeVue],
        components: {
          FloatLabel,
          Button,
          InputText,
          Dialog,
          TextArea,
          Checkbox,
        },
      },
      props: {
        isVisible: true,
      },
    });

    //todo
  });
});
