import { Upload } from './AtBareUpload';
import AtButton from '../../atoms/AtButton/AtButton.vue';

export default {
  title: 'Core/AtBareUpload',
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
  components: { AtUpload: Upload, AtButton },
  props: Object.keys(argTypes),
  computed: {
  },
  methods: {
    httpRequest: async (files, formData) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(files);
        }, 5000);
      });
    },
  },
  data() {
    return {
      files: [
        {
          name: 'test.png',
          url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
          size: '1.2MB',
          raw: new File([], 'test.png'),
        }
      ],
    };
  },
  template: `<div class="max-w-7xl mx-auto">
      <AtUpload 
        v-slot="{ openModal, hasFiles, uploadFiles, onRemoved, list, uploading }"
        v-bind="$props" 
        v-model="files" 
        v-on="$props" 
        :http-request="httpRequest" class="px-5" ref="fileInput" 
      >
        <div>
          <AtButton @click="openModal" type="primary">Upload file </AtButton>
          <ul v-if="list">
            <li v-for="file in list"> {{ file && file.name }} </li>
          </ul>
           <AtButton @click="uploadFiles()" :disabled="uploading" type="primary">Submit {{ uploading }}</AtButton>
        </div>
      </AtUpload>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  value: [],
  buttonLabel: 'Upload photos',
  buttonMoreLabel: 'Upload more',
  input: (event) => {
    Default.args.value = event;
  },
};
