import { ref } from "vue";
import AtRate from "./AtRate.vue";

export default {
  title: "Molecules/AtRate",
  component: AtRate,
};

const Template = (args) => ({
  components: { AtRate },
  setup() {
    return { args, value: ref(0) };
  },
  template: '<AtRate v-bind="args" v-model="value" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 0,
  itemClass: "hover:text-blue-500",
  selectedClass: "text-blue-500",
  max: 5,
};

const TemplateWithSlot = (args) => ({
  components: { AtRate },
  setup() {
    return { args };
  },
  template: '<AtRate v-bind="args"> My Icon </AtRate>',
});

export const WithCustomSlot = TemplateWithSlot.bind({});
WithCustomSlot.args = {
  value: 0,
  itemClass: "hover:text-blue-500",
  selectedClass: "text-blue-500",
};
export const Basic = Template.bind({});
Basic.args = {
  ...Default.args,
};
export const Half = Template.bind({});
Half.args = {
  ...Default.args,
};
export const Copywriting = Template.bind({});
Copywriting.args = {
  ...Default.args,
  tooltips: ["terrible", "bad", "ok", "good", "great"],
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
};

export const Clear = Template.bind({});
Clear.args = {
  ...Default.args,
};

export const Character = Template.bind({});
Character.args = {
  ...Default.args,
};

export const EachCharacter = Template.bind({});
EachCharacter.args = {
  ...Default.args,
};
