import AtBadge from './AtBadge.vue';

export default {
  title: 'Atoms/AtBadge',
  component: AtBadge,
};

const Template = (args) => ({
  components: { AtBadge },
  setup() {
    return { args };
  },
  template: '<at-badge v-bind="args" > Submit </at-badge>',
});

export const Default = Template.bind({});
Default.args = {
  type: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  type: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning'
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger'
};


