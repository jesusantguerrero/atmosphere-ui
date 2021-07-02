import AtWeekPager from './AtWeekPager.vue';

export default {
  title: 'Molecules/AtWeekControls',
  component: AtWeekPager,
  argTypes: {},
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AtWeekPager },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  template: `
  <div class="w-full">
    <AtWeekPager v-model="args.value" v-bind="args" />
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

export const RelativeDates = Template.bind({});
RelativeDates.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date",
  relativeDates: true
};

export const TodayHighlighted = Template.bind({});
TodayHighlighted.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date",
  relativeDates: true,
  highlightToday: true
};
