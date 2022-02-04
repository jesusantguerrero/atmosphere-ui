import { addDays, addHours } from 'date-fns';
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
  <div class="w-full h-screen">
    <AtWeek v-model="args.value" v-bind="args" />
  </div>
  `,
});

const setISOTime = (hoursToAdd = 0, daysToAdd = 0 ) => {
  return addHours(addDays(new Date(), daysToAdd), hoursToAdd);
};

const items = [
  {
    id: '1',
    title: 'Item 1',
    description: 'Item 1 description',
    image: 'https://picsum.photos/200/300',
    startTime: setISOTime(8),
    endTime: setISOTime(9),
  },
  {
    id: '2',
    title: 'Item 2',
    description: 'Item 2 description',
    image: 'https://picsum.photos/200/300',
    startTime: setISOTime(10),
    endTime: setISOTime(11),
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

export const NoTimeWeekDays = Template.bind({});
NoTimeWeekDays.args = {
  value: new Date(),
  nextMode: 'week',
  placeholder: "Select a date",
  relativeDates: true,
  items,
  time: false,
  hideWeekends: true,
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
