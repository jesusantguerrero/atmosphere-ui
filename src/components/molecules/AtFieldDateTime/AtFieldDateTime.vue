<template>
    <div class="relative flex w-full py-1 transition border-2 border-transparent divide-x rounded-md" ref="dateTimeField" :class="{'border-red-400 bg-red-50': isInvalid, 'border-gray-400': isSelected }">
        <div class="absolute top-0 px-2 py-1 text-sm text-white bg-black rounded-md -right-24" role="error" v-if="isInvalid">Invalid date</div>
        <input v-model="date" :time="includeTime" class="w-full px-2 text-sm bg-transparent focus:outline-none" placeholder="mmm dd yyyy" @blur="onBlur" ref="dateInput" @click="onFocus" />
        <input v-model="formattedTime" v-if="includeTime" :time="includeTime" @blur="onBlur" class="w-full px-2 text-sm focus:outline-none" placeholder="hh:mm a" ref="timeInput" @click="onFocus" />
    </div>
</template>

<script setup>
import { reactive, ref, toRefs, computed, watch } from 'vue'
import { toDate, format } from "date-fns"
import { validateStringDate } from "../../../utils/validators/dateValidator";

const props = definePros({
        modelValue: {
            type: [Date, null]
        },
        includeTime: {
            type: Boolean,
            default: false,
        },
        time: {
            type: Date,
            required: false,
        },
        format: {
            type: String,
            default: 'MMM dd, yyyy'
        },
        selected: {
            type: Boolean
        },
        hasError: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String
        }
})

const emit = defineEmits(['update:modelValue', 'update:time', 'update:hasError'])

const state = reactive({
    date: '',
    formattedTime: '',
    isInvalid: false,
    isFocused: false
})

const { modelValue } = toRefs(props);

const validateDate = () => {
    return validateStringDate(`${state.date} ${state.formattedTime}`);
}
        
watch(() => modelValue.value, () => {
    const date = props.modelValue || new Date();
    state.date = format(date, props.format)
    state.formattedTime = format(date, 'hh:mm a');
    state.isInvalid = !validateDate();
}, { immediate: true})

const onBlur = () => {
    state.isInvalid = !validateDate();
    if (!state.isInvalid) {
        state.isFocused = false;
        emit('update:modelValue', toDate(Date.parse(`${state.date} ${state.formattedTime}`)));
    }
}

// focus
const dateInput = ref(null);
const timeInput = ref(null);
const onFocus = () => {
    state.isFocused = true;
    emit('click');
}

const isSelected = computed(() => {
    return state.isFocused || props.selected;
})

// Error state
watch(() => props.hasError, () => {
    state.isInvalid = props.hasError;
}, { immediate: true})

watch(() => state.isInvalid, () => {
    if (state.isInvalid != props.hasError) {
        emit('update:hasError', state.isInvalid);
    }
}, { immediate: true})

const { date, formattedTime, isInvalid   } = toRefs(state)
</script>