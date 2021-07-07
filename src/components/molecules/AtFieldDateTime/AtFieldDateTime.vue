<template>
    <div class="flex w-full py-1 transition border border-transparent divide-x" :class="{'border-red-400': isInvalid, 'border-gray-400': isSelected }">
        <input v-model="date" :time="includeTime" class="w-full px-2 text-sm focus:outline-none" placeholder="mmm dd yyyy" @blur="onBlur" ref="dateInput" @click="onFocus"/>
        <input v-model="formattedTime" v-if="includeTime" :time="includeTime" @blur="onBlur" class="w-full px-2 text-sm focus:outline-none" placeholder="hh:mm a" ref="timeInput" @click="onFocus" />
    </div>
</template>

<script>
import { toDate, format } from "date-fns"
import { validateStringDate } from "../../../utils/validators/dateValidator";
import { reactive, ref, toRefs } from '@vue/reactivity'
import { computed, watch } from '@vue/runtime-core';

export default {
    props: {
        modelValue: {
            type: Date,
            required: true
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
        }
    },
    emits: ['update:modelValue', 'update:time'],
    setup(props, {emit}) {
        const state = reactive({
            date: '',
            formattedTime: '',
            isInvalid: false,
            isFocused: false
        });

        const { modelValue } = toRefs(props);

        const validateDate = () => {
            return validateStringDate(`${state.date} ${state.formattedTime}`);
        }
        
        watch(() => modelValue.value, () => {
            state.date = format(props.modelValue, props.format)
            state.formattedTime = format(props.modelValue, 'hh:mm a');
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

        return {
            ...toRefs(state),
            onBlur,
            dateInput,
            timeInput,
            isSelected
        }
    },
}
</script>