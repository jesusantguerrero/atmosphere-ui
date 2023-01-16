<template>
  <AtBareStep
    ref="steps"
    :model-value="modelValue"
    v-bind="props"
    class="wizard"
    @update:modelValue="$emit('update:modelValue', $event)"
    @finished="$emit('finished', $event)"
  >
    <AtBareStepList
      v-slot:default="{ steps, handleClick, state }"
      class="steps"
      :class="stepsClass"
      v-bind="props"
    >
      <slot
        name="progress"
        :state-props="props"
        :state-value="state.value"
        :handle-click="handleClick"
      >
        <AtStepTab
          v-for="(step, index) in steps"
          :key="step.title"
          :step="step"
          :active-class="activeClass"
          :is-active="state.value == index"
          :is-passed="state.value >= index"
          :value="state.value"
          v-bind="props"
          @click="handleClick(index)"
        />
      </slot>
    </AtBareStepList>
    <slot />
    <AtBareStepControls v-slot:default="{ next, prev }">
      <slot name="footer" :next="next" :prev="prev" />
    </AtBareStepControls>
  </AtBareStep>
</template>

<script setup>
import {
  AtBareStep,
  AtBareStepList,
  AtBareStepControls,
  stepProps,
  useSteps,
} from "../../_core/AtBareStep/AtBareStep";
import AtStepTab from "../../molecules/AtStepTab/AtStepTab.vue";
import { ref, computed } from "vue";

const props = defineProps(stepProps);
defineEmits(["update:modelValue", "finished"]);

const steps = ref(null);
const { state, handleClick } = useSteps();

const stepsClass = computed(() => {
  return props.simple
    ? "flex justify-around h-1 w-full rounded-md bg-gray-200 relative"
    : "flex justify-around h-[30px] w-full rounded-md bg-gray-200 relative";
});

defineExpose({
  steps: steps.value,
  state,
  handleClick,
});
</script>

<style lang="scss">
.wizard {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
