import { ref } from 'vue';
import AtDateSelect from './AtDateSelect.vue'

export default {
  title: 'Organisms/AtDateSelect',
  component: AtDateSelect,
  argTypes: {
    acceptEndDate: {
      type: Boolean
    }
  }
};

const Template = (args) => ({
  components: { AtDateSelect },
  setup() {
    return { args, value: ref(new Date()) };
  },
  template: `<div class="w-full bg-red py-2 flex flex-end"><AtDateSelect v-bind="args" v-model="value"></AtDateSelect></div>`,
});

export const Default = Template.bind({});
Default.args = {
  value: new Date()
};
