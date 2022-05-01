<template>
<div :class="`flex w-full overflow-hidden ${inputClasses}`">
    <div
        v-for="option in options"
        :key="option.value"
        @click="$emit('update:modelValue', option.value)"
        class="px-5 py-1 font-bold text-center cursor-pointer hover:bg-gray-200"
        :class="[modelValue == option.value ? colorClass : 'text-gray-500 bg-gray-100', !compact && 'w-full' ]"
    >
        {{ option.label }}
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CommonInputProps } from "../../../utils/props"

const props = defineProps({
    ...CommonInputProps,
    modelValue: {
        type: String,
        required: true
    },
    options: {
        type: Array as () => Array<{ value: string, label: string }>,
        default: () => []
    },
    compact: Boolean,
})

const colorClass = computed(() => {
    const typeColors: Record<string, string> = {
        primary: 'bg-primary-500 hover:bg-primary-500 text-white',
        notice: 'bg-blue-500 hover:bg-blue-500 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-500 text-white',
        success: 'bg-green-500 hover:bg-green-500 text-white',
        warning: 'bg-yellow-500 hover:bg-green-500 text-white',
        danger: 'bg-red-500 hover:bg-red-500 text-white'
    }

    return typeColors[props.theme] || typeColors.notice
})

const inputClasses = computed(() => {
    const disabledClasses = props.disabled ? 'cursor-not-allowed opacity-50' : '';
    const borderClasses = props.isBorderless ? 'border-none' : 'border border-gray-300';
    const formClasses = props.rounded ? 'rounded-md overflow-hidden' : '';

    return [disabledClasses,  borderClasses, formClasses];
});
</script>

<style lang="scss">
.at {
    .hover-effect {
        max-height: 37px;
    }
    &:hover {
       .hover-effect {
           background: rgba(0,0,0, .1);
       }
    }
    &:disabled {
        
    }
}

</style>
