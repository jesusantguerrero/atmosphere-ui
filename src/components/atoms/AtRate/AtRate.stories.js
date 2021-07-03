import AtRate from './AtRate.vue';

export default {
  title: 'Atoms/AtRate',
  component: AtRate,
};

const Template = (args) => ({
  components: { AtRate },
  setup() {
    return { args };
  },
  template: '<AtRate v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 0,
  itemClass: 'hover:text-blue-500',
  selectedClass: 'text-blue-500',
  max: 5,
};

const TemplateWithSlot = (args) => ({
  components: { AtRate },
  setup() {
    return { args };
  },
  template: '<AtRate v-bind="args"> My Icon </AtRate>',
});

export const WithCustomSlot = TemplateWithSlot.bind({});
WithCustomSlot.args = {
  value: 0,
  itemClass: 'hover:text-blue-500',
  selectedClass: 'text-blue-500',
};
