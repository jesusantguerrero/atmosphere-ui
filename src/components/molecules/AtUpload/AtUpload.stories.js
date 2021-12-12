import AtUpload from './AtUpload.vue';

export default {
  title: 'Core/AtUpload',
  argTypes: {
    input: {
      action: 'input',
    },
    submit: {
      action: 'submit',
    },
  },
};

const Template = (args, { argTypes }) => ({
  name: 'StoryTemplate',
  components: { AtUpload },
  props: Object.keys(argTypes),
  methods: {
    httpRequest: async (files, formData) => {
      await new Promise((resolve) => {
        console.log(files, formData);
        setTimeout(() => {
          resolve(files);
        }, 1000);
      });
    },
  },
  template: `<div class="max-w-7xl mx-auto">
      <AtUpload 
        v-bind="args"
        v-on="$props" 
        :http-request="httpRequest" class="px-5" ref="fileInput" 
      />
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  modelValue: [],
  isUploading: false,
  buttonLabel: 'Upload photos',
  buttonMoreLabel: 'Upload more',
  "update:modelValue": (event) => {
    Default.args.modelValue = event;
  },
  "update:isUploading": (event) => {
    Default.args.isUploading = event;
  },
};
