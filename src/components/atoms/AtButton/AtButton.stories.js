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

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'primary',
  disabled: true
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
};


