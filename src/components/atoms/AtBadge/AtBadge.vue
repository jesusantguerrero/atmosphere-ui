<template>
<span class="px-4 py-1 text-sm font-bold rounded-full" :class="colorClasses">
    <slot></slot>
</span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        validator(value: string) {
            const classes = ['primary', 'secondary', 'danger', 'success', 'warning', 'gray'];
            return classes.includes(value);
        },
        default: 'primary'
    } 
});

const colorClasses = computed(() => {
    const colors: Record<string, string> = {
        primary: 'bg-primary-100 text-primary-400',
        accent: 'bg-accent-100 text-accent-400',
        secondary: 'bg-gray-100 text-gray-400',
        danger: 'bg-red-100 text-red-400',
        warning: 'bg-yellow-100 text-yellow-400',
        success: 'bg-green-100 text-green-400'
    }
    return colors[props.type] ?? colors.primary;
})
</script>
