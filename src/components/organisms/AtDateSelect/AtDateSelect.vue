<template>
    <at-dropdown align="right" width="full" content-classes="bg-white" :closable="false">
        <template #trigger>
            <div class="date-select">
                <button
                    data-name="button"
                    tabindex="-1"
                    class="flex items-center focus:outline-none" 
                    role="date-picker-trigger"

                >
                    <i class="mr-1 fa fa-calendar"></i>
                    <span class="inline-block w-full ml-1 text-sm font-bold text-left " > {{ humanDate || placeholder }} </span>
                </button>
            </div>
        </template>
        
        <template #content>
            <at-date-picker 
                v-model:date="date" 
                class="bg-white"
                @update:date="$emit('update:modelValue', $event)"
                :shortcuts="shortcuts"
            />
        </template>
    </at-dropdown>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useDateTime } from "../../../utils/useDateTime";
import AtDatePicker from "../AtDatePicker/AtDatePicker.vue";
import AtDropdown from "../../_core/AtCustomDropdown/AtCustomDropdown.vue"; 

export default defineComponent({
    components: {
        AtDatePicker,
        AtDropdown,
    },
    props: {
        modelValue: [Date, String, null],
        placeholder: {
            type: String,
            default: 'Select a date'
        },
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
            date.value = value && typeof value == 'string' ? getDateFromString(value) : value
        }, { immediate: true })

        return {
            ...toRefs(state),
            date,
            humanDate,
        }  
    }
})
</script>
