import { ref } from "vue";
import AtButtonGroup from "./AtButtonGroup.vue";

export default {
  title: "Molecules/AtButtonGroup",
  component: AtButtonGroup,
};

const Template = (args) => ({
  components: { AtButtonGroup },
  setup() {
    return { args, selected: ref("MONTHLY") };
  },
  template: '<at-button-group v-model="selected" v-bind="args" />',
});

const options = [
  {
    value: "MONTHLY",
    label: "Monthly",
  },
  {
    value: "WEEKLY",
    label: "Weekly",
  },
  {
    value: "DATE",
    label: "By Date",
  },
];
export const Default = Template.bind({});
Default.args = {
  theme: "primary",
  options: [
    {
      value: "MONTHLY",
      label: "Monthly",
    },
    {
      value: "WEEKLY",
      label: "Weekly",
    },
    {
      value: "DATE",
      label: "By Date",
    },
  ],
};

export const NoticeType = Template.bind({});
NoticeType.args = {
  theme: "notice",
  options,
};

export const CompactStyle = Template.bind({});
CompactStyle.args = {
  theme: "notice",
  options,
  compact: true,
};

export const Rounded = Template.bind({});
Rounded.args = {
  theme: "secondary",
  options,
  rounded: true,
};
