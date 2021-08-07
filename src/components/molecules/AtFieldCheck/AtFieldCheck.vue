<template>
    <div 
        role="checkbox" 
        class="flex items-center justify-between px-2 py-1 text-gray-500 transition cursor-pointer select-none switch hover:bg-gray-100" 
        @click="emitUpdate()"
        :aria-checked="modelValue"
    >
        <label class="cursor-pointer" for="switch">{{ label }}</label>
        <at-switch :model-value="modelValue" name="switch" id="switch" />
    </div>
</template>

<script setup>
import AtSwitch from "../../atoms/AtSwitch/AtSwitch.vue";

const props = defineProps({
   modelValue: {
            type: Boolean,
            required: true
        },
        label: {
            type: String,
            required: true
        }
});

const emit = defineEmits(['update:modelValue']);

const emitUpdate = () => {
    emit('update:modelValue', !props.modelValue)
}

</script>