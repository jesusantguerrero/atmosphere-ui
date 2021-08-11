<template>
    <form @submit.prevent class="inline-flex mt-0">
        <at-bare-rate-button :current="0" :select="isSelected(0)"/>
        <slot 
            v-for="current in range" 
            :key="current" 
            :count="count" 
            :current="current+1" 
            :set-current-hover="setCurrentHover" 
            :selected="isSelected(current+1)"
            :hovered="isHovered(current+1)"
            :focused="isFocused(current+1)"
        >
            {{ current }}
        </slot>
    </form>
</template>

<script setup>
import { computed, provide, reactive, ref } from "vue";
import rateProps from "./rateProps";

const props = defineProps({
    ...rateProps,
});

const emit = defineEmits(['update:modelValue']);

// selection ui management
const currentHover = ref(0);
const currentFocus = ref(0);

const setCurrentHover = (current) => {
    currentHover.value = current;
};

const setCurrentFocus = (current) => {
    currentFocus.value = current;
};

const isSelected = (current) => {
    console.log(props.modelValue, current);
    return props.modelValue === current;
}

const isCovered = (current) => {
    return props.modelValue > current || currentHover.value > current
}

const isHovered = (current) => {
    return currentHover.value === current;
}

const isFocused = (current) => {
    return currentFocus.value == current;
}

const state = reactive({
    title: computed(() => {
        return props.tooltips[currentHover.value - 1] || '';
    })
});

provide('setCurrentHover', setCurrentHover)
provide('name', 'rating')
provide('rateState', state)

// v-model functionality
provide('updateModelValue', (current)=> {
    emit('update:modelValue', current)
})

const range = computed(() => {
    return [...Array(props.count).keys()]
});

</script>