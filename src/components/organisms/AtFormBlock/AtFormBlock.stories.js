import { ref } from "vue";
import AtFormBlock from "./AtFormBlock.vue";
import AtTextArea from "../../atoms/AtTextarea/AtTextarea.vue";
import AtRate from "../../molecules/AtRate/AtRate.vue";
import AtChoices from "../../molecules/AtChoices/AtChoices.vue";
import AtBinaryChoice from "../../molecules/AtBinaryChoice/AtBinaryChoice.vue";
import AtOptionsCreator from "../../molecules/AtOptionsCreator/AtOptionsCreator.vue";
import SimpleSelect from "../../molecules/AtSimpleSelect/AtSimpleSelect.vue";

export default {
  title: "Organisms/AtFormBlock",
  component: AtFormBlock,
};

const Template = (args) => ({
  components: {
    AtFormBlock,
    AtTextArea,
    AtRate,
    AtChoices,
    AtBinaryChoice,
    AtOptionsCreator,
    SimpleSelect,
  },
  setup() {
    return { args, field: ref(args.field) };
  },
  template: '<AtFormBlock v-bind="args" v-model:field="field" />',
});

export const Basic = Template.bind({});
Basic.args = {
  field: {
    type: "multipleSelect",
    is_required: false,
    should_accept_comment: false,
    options: [],
  },
  fieldTypes: [
    {
      name: "input",
      label: "Short Text",
      component: "input",
    },
    {
      name: "textarea",
      label: "Long Text",
      component: AtTextArea,
    },
    {
      name: "singleSelect",
      label: "Options",
      component: AtOptionsCreator,
    },
    {
      name: "multipleSelect",
      label: "Multiple",
      component: AtOptionsCreator,
    },
    {
      name: "multipleChoice",
      label: "Multiple Choice",
      component: AtOptionsCreator,
    },
    {
      name: "statement",
      label: "Statement",
      component: AtTextArea,
    },
    {
      name: "pictureChoice",
      label: "Picture Choice",
      component: AtOptionsCreator,
    },
    {
      name: "ranking",
      label: "Ranking",
      component: AtRate,
    },
    {
      name: "yesno",
      label: "Yes/No",
      component: AtBinaryChoice,
    },
    {
      name: "email",
      label: "Email",
      component: "input",
    },
    {
      name: "opinionScale",
      label: "Opinion Scale",
      component: AtChoices,
    },
    {
      name: "phonenumber",
      label: "Phone Number",
      component: "input",
    },
  ],
  disabled: false,
  index: 0,
};
