import AtSide from './AtSide.vue';

export default {
  title: 'Organisms/AtSide',
  component: AtSide,
};

const Template = (args) => ({
  components: { AtSide },
  setup() {
    return { args };
  },
  template: `
    <div class="w-96">
      <at-side v-bind="args" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  slides: [
    {
        name: "one",
        title: "First",
    },
    {
        name: "two",
        title: "Second",
    },
    {
        name: "three",
        title: "Third",
    },
  ],
};


