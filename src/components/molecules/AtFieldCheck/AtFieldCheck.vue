<template>
    <div class="flex items-center justify-between px-2 py-1 text-gray-500 transition cursor-pointer select-none switch hover:bg-gray-100" @click="$emit('update:modelValue', !modelValue)">
        <label class="cursor-pointer">{{ label }}</label>
        <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', !modelValue)">
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],
    setup() {
        
    },
}
</script>