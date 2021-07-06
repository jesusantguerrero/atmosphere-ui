import AtDatePicker from './AtDatePicker.vue'

export default {
  title: 'Organisms/AtDatePicker',
  component: AtDatePicker,
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
  icon: 'users',
  label: 'Users',
  childs: [
    { 
      icon: 'user',
      label: 'Edit',
    }
  ]
};