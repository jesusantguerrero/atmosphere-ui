import { ref } from 'vue';
import AtSwitch from './AtSwitch.vue';

export default {
  title: 'Atoms/AtSwitch',
  component: AtSwitch,
};

const Template = (args) => ({
  components: { AtSwitch },
  setup() {
    return { args, value: ref(false) };
  },
  template: '<AtSwitch v-bind="args" v-model="value" />',
});

export const Default = Template.bind({});
Default.args = {
  field: 'email',
  errors: {
    email: 'An email error'
  }
};

