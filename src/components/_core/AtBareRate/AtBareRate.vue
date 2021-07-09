<template>
    <div>
        <slot 
            v-for="current in range" :key="current" 
            :max="max" :min="min" :current="current+1" 
            :set-current-hover="setCurrentHover" 
            :selected="isSelected(current)"
        >
            {{ current }}
        </slot>
    </div>
</template>

<script setup>
import { computed, provide, ref } from "vue";

const props = defineProps({
    modelValue: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        default: 5
    },
    min: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['update:modelValue']);

// selection ui management
const currentHover = ref(0);
const setCurrentHover = (current) => {
    currentHover.value = current;
};
const isSelected = (current) => {
    return props.modelValue > current || currentHover.value > current
}

provide('setCurrentHover', setCurrentHover)

// v-model functionality
provide('updateModelValue', (current)=> {
    emit('update:modelValue', current)
})

const range = computed(() => {
    return [...Array(props.max).keys()]
});

</script>