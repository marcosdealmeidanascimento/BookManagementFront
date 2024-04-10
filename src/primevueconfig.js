import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';


export default {
  components: [
    {
      name: "Button",
      component: Button,
    },
    {
      name: "DataTable",
      component: DataTable,
    },
    {
      name: "Column",
      component: Column,
    },
    {
      name: "InputText",
      component: InputText,
    },
    {
      name: "Textarea",
      component: Textarea,
    },
    {
      name: "Dropdown",
      component: Dropdown,
    },
    {
      name: "Toast",
      component: Toast,
    },
    {
      name: "Checkbox",
      component: Checkbox,
    },
    {
      name: "Dialog",
      component: Dialog,
    },
  ],
};
