import { ref } from 'vue';
import AtPlanCardFlat from './AtPlanCardFlat.vue';

export default {
  title: 'Molecules/AtPlanCardFlat',
  component: AtPlanCardFlat,
};

const Template = (args) => ({
  components: { AtPlanCardFlat },
  setup() {
    return { args };
  },
  template: '<AtPlanCardFlat v-bind="args" class="w-80" />',
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

export const WithLabel = Template.bind({});
WithLabel.args = {
  name: 'Plus',
  amount: 12,
  currency: 'USD',
  tag: '-20%',
  labels: ['per user', 'per month'],
  description: 'Lorem ipsum dolor',
  features: [
    'One',
    'Two', 
    'Three'
  ],
};

export const CurrentPlan = Template.bind({});
CurrentPlan.args = {
  isCurrent: true,
  name: 'Plus',
  amount: 12,
  currency: 'USD',
  tag: '-20%',
  labels: ['per user', 'per month'],
  description: 'Lorem ipsum dolor',
  subscribeLabel: 'current plan',
  features: [
    'One',
    'Two', 
    'Three'
  ],
};