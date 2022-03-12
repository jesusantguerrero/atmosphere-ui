<template>
<dropdown align="right" width="full" :close-on-click="true">
    <template #trigger>
        <span class="inline-flex w-full rounded-md">
            <button type="button" class="inline-flex items-center justify-between w-full px-3 py-3 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50">
                <span :class="{'text-gray-400': !valueLabel}">  {{ valueLabel || placeholder  }} </span>

                <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </span>
    </template>

    <template #content>
        <div class="w-full">
        <div v-for="option in options" :key="option.name || option" @click="emitValue(option)" class="px-2 py-2 cursor-pointer">
            {{ option.label || option.name || option }}
        </div>
        </div>
    </template>
</dropdown>
</template>

<script setup>
import Dropdown from '../AtDropdown/AtDropdown.vue'
import { computed, ref } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: [String, Object],
        required: true
    },
    emitValue: {
        type: Boolean
    },
    placeholder: {
        type: String,
        default: "Select an option"
    }
})

const emit = defineEmits({
    'update:modelValue': Object
})

const valueLabel = computed(() => {
    const propToSearch = props.emitValue ? 'label' : 'name';
    const selected = props.options.find( (option) => option[propToSearch] == props.modelValue)
    return selected ? selected.label || selected.name : ""
})

const emitValue = (option) => {
    const value = props.emitValue && option ? option.label : option.name || option
    emit('update:modelValue', value)
}
</script>
