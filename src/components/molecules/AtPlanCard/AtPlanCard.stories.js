import { ref } from 'vue';
import AtPlanCard from './AtPlanCard.vue';

export default {
  title: 'Molecules/AtPlanCard',
  component: AtPlanCard,
};

const Template = (args) => ({
  components: { AtPlanCard },
  setup() {
    return { args };
  },
  template: '<AtPlanCard v-bind="args" />',
});


export const Basic = Template.bind({});
Basic.args = {
  name: 'Starter plan',
  amount: 5,
  currency: 'USD',
  description: 'Lorem ipsum dolor',
  features: [
    'One',
    'Two', 
    'Three'
  ],
};