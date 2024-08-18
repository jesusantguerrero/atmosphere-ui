import { ref } from "vue";
import AtFieldDateTime from "./AtFieldDateTime.vue";

export default {
  title: "Molecules/AtFieldDateTime",
  component: AtFieldDateTime,
};

const Template = (args) => ({
  components: { AtFieldDateTime },
  setup() {
    return { args, value: ref(false) };
  },
  template: `<div class="w-48"><AtFieldDateTime v-bind="args" v-model="value" class="w-32"/></div>`,
});

export const Default = Template.bind({});
Default.args = {
  modelValue: new Date(),
  label: "End date",
  modelValue: false,
};

export const IncludeTime = Template.bind({});
IncludeTime.args = {
  modelValue: new Date(),
  label: "End date",
  modelValue: false,
  includeTime: true,
};

export const Selected = Template.bind({});
Selected.args = {
  modelValue: new Date(),
  label: "End date",
  modelValue: false,
  selected: true,
};

export const hasError = Template.bind({});
hasError.args = {
  modelValue: new Date(),
  label: "End date",
  modelValue: false,
  hasError: true,
};
