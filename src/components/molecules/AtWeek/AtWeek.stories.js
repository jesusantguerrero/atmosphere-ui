import AtWeek from './AtWeek.vue';

export default {
  title: 'Molecules/AtWeek',
  component: AtWeek,
  argTypes: {},
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AtWeek },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  template: `
  <div class="w-full">
    <AtWeek v-model="args.value" v-bind="args" />
  </div>
  `,
});
const items = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Item 1 description',
    image: 'https://picsum.photos/200/300',
    startTime: '2022-01-13T05:00:00.000',
    endTime: '2022-01-13T05:30:30.000',
    startDate: '2022-01-13',
    endDate: '2022-01-13',
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Item 2 description',
    image: 'https://picsum.photos/200/300',
    startTime: '2022-01-13T06:00:00.000',
    endTime: '2022-01-13T07:00:30.000',
    startDate: '2022-06-01',
    endDate: '2022-06-01',
  },
]
export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  placeholder: "Select a date",
  items,
};

export const WeekMode = Template.bind({});
WeekMode.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date",
  items
};

export const RelativeDates = Template.bind({});
RelativeDates.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date",
  relativeDates: true,
  items
};

export const TodayHighlighted = Template.bind({});
TodayHighlighted.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date",
  relativeDates: true,
  highlightToday: true,
  items
};
