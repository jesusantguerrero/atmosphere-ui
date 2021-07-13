<template>
    <div class="px-2 py-2 bg-white border divide-y w-72" role="date-picker">
        <div class="flex flex-wrap">
            <at-field-date-time v-model="date" :include-time="includesTime" :selected="selected=='date'" @click="selected='date'"/>
            <at-field-date-time 
                role="enddate"
                placeholder="pick an end date"
                v-model="endDate" 
                :include-time="includesTime" :selected="selected=='endDate'" v-if="includesEndDate" @click="selected='endDate'"/>
        </div>
        <div>
            <at-calendar :selected="selectedDate" :start-date="date" :end-date="endDate" @selected="setDate" />
        </div>
        <div class="py-1 mt-2" v-if="acceptReminders">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"><i class="fa fa-clock"></i> Remind</div>
        </div>
        <div class="py-2" v-if="shortcuts.length">
            <at-date-action v-for="shortcut in shortcuts" :key="shortcut.text" class="cursor-pointer" @click="setDate(shortcut.value)">
                {{ shortcut.text }}
            </at-date-action>
        </div>
        <div class="py-2" v-if="showSwitches">
            <at-field-check label="Include end" v-model="includesEndDate" v-if="acceptEndDate"/>
            <at-field-check label="Include time" v-model="includesTime"  v-if="acceptTime"/>
        </div>

        <div class="py-1" v-if="timeFormatConfig">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"><i class="fa fa-cog"></i> Date format &amp; timezone</div>
        </div>

        <div class="py-1">
            <AtDateAction>Clear</AtDateAction>
        </div>

        <div class="py-1" v-if="acceptReminders">
            <small class="inline-block w-full px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100">
            <i class="fa fa-question-circle"></i> Learn more about reminders</small>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import AtFieldCheck from '../../molecules/AtFieldCheck/AtFieldCheck.vue'
import AtFieldDateTime from '../../molecules/AtFieldDateTime/AtFieldDateTime.vue'
import AtCalendar from '../../molecules/AtCalendar/AtCalendar.vue'
import AtDateAction from "./AtDateAction.vue"
import { computed, watch } from '@vue/runtime-core'
import { isAfter, isBefore, startOfDay } from 'date-fns'

export default {
    components: { AtFieldCheck, AtFieldDateTime, AtCalendar, AtDateAction },
    props: {
        date: {
            type: [Date, null],
        },
        endDate: {
            type: Date,
        },
        acceptEndDate: {
            type: Boolean,
            default: false,
        },
        acceptTime: {
            type: Boolean,
            default: false,
        },
        acceptReminders: {
            type: Boolean,
            default: false,
        },
        acceptRecurrence: {
            type: Boolean,
            default: false,
        },
        timeFormatConfig: {
            type: Boolean,
            default: false,
        },
        shortcuts: {
            type: Array,
            default() {
                return []
            }
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            date: null,
            endDate: null,
            selected: 'date',
            includesTime: false,
            includesEndDate: false,
            showSwitches: computed(() => {
                return [props.acceptEndDate, props.acceptTime].some(value => value);
            })
        })
        
        watch(() => props.date, () => {
            state.date = props.date || state.date;
        }, { immediate: true })

        watch(() => props.endDate, () => {
            state.endDate = props.endDate;
        }, { immediate: true })

        watch(() => state.includesEndDate, () => {
            state.endDate = state.includesEndDate ? state.date : null;
            state.selected = state.includesEndDate ? 'endDate' : 'date'; 
        })

        const setDate = (date) => {
            if (!props.includesTime) {
                date = startOfDay(date);
            }

            if (state.selected == 'endDate' && state.date && isBefore(date, state.date)) {
                const holder = state.date;
                state.date = date;
                state.endDate = holder;
                state.selected = "date"
            } else if (state.selected == 'date' && state.endDate && isAfter(date, state.endDate)) {
                const holder = state.endDate;
                state.endDate = date;
                state.date = holder;
                state.selected = "endDate"
            } else {
                state[state.selected] = date;
            }

            emit(`update:${state.selected}`, state[state.selected]);
        }

        const selectedDate = computed(() => {
            return state[state.selected];
        })

        return {
            ...toRefs(state),
            setDate,
            selectedDate,
        }
    },
}
</script>