<template>
    <at-bare-step v-bind="props" @update:value="$emit('update:value', $event)" class="wizard">
        <at-bare-step-list v-slot:default="{ steps, handleClick }" class="steps">
            <at-step-tab
                v-for="(step, index) in steps"
                :key="step.title"
                :step="step"
                :value="value"
                :is-active="value == index"
                :is-passed="value >= index"
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

const props = defineProps(stepProps)
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
