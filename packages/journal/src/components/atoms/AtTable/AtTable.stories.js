import AtTable from "./AtTable.vue";

export default {
  title: "atoms/AtTable",
  component: AtTable,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AtTable },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be mapped to keys in the returned object
    return { user: args.user };
  },
  // Then, those values can be accessed directly in the template
  template: '<AtTable :user="user" />',
});