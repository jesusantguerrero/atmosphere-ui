import { ref } from "vue";
import AtBillingCard from "./AtBillingCard.vue";

export default {
  title: "Molecules/AtBillingCard",
  component: AtBillingCard,
};

const Template = (args) => ({
  components: { AtBillingCard },
  setup() {
    return { args };
  },
  template: '<AtBillingCard v-bind="args"  />',
});

export const Basic = Template.bind({});
Basic.args = {
  name: "Starter plan",
  status: "active",
};
