import AtErrorBag from "./AtErrorBag.vue";

export default {
  title: "Atoms/AtErrorBag",
  component: AtErrorBag,
};

const Template = (args) => ({
  components: { AtErrorBag },
  setup() {
    return { args };
  },
  template: '<at-error-bag v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  field: "email",
  errors: {
    email: "An email error",
  },
};
