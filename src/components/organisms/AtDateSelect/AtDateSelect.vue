<template>
    <modal>
        <template #trigger>
            <div class="date-select">
                <button
                    data-name="button"
                    tabindex="-1"
                    class="flex items-center focus:outline-none" 
                    role="date-picker-trigger"

                >
                    <i class="mr-1 fa fa-calendar"></i>
                    <span class="inline-block w-full ml-1 text-sm font-bold text-left capitalize" > {{ humanDate || placeholder }} </span>
                </button>
            </div>
        </template>
        <at-date-picker 
            v-model:date="date" 
            :shortcuts="shortcuts"
        />
    </modal>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useDateTime } from "../../../utils/useDateTime";
import AtDatePicker from "../AtDatePicker/AtDatePicker.vue";
import Modal from "../../third/Modal.vue"; 

export default defineComponent({
    components: {
        AtDatePicker,
        Modal,
    },
    props: {
        modelValue: [Date, String],
        placeholder: String,
        closeOnSelect: {
            type: Boolean,
            default: true
        }
    },
    emits: {
        'update:modelValue': Date
    },
    setup(props, { emit }) {
        const state = reactive({
            shortcuts: [{
                text: 'Today',
                value: new Date(),
                }, {
                text: 'Tomorrow',
                value: (() => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24)
                    return date
                })(),
                }, {
                text: 'Next week',
                value: (() => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                    return date
                })(),
            }],
        })
        const date = ref(null)
        const { humanDate , getDateFromString } = useDateTime(date);

        watch(() => props.modelValue, (value) => {
            date.value = typeof value == 'string' ? getDateFromString(value) : value
        }, { immediate: true })

        return {
            ...toRefs(state),
            date,
            humanDate,
        }  
    }
})

</script>

<style lang="scss">
.date-select {
    .el-date-editor--date, .el-input__inner, .el-input__suffix, .el-input__preffix {
        width: 1px !important;
        opacity: 0;
        padding: 0 0 0 0 !important;
    }

    .el-input__prefix {
        width: 0;
    }

    .el-input__icon {
        width: 0;
    }
}
</style>