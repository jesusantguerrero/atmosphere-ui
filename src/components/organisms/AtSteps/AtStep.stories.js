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
    const afterChange = (step) => {
      alert(`Changed to step ${step}`)
    }
    const beforeChange = () => {
      return new Promise( resolve => resolve(true))
    }
    return { args, step: ref(0), finished, afterChange, beforeChange };
  },
  template: `
    <div style="{width: '500px'}" class="px-10">
      <AtSteps v-model="step" @finished="finished" v-bind="args">
        <AtStep name="step1" title="Step 1" :after-change="afterChange.bind(null, 1)"> Hola Uno </AtStep>
        <AtStep name="step2" title="Step 2" :before-change="beforeChange" :after-change="afterChange.bind(null, 2)"> Hola Mas</AtStep>
        <AtStep name="step3" title="Step 3" :after-change="afterChange.bind(null, 3)"> Hola Tres</AtStep>

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

const RefTemplate = (args) => ({
  components: { AtSteps, AtStep, AtButton },
  setup() {
    const finished = () => {
      alert("Completed")
    }
    const afterChange = (step) => {
      alert(`Changed to step ${step}`)
    }
    const beforeChange = () => {
      const isInvalid = new Promise( resolve => resolve(true))
      return isInvalid
    }

    const step = ref(0)
    const next = () => {
      step.value += 1;
    }
    const prev = () => {
      step.value -= 1;
    }
    return { args, step, finished, afterChange, beforeChange, next, prev};
  },
  template: `
    <div style="{width: '500px'}" class="px-10">
      <AtSteps v-model="step" @finished="finished" v-bind="args">
        <AtStep name="step1" title="Step 1" :after-change="afterChange.bind(null, 1)"> Hola Uno </AtStep>
        <AtStep name="step2" title="Step 2" :before-change="beforeChange" :after-change="afterChange.bind(null, 2)"> Hola Mas</AtStep>
        <AtStep name="step3" title="Step 3" :after-change="afterChange.bind(null, 3)"> Hola Tres</AtStep>
      </AtSteps>

      <div class="flex justify-end space-x-2 ">
        <AtButton type="secondary" @click="prev()">Prev</AtButton>
        <AtButton type="success" @click="next">Next</AtButton>
      </div>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  activeClass: 'bg-blue-400 text-white',
};

export const ExternalControls = RefTemplate.bind({});
ExternalControls.args = {
   activeClass: 'bg-gray-700 text-white',
};

export const HidenLabels = Template.bind({});
HidenLabels.args = {
   showLabels: false
};

export const HidenSteps = Template.bind({});
HidenSteps.args = {
   showSteps: false
};


