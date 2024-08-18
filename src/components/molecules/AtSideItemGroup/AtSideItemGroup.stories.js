import AtSideSideItemGroup from "./AtSideItemGroup.vue";

export default {
  title: "Molecules/AtSideItemGroup",
  component: AtSideSideItemGroup,
};

const Template = (args) => ({
  components: { AtSideSideItemGroup },
  setup() {
    return { args };
  },
  template: '<AtSideItemGroup v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  icon: "users",
  label: "Users",
  childs: [
    {
      icon: "user",
      label: "Edit",
    },
  ],
};
