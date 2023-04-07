import AtStatBox from "./AtStatBox.vue";

export default {
  title: "Molecules/AtStatBox",
  component: AtStatBox,
};

const Template = (args) => ({
  components: { AtStatBox },
  setup() {
    return { args };
  },
  template: '<div><AtStatBox v-bind="args" /></div>',
});

export const Default = Template.bind({});
Default.args = {
  stats: [
    {
      title: "Total Users",
      content: "52.901",
    },
    {
      title: "Premium",
      content: "10.021",
      status: "success",
    },
    {
      title: "Free trials",
      content: "42.880",
      status: "success",
    },
    {
      title: "New this month",
      content: "10.029",
      status: "danger",
    },
    {
      title: "Downloads",
      content: "58.902",
      status: "success",
    },
  ],
  dates: {
    start: "2023-01-01",
    end: "2023-04-05",
  },
};
