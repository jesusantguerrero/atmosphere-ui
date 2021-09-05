import { ref } from 'vue';
import AtDataCard from './AtDataCard.vue';

export default {
  title: 'Molecules/AtDataCard',
  component: AtDataCard,
};

const Template = (args) => ({
  components: { AtDataCard },
  setup() {
    return { args };
  },
  template: '<AtDataCard v-bind="args" />',
});


export const Basic = Template.bind({});
Basic.args = {
  title: 'Current monthly bill',
  value: 'USD 0.0',
  links: [
      {
        label: 'Payment details', 
        ref: '/settings/billing/details'
      }
  ]
};