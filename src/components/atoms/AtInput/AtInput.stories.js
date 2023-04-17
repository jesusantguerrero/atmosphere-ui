import AtInput from "./AtInput.vue";
import { ref } from "vue";
export default {
  title: "Atoms/AtInput",
  component: AtInput,
};

const Template = (args) => ({
  components: { AtInput },
  setup() {
    return {
      args,
      value: ref(args.value || ""),
    };
  },
  template: '<AtInput v-bind="args" v-model="value" />',
});

export const Default = Template.bind({});
Default.args = {
  value: "hola mundo",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
  rounded: true,
};

export const Prefix = Template.bind({});
Prefix.args = {
  prefix: "$",
};

export const Suffix = Template.bind({});
Suffix.args = {
  suffix: "%",
};

export const WithFormatting = Template.bind({});
WithFormatting.args = {
  prefix: "$",
  modelValue: "22,000.00",
  numberFormat: true,
  isBorderless: true,
};
