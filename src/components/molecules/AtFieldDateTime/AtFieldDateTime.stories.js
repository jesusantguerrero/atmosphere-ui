import { ref } from 'vue';
import AtFieldDateTime from './AtFieldDateTime.vue'

export default {
  title: 'Molecules/AtFieldDateTime',
  component: AtFieldDateTime,
};

const Template = (args) => ({
  components: { AtFieldDateTime },
  setup() {

    return { args, value: ref(false) };
  },
  template: `<AtFieldDateTime v-bind="args" v-model="value" />`,
});

export const Default = Template.bind({});
Default.args = {
  label: 'End date',
  modelValue: false
};