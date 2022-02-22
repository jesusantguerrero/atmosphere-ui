import AtTextarea from './AtTextarea.vue';

export default {
  title: 'Atoms/AtTextarea',
  component: AtTextarea,
};

const Template = (args) => ({
  components: { AtTextarea },
  setup() {
    return { args };
  },
  template: '<at-textarea v-bind="args" > </at-textarea>',
});

export const Default = Template.bind({});
Default.args = {
  class: 'border px-4 py-1'
};


