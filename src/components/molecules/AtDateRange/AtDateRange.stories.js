import AtDateRange from "./AtDateRange.vue";

export default {
  title: 'Molecules/AtDateRange',
  component: AtDateRange,
};

const Template = (args) => ({
  components: { AtDateRange },
  setup() {
    return { args };
  },
  template: '<at-date-range v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  class: "w-96 bg-blue-500 text-white rounded-md h-full",
  icon: "fas fa-wallet",
  value: "10,000.00",
  title: "Accounts",
};

