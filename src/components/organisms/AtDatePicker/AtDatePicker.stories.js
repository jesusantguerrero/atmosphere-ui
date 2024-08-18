import AtDatePicker from "./AtDatePicker.vue";

export default {
  title: "Organisms/AtDatePicker",
  component: AtDatePicker,
  argTypes: {
    acceptEndDate: {
      type: Boolean,
    },
  },
};

const Template = (args) => ({
  components: { AtDatePicker },
  setup() {
    return { args };
  },
  template: `<AtDatePicker v-bind="args"></AtDatePicker>`,
});

export const Default = Template.bind({});
Default.args = {};

export const WithEndDate = Template.bind({});
WithEndDate.args = {
  acceptEndDate: true,
};

export const WithTime = Template.bind({});
WithTime.args = {
  acceptTime: true,
};

export const FullFeatured = Template.bind({});
FullFeatured.args = {
  acceptEndDate: true,
  acceptTime: true,
  acceptReminders: true,
  acceptRecurrence: true,
  timeFormatConfig: true,
};
