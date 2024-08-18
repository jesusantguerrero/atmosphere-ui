import { ref } from "vue";
import AtDateSelect from "./AtDateSelect.vue";

export default {
  title: "Organisms/AtDateSelect",
  component: AtDateSelect,
  argTypes: {
    acceptEndDate: {
      type: Boolean,
    },
  },
};

const Template = (args) => ({
  components: { AtDateSelect },
  setup() {
    return { args, value: ref(null) };
  },
  template: `<div class="w-44 bg-red hover:bg-gray-50 rounded-md py-2 flex flex-end mx-5">
    <AtDateSelect v-bind="args" v-model="value">
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  value: null,
};
export const AcceptTime = Template.bind({});
AcceptTime.args = {
  value: null,
  acceptTime: true,
  showTimeResult: true,
};

export const WidthOverflow = Template.bind({});
WidthOverflow.args = {
  class: "w-32 overflow-hidden",
};
