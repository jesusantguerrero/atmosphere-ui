<template>
    <div class="flex py-1 border border-transparent divide-x" :class="{'border-red-400': isInvalid }">
        <input v-model="date" :time="includeTime" class="w-full px-2 text-sm focus:outline-none" placeholder="mmm dd yyyy" @blur="onBlur"/>
        <input v-model="time" v-if="includeTime" :time="includeTime" class="w-full px-2 text-sm focus:outline-none" placeholder="hh:mm a" />
    </div>
</template>

<script>
import { isValid, toDate, format } from "date-fns"
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
            time: '',
            isInvalid: false,
        });

        const { modelValue } = toRefs(props);

        watch(modelValue, () => {
            state.date = format(props.modelValue, props.format)
            state.time = format(props.modelValue, 'hh:mm');
        }, { immediate: true})

        const validateDate = () => {
            return isValid(Date.parse(state.date));
        }

        const onBlur = () => {
            state.isInvalid = !validateDate();
            if (!state.isInvalid) {
                emit('update:modelValue', toDate(Date.parse(state.date)));
            }
        }
        return {
            ...toRefs(state),
            onBlur,
        }
    },
}
</script>