import AtDatePager from './AtDatePager.vue';

export default {
  title: 'Molecules/AtDatePager',
  component: AtDatePager,
  argTypes: {},
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AtDatePager },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  template: `
  <div class="w-60">
    <AtDatePager v-model="args.value" v-bind="args" />
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  placeholder: "Select a date"
};

export const WeekMode = Template.bind({});
WeekMode.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date"
};


export const MonthMode = Template.bind({});
MonthMode.args = {
  value: new Date(),
  nextMode: 'month',
  placeholder: "Select a date"
};
