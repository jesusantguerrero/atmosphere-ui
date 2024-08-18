import { ref } from "vue";
import AtFieldCheck from "./AtFieldCheck.vue";

export default {
  title: "Molecules/AtFieldCheck",
  component: AtFieldCheck,
};

const Template = (args) => ({
  components: { AtFieldCheck },
  setup() {
    return { args, value: ref(false) };
  },
  template: `<AtFieldCheck v-bind="args" v-model="value" />`,
});

export const Default = Template.bind({});
Default.args = {
  label: "End date",
  class: "w-32",
};
