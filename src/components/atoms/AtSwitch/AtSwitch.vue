<template>
<div 
    class="block w-10 h-5 rounded-full cursor-pointer" 
    :class="localState ? activeClass : disabledClass"
    v-bind="$attrs"
    role="switch"
    :aria-checked="localState"
    @click="emitUpdate()"
>
    <span
        :class="localState ? 'translate-x-5' : 'translate-x-0'" 
        class="block w-5 h-5 transition duration-200 ease-in-out transform bg-white border rounded-full pointer-events-none" />
</div>
<span class="text-sm"> {{ activeText }}</span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

    const props = defineProps({
        modelValue: {
            required: true,
            type: Boolean
        },
        disabledClass: {
            type: String,
            default: 'bg-gray-400'
        },
        activeClass: {
            type: String,
            default: 'bg-green-400'
        },
        activeText: {
            type: String,
            default: ''
        }
    });
    const emit = defineEmits(['update:modelValue'])
    const localState = ref(false);

    watch(() => props.modelValue, () => {
        if (localState.value != props.modelValue) {
            localState.value = props.modelValue
        }
    }, { immediate: true})
    
    const emitUpdate = () => {
        localState.value = !localState.value;
        emit('update:modelValue', localState.value)
    }
</script>

