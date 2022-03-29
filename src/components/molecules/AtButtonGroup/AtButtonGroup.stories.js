import AtButton from './AtButtonGroup.vue';

export default {
  title: 'Molecules/AtButtonGroup',
  component: AtButton,
};

const Template = (args) => ({
  components: { AtButton },
  setup() {
    return { args };
  },
  template: '<at-button-group v-bind="args" />',
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


