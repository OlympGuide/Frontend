// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { mount } from 'cypress/vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import InputIcon from 'primevue/inputicon';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmPopup from 'primevue/confirmpopup';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Toast from 'primevue/toast';
import AutoComplete from 'primevue/autocomplete';
import ToggleButton from 'primevue/togglebutton';

import ToastService from 'primevue/toastservice';

import '../../src/assets/styles/style.css';
import '../../src/assets/styles/olympGuideTheme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import { defineRules } from '../../src/validation/rules';

declare global {
  namespace Cypress {
    interface Chainable {
      mountWithSetup(
        component: any,
        options?: {
          props?: any;
          data?: any;
          computed?: any;
          methods?: any;
          slots?: any;
          global?: any;
        }
      ): Chainable<any>;
    }
  }
}

//Cypress.Commands.add('mountWithPinia', mountWithPinia);
Cypress.Commands.add('mountWithSetup', (component, options) => {
  defineRules();

  // merge the global options
  options = {
    ...options,
    global: {
      ...options?.global,
      plugins: [PrimeVue, ToastService],
      components: {
        Button,
        Dialog,
        InputText,
        FloatLabel,
        Textarea,
        Calendar,
        InputIcon,
        DataTable,
        Column,
        ConfirmPopup,
        Checkbox,
        Chip,
        Dropdown,
        FileUpload,
        Toast,
        AutoComplete,
        ToggleButton,
        ...options?.global?.components,
      },
    },
  };

  // call the original mount function with the new options
  return mount(component, options);
});
