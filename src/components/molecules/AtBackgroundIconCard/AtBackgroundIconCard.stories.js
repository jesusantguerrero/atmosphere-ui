import AtBackgroundIconCard from "./AtBackgroundIconCard.vue";

export default {
  title: 'Molecules/AtBackgroundIconCard',
  component: AtBackgroundIconCard,
};

const Template = (args) => ({
  components: { AtBackgroundIconCard },
  setup() {
    return { args };
  },
  template: '<at-background-icon-card v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  class: "w-96 bg-blue-500 text-white rounded-md h-full",
  icon: "fas fa-wallet",
  value: "10,000.00",
  title: "Accounts",
};

