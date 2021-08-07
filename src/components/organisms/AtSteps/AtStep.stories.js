import AtSteps from './AtSteps.vue';
import AtStep from '../../molecules/AtStep/AtStep.vue';
import AtButton from '../../atoms/AtButton/AtButton.vue';
import { ref } from 'vue';

export default {
  title: 'Organisms/AtSteps  ',
  component: AtSteps,
};

const Template = (args) => ({
  components: { AtSteps, AtStep, AtButton },
  setup() {
    const finished = () => {
      alert("Completed")
    }
    return { args, step: ref(0), finished };
  },
  template: `
    <div style="{width: '500px'}" class="px-10">
      <AtSteps v-model:value="step" @finished="finished" v-bind="args">
        <AtStep name="step1" title="Step 1"> Hola Uno </AtStep>
        <AtStep name="step2" title="Step 2"> Hola Mas</AtStep>
        <AtStep name="step3" title="Step 3"> Hola Tres</AtStep>

        <template v-slot:footer="{ prev, next}">
          <div class="flex justify-end space-x-2 ">
            <AtButton type="secondary" @click="prev()">Prev</AtButton>
            <AtButton type="success" @click="next">Next</AtButton>
          </div>
        </template>
      </AtSteps>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
   
};

export const HidenLabels = Template.bind({});
HidenLabels.args = {
   showLabels: false
};

export const HidenSteps = Template.bind({});
HidenSteps.args = {
   showSteps: false
};


