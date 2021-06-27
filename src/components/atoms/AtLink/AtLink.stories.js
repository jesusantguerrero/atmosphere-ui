import AtLink from './AtLink.vue';

export default {
  title: 'Atoms/AtLink',
  component: AtLink,
};

const Template = (args) => ({
  components: { AtLink },
  setup() {
    return { args };
  },
  template: '<at-link v-bind="args" > Submit </at-link>',
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


