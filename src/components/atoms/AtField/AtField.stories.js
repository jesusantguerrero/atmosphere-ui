import AtField from "./AtField.vue";

export default {
  title: "Atoms/AtField",
  component: AtField,
};

const Template = (args) => ({
  components: { AtField },
  setup() {
    return { args };
  },
  template: '<AtField v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  field: "email",
  label: "Email",
  errors: {
    email: "An email error",
  },
};
