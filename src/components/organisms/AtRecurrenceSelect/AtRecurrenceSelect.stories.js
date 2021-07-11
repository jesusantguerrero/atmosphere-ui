import { ref } from 'vue';
import AtRecurrenceSelect from './AtRecurrenceSelect.vue'

export default {
  title: 'Organisms/AtRecurrenceSelect',
  component: AtRecurrenceSelect,
  argTypes: {
    acceptEndDate: {
      type: Boolean
    }
  }
};

const Template = (args) => ({
  components: { AtRecurrenceSelect },
  setup() {
    return { args, value: ref(new Date()) };
  },
  template: `<div class="w-full bg-red py-2 flex flex-end"><AtRecurrenceSelect v-bind="args" v-model:schedule="schedule" v-model:date="value"></AtRecurrenceSelect></div>`,
});

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  schedule: null,
};
