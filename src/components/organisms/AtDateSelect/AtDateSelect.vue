<template>
    <at-dropdown align="right" class="w-full text-left" content-classes="bg-white w-full" :closable="false">
        <template #trigger>
            <div class="date-select">
                <button
                    data-name="button"
                    tabindex="-1"
                    class="flex items-center focus:outline-none" 
                    role="date-picker-trigger"
                    @click.prevent

                >
                    <i class="mr-1 fa fa-calendar"></i>
                    <span class="inline-block w-full ml-1 text-sm font-bold text-left " > 
                        {{ humanDate || placeholder }} 
                    </span>
                    <div class="flex w-full ml-1 space-x-2 text-sm text-left" v-if="date && showTimeResult"> 
                        <span>at</span>
                        <span class="w-20 px-1 font-bold hover:border- hover:bg-gray-50 bg-blend-lighten hover:bg-blend-darken">{{ humanTime }}</span>
                    </div>
                </button>
            </div>
        </template>
        
        <template #content>
            <div class="text-left bg-white border shadow-md">
                <at-date-picker 
                    v-model:date="date" 
                    class="bg-white"
                    :accept-time="acceptTime"
                    @update:date="$emit('update:modelValue', $event)"
                    :shortcuts="shortcuts"
                />
            </div>
        </template>
    </at-dropdown>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs, watch } from "vue";
import { useDateTime } from "../../../utils/useDateTime";
import AtDatePicker from "../AtDatePicker/AtDatePicker.vue";
import AtDropdown from "../../_core/AtCustomDropdown/AtCustomDropdown.vue"; 
import { format } from "date-fns";

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
        acceptTime: {
            type: Boolean,
            default: false
        },
        showTimeResult: {
            type: Boolean,
            default: false
        },
        closeOnSelect: {
            type: Boolean,
            default: true
        },
        timeFormat: {
            type: String,
            default: 'hh:mm a'
        },
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

        const humanTime = computed(() => {
            if (date.value) {
                return format(date.value, props.timeFormat);
            }
            return null
        })

        watch(() => props.modelValue, (value) => {
            date.value = value && typeof value == 'string' ? getDateFromString(value) : value
        }, { immediate: true })


        return {
            ...toRefs(state),
            date,
            humanDate,
            humanTime
        }  
    }
})
</script>
