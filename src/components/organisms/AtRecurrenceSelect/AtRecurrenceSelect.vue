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
                    <span class="inline-block w-full text-sm font-bold text-left capitalize" > {{ recurrenceText }} </span>
                </button>
            </div>
        </template>
        <div>
            <at-recurrence-form
                :date="date"
                :schedule="schedule" 
                @submit="handleSubmit"
            />
        </div>
    </modal>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useDateTime } from "../../../utils/useDateTime";
import AtDatePicker from "../AtDatePicker/AtDatePicker.vue";
import Modal from "../../third/Modal.vue"; 
import AtRecurrenceForm from "./AtRecurrenceForm.vue";

export default defineComponent({
    components: {
        AtDatePicker,
        AtRecurrenceForm,
        Modal,
    },
    props: {
        modelValue: [Date, String],
        placeholder: String
    },
    emits: {
        'update:modelValue': Date
    },
    setup(props, { emit }) {
        const state = reactive({
            options: [
                {
                    label: 'Does not repeat'
                },
                {
                    label: 'Weekly on ${day}'
                }
            ]
        })
        const date = ref(null)
        const recurrenceText = computed(() => {
            return props.schedule ? 'Repeating' : 'No repeat';
        })

        watch(() => props.modelValue, (value) => {
            date.value = typeof value == 'string' ? getDateFromString(value) : value
        }, { immediate: true })

        return {
            ...toRefs(state),
            date,
            recurrenceText,
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