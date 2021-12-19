import AtUpload from './AtUpload.vue';
import { action } from "@storybook/addon-actions"
import { fireEvent, within } from '@storybook/testing-library'

export default {
  component: AtUpload,
  title: 'Molecules/AtUpload',
  excludeStories: /.*Data$/,
  argTypes: {
    onModelUpdate: {},
    onUploading: {},
  },
};

export const actionData = {
  onModelUpdate: (context, id) => {
    console.log(context)
    action('update:modelValue')(id)
  },
  onUploading: (context, id) => {
    console.log(context)
    action('update:isUploading')(id)
  } 
}
const Template = (args, { argTypes }) => ({
  name: 'StoryTemplate',
  components: { AtUpload },
  setup() {

    const httpRequest = async (files, formData) => {
      await new Promise((resolve) => {
        console.log(files, formData);
        setTimeout(() => {
          resolve(files);
        }, 1000);
      });
    };

    return {
      args,
      ...actionData,
      httpRequest,
    }
  },
  template: `<div class="max-w-7xl mx-auto">
      <AtUpload 
        v-bind="args"
        v-on="args"
        :http-request="httpRequest" 
        class="px-5" 
      />
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  modelValue: [],
  isUploading: false,
  buttonLabel: 'Upload photos',
  buttonMoreLabel: 'Upload more',
};

export const WithInteractions = Template.bind({});
WithInteractions.play = async ({ canvasElement }) => {
const canvas = within(canvasElement);
   // Simulates pinning the first task
  await fireEvent.click(canvas.getByLabelText("pinTask-1"));
   // Simulates pinning the third task
   await fireEvent.click(canvas.getByLabelText("pinTask-3")); 
};
