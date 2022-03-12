<template>
   <input
        :value="modelValue"
        @input="onInput"
        @focus="onFocus"
        ref="input"
        class="px-4 text-gray-400 form-control input"
        :class="{ 'border-red-400 border-2': hasError }"
    />
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps(['modelValue', 'hasError']);
const emit =defineEmits(['update:modelValue']);

const input = ref<HTMLInputElement>();
const onFocus = () => {
    input.value?.focus()
}

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value)
}
</script>

