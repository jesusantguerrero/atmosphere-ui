import AtDatePager from "./AtDatePager.vue";

export default {
  title: "Molecules/AtDatePager",
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
  <div>
    <AtDatePager v-model="args.value" v-bind="args" />
  </div>
  `,
});

const TemplateWithSlot = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AtDatePager },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  template: `
  <div>
    <AtDatePager v-model="args.value" v-bind="args">
      Range Selector
    </AtDatePager>
  </div>
  `
})

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
  placeholder: "Select a date",
};

export const WeekMode = Template.bind({});
WeekMode.args = {
  value: new Date(),
  nextMode: "week",
  placeholder: "Select a date",
};

export const MonthMode = Template.bind({});
MonthMode.args = {
  value: new Date(),
  nextMode: "month",
  placeholder: "Select a date",
};

export const CustomFormat = Template.bind({});
CustomFormat.args = {
  value: new Date(),
  nextMode: "month",
  placeholder: "Select a date",
  format: "MMM dd, yyyy",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  value: new Date(),
  nextMode: "month",
  placeholder: "Select a date",
  format: "MMM dd, yyyy",
  dateClass: "",
  class: "bg-slate-600 text-white border-slate-800",
  controlsClass: "hover:bg-slate-400 bg-transparent text-white",
};

export const IconsOnly = Template.bind({});
IconsOnly.args = {
  value: new Date(),
  nextMode: "month",
  placeholder: "Select a date",
  iconsOnly: true,
};

export const CustomRangeMode = Template.bind({});
CustomRangeMode.args = {
  value: new Date(),
  nextMode: "P3M",
  placeholder: "Select a date",
};

export const MiddleSlot = TemplateWithSlot.bind({});
MiddleSlot.args = {
  value: new Date(),
  nextMode: "month",
  placeholder: "Select a date",
};
