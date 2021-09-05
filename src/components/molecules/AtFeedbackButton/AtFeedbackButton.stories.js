import AtFeedbackButton from './AtFeedbackButton.vue';

export default {
  title: 'Molecules/AtFeedbackButton',
  component: AtFeedbackButton,
};

const Template = (args) => ({
  components: { AtFeedbackButton },
  setup() {
    return { args };
  },
  template: `<div class="w-6/12 flex justify-center">
    <AtFeedbackButton v-bind="args" class="w-9" />
  </div>`
});


export const Basic = Template.bind({});
Basic.args = {
  name: 'Starter plan',
  status: 'active'
};