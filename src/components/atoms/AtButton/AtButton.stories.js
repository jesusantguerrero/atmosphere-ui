import AtButton from './AtButton.vue';

export default {
  title: 'Atoms/AtButton',
  component: AtButton,
};

const Template = (args) => ({
  components: { AtButton },
  setup() {
    return { args };
  },
  template: '<at-button v-bind="args" > Submit </at-button>',
});

export const Default = Template.bind({});
Default.args = {
  type: 'primary'
};


