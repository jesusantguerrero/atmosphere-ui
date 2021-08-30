import { ref } from 'vue';
import AtChoices from './AtChoices.vue';

export default {
  title: 'Molecules/AtChoices',
  component: AtChoices,
};

const Template = (args) => ({
  components: { AtChoices },
  setup() {
    return { args, value: ref(0) };
  },
  template: '<AtChoices v-bind="args" v-model="value" />',
});

const tooltips = ['Every day', 'A few times a week', 'A few times a month', 'Less often', 'I dont use it']

export const Basic = Template.bind({});
Basic.args = {
  value: 0,
  itemClass: '',
  selectedClass: 'text-blue-500 border-blue-500 ring ring-offset-0 ring-blue-200',
  selectedLetterClass: 'bg-blue-500',
  max: 5,
  tooltips,
};

export const Scale = Template.bind({});
Scale.args = {
  ...Basic.args,
  count: 10,
  tooltips: [],
  showLetters: false,
  scale: true,
  leftLabel: 'No.',
  rightLabel: 'Definitely'
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Basic.args,
};

export const Clear = Template.bind({});
Clear.args = {
  ...Basic.args,
};

export const Character = Template.bind({});
Character.args = {
  ...Basic.args,
};

export const EachCharacter = Template.bind({});
EachCharacter.args = {
  ...Basic.args,
};