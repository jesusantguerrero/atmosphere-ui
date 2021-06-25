import AtDashlide from './AtDashlide.vue';

export default {
  title: 'Organisms/AtDashlide',
  component: AtDashlide,
};

const Template = (args) => ({
  components: { AtDashlide },
  setup() {
    return { args };
  },
  template: `
    <div class="w-96">
      <at-dashlide v-bind="args">
        <template #one> One </template>
        <template #two> Two </template>
      </at-dashlide>
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


