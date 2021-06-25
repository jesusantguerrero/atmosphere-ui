import AtInput from './AtInput.vue';

export default {
  title: 'Atoms/AtInput',
  component: AtInput,
};

const Template = (args) => ({
  components: { AtInput },
  setup() {
    return { args };
  },
  template: '<AtInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  field: 'email',
  errors: {
    email: 'An email error'
  }
};

