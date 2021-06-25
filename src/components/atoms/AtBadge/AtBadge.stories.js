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


