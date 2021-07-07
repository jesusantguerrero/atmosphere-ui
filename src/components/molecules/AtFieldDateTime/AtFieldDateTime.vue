<template>
    <div class="flex py-1 border border-transparent divide-x" :class="{'border-red-400': isInvalid }">
        <input v-model="date" :time="includeTime" class="w-full px-2 text-sm focus:outline-none" placeholder="mmm dd yyyy" @blur="onBlur" />
        <input v-model="formattedTime" v-if="includeTime" :time="includeTime" @blur="onBlur" class="w-full px-2 text-sm focus:outline-none" placeholder="hh:mm a" />
    </div>
</template>

<script>
import { toDate, format } from "date-fns"
import { validateStringDate } from "../../../utils/validators/dateValidator";
import { reactive, toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';

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
        }
    },
    emits: ['update:modelValue', 'update:time'],
    setup(props, {emit}) {
        const state = reactive({
            date: '',
            formattedTime: '',
            isInvalid: false,
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
                emit('update:modelValue', toDate(Date.parse(`${state.date} ${state.formattedTime}`)));
            }
        }

        return {
            ...toRefs(state),
            onBlur,
        }
    },
}
</script>