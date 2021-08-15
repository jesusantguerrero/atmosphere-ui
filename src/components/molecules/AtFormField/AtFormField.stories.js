import { ref } from 'vue';
import AtFormBlock from './AtFormField.vue';
import AtTextArea from "../../atoms/AtTextarea/AtTextarea.vue";
import AtRate from "../../molecules/AtRate/AtRate.vue";
import AtChoices from "../../molecules/AtChoices/AtChoices.vue";
import AtBinaryChoice from "../../molecules/AtBinaryChoice/AtBinaryChoice.vue";
import AtOptionsCreator from "../../molecules/AtOptionsCreator/AtOptionsCreator.vue";
import AtOptionsPicture from "../../molecules/AtOptionsPicture/AtOptionsPicture.vue";
import SimpleSelect from "../../Jetstream/SimpleSelect.vue"

export default {
  title: 'Molecules/AtFormField',
  component: AtFormBlock,
};

const Template = (args) => ({
  components: { AtFormBlock, AtTextArea, AtRate, AtChoices, AtBinaryChoice, AtOptionsCreator, SimpleSelect },
  setup() {
    return { args, field: ref(args.field) };
  },
  template: '<AtFormBlock v-bind="args" v-model:field="field" />',
});

const fields = [
  {
      name: 'input',
      label: 'Short Text',
      component: 'input'
  },
  {
      name: 'textarea',
      label: 'Long Text',
      component: AtTextArea,
  }, {
      name: 'singleSelect',
      label: 'Options',
      component: SimpleSelect,
  }, {
      name: 'multipleSelect',
      label: 'Multiple',
      component: SimpleSelect,
  },
  {
      name: 'multipleChoice',
      label: 'Multiple Choice',
      component: AtChoices,
  },
  {
      name: 'statement',
      label: 'Statement',
      component: AtTextArea,
  },
  {
      name: 'pictureChoice',
      label: 'Picture Choice',
      component: AtOptionsPicture,
  },
  {
      name: 'ranking',
      label: 'Ranking',
      component: AtRate
  },
  {
      name: 'yesno',
      label: 'Yes/No',
      component: AtBinaryChoice
  },
  {
      name: 'email',
      label: 'Email',
      component: 'input'
  },
  {
      name: 'opinionScale',
      label: 'Opinion Scale',
      component: AtChoices,
  },
  {
      name: 'phonenumber',
      label: 'Phone Number',
      component: 'input'
  }
];
export const Basic = Template.bind({});
Basic.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
    options: [],
  },
  disabled: true,
  componentName: fields[0].component,
  index: 0,
};

export const Textarea = Template.bind({});
Textarea.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
    options: [],
  },
  disabled: true,
  componentName: fields[1].component,
  index: 0,
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
  },
  options: [
    {
      name:'One',
      label: 'One'
    },
    {
      name: 'Two',
      label: 'Two'
    }, {
      name: 'Three',
      label: 'Three'
  }],
  disabled: true,
  componentName: fields[2].component,
  index: 0,
};

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
  },
  options: [
    {
      name:'One',
      label: 'One'
    },
    {
      name: 'Two',
      label: 'Two'
    }, {
      name: 'Three',
      label: 'Three'
  }],
  disabled: true,
  componentName: fields[2].component,
  index: 0,
};

export const MultipleChoice = Template.bind({});
MultipleChoice.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
  },
  disabled: true,
  data: {
    tooltips: ['One', 'Two', 'Three', 'Four', 'Five'],
    selectedClass: 'text-blue-500 border-blue-500 ring ring-offset-0 ring-blue-200',
    selectedLetterClass: 'bg-blue-500',
  },
  componentName: fields[4].component,
  index: 0,
};

export const PictureChoiceField = Template.bind({});
PictureChoiceField.args = {
    field: {
      type: 'multipleSelect',
      is_required: false,
      should_accept_comment: false,
    },
    disabled: true,
    options: [
      {
        image:"Untitled Design (1).png",
        imageUrl:"blob:http://neatlancer.test/38b46725-77c0-46ee-ac19-fd1772f39d74",
        label:"La Primera",
        name:"fb3c500d-906a-4efe-9d98-58b3c4d9a365"
      }, {
        image:"17421742.jpg",
        imageUrl:"blob:http://neatlancer.test/f87e1fb3-c9f4-42dd-8604-8d6e61b74779",
        label:"Second",
        name:"173ed32e-2914-4527-9900-af10dba88eb7"
      }
    ],
    componentName: fields[6].component,
    index: 0,
};

export const RateField = Template.bind({});
RateField.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
  },
  disabled: true,
  componentName: fields[7].component,
  index: 0,
};

export const OpinionScaleField = Template.bind({});
OpinionScaleField.args = {
  field: {
    type: 'multipleSelect',
    is_required: false,
    should_accept_comment: false,
  },
  data: {
    scale: true,
    leftLabel: 'Left',
    rightLabel: 'Right',
  },
  disabled: true,
  componentName: AtChoices,
  index: 0,
};