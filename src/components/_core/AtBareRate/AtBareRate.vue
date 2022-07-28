<template>
    <form @submit.prevent class="inline-flex mt-0">
        <at-bare-rate-button :current="0" :select="isSelected(0)" />
        <slot
            v-for="current in range"
            :key="current"
            :count="count"
            :current="current"
            :set-current-hover="setCurrentHover"
            :selected="isSelected(current)"
            :hovered="isHovered(current)"
            :focused="isFocused(current)"
            :covered="isCovered(current)"
        >
            {{ current }}
        </slot>
    </form>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref } from "vue";
import rateProps from "./rateProps";

const props = defineProps({
    ...rateProps,
});

const emit = defineEmits(["update:modelValue"]);

// selection ui management
const currentHover = ref(0);
const currentFocus = ref(0);

const setCurrentHover = (current: number) => {
    currentHover.value = current;
};

const setCurrentFocus = (current: number) => {
    currentFocus.value = current;
};

const isSelected = (current: number) => {
    return props.modelValue === current;
};

const isCovered = (current: number) => {
    return (
        (props.modelValue && props.modelValue > current) ||
        currentHover.value > current
    );
};

const isHovered = (current: number) => {
    return currentHover.value === current;
};

const isFocused = (current: number) => {
    return currentFocus.value == current;
};

const state = reactive({
    title: computed(() => {
        return props.tooltips[currentHover.value - 1] || "";
    }),
});

provide("setCurrentHover", setCurrentHover);
provide("name", "rating");
provide("rateState", state);

// v-model functionality
provide("updateModelValue", (current: number) => {
    emit("update:modelValue", current);
});

const range = computed(() => {
    return [...Array(props.count + 1).keys()].slice(-props.count);
});
</script>
