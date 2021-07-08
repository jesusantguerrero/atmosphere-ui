import AtDatePicker from './AtDatePicker.vue'

export default {
  title: 'Organisms/AtDatePicker',
  component: AtDatePicker,
  argTypes: {
    acceptEndDate: {
      type: Boolean
    }
  }
};

const Template = (args) => ({
  components: { AtDatePicker },
  setup() {
    return { args };
  },
  template: `<AtDatePicker></AtDatePicker>`,
});

export const Default = Template.bind({});
Default.args = {
  acceptEndDate: true,
  acceptTime: true,
  acceptReminders: true,
  acceptRecurrence: true,
  timeFormatConfig: true,
};