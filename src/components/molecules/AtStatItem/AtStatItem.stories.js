import AtStatItem from "./AtStatItem.vue";

export default {
  title: "Molecules/AtStatItem",
  component: AtStatItem,
};

const Template = (args) => ({
  components: { AtStatItem },
  setup() {
    return { args };
  },
  template: '<div><AtStatItem v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: "New plugin",
  content: "content",
  status: "danger",
  size: "10",
  statusClass: "m-0 space-x-1 text-[]",
  contentColor: "#9B9B9B",
};
