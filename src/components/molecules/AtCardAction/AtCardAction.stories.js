import AtCardAction from "./AtCardAction.vue";

export default {
  title: "Molecules/AtCardAction",
  component: AtCardAction,
};

const Template = (args) => ({
  components: { AtCardAction },
  setup() {
    return { args };
  },
  template: '<div><AtCardAction v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  title: "New plugin",
  description: "the information",
  body: "In this section we'll figureout all the information related to the application.",
  actionButtonText: "Get Started",
  footerNote: "Build your web project using atmosphere-ui"
};
