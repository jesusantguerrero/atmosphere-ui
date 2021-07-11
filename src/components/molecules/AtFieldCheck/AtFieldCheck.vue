<template>
    <div 
        role="checkbox" 
        class="flex items-center justify-between px-2 py-1 text-gray-500 transition cursor-pointer select-none switch hover:bg-gray-100" 
        @click="$emit('update:modelValue', !modelValue)"
        :aria-checked="modelValue"
    >
        <label class="cursor-pointer">{{ label }}</label>
        <at-switch v-model="modelValue" @update:modelValue="$emit('update:modelValue', $event)" />
    </div>
</template>

<script>
import AtSwitch from "../../atoms/AtSwitch/AtSwitch.vue";

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
    components: {
        AtSwitch
    },
    emits: ['update:modelValue']
}
</script>