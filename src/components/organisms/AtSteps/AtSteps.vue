<template>
    <at-bare-step 
        ref="steps" 
        :model-value="modelValue" 
        v-bind="props" 
        class="wizard"
        @update:modelValue="$emit('update:modelValue', $event)"
        @finished="$emit('finished', $event)"
    >
        <at-bare-step-list v-slot:default="{ steps, handleClick, state }" class="steps">
            <at-step-tab
                v-for="(step, index) in steps"
                :key="step.title"
                :step="step"
                :value="state.value"
                :active-class="activeClass"
                :is-active="state.value == index"
                :is-passed="state.value >= index"
                @click="handleClick(index)"
            />
        </at-bare-step-list>    
        <slot />
        <at-bare-step-controls v-slot:default="{ next, prev }">
            <slot name="footer" :next="next" :prev="prev" />
        </at-bare-step-controls>
    </at-bare-step>
</template>

<script setup>
import { AtBareStep, AtBareStepList, AtBareStepControls, stepProps } from '../../_core/AtBareStep/AtBareStep';
import AtStep from "../../molecules/AtStep/AtStep.vue"
import AtStepTab from "../../molecules/AtStepTab/AtStepTab.vue"
import { ref } from 'vue';

const props = defineProps(stepProps)
defineEmits(['update:modelValue', 'finished'])

const steps = ref(null);
defineExpose({
    steps: steps.value,
})

</script>

<style lang="scss">
    .wizard {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .steps {
        background: #F7F7F7;
        border-radius: 4px;
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
</style>
