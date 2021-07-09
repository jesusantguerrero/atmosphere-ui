<template>
    <div class="px-2 py-2 border divide-y w-72">
        <div class="flex flex-wrap">
            <at-field-date-time v-model="date" :include-time="includesTime" :selected="selected=='date'" @click="selected='date'"/>
            <at-field-date-time v-model="endDate" :include-time="includesTime" :selected="selected=='endDate'" v-if="includesEndDate" @click="selected='endDate'"/>
        </div>
        <div>
            <at-calendar :selected="selectedDate" :start-date="date" :end-date="endDate" @selected="setDate" />
        </div>
        <div class="py-1 mt-2" v-if="acceptReminders">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"><i class="fa fa-clock"></i> Remind</div>
        </div>
        <div class="py-2" v-if="showSwitches">
            <at-field-check label="Include end" v-model="includesEndDate" v-if="acceptEndDate"/>
            <at-field-check label="Include time" v-model="includesTime"  v-if="acceptTime"/>
        </div>

        <div class="py-1" v-if="timeFormatConfig">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"><i class="fa fa-cog"></i> Date format &amp; timezone</div>
        </div>

        <div class="py-1">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100">Clear</div>
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
import { computed, watch } from '@vue/runtime-core'
import { isAfter, isBefore } from 'date-fns'

export default {
    components: { AtFieldCheck, AtFieldDateTime, AtCalendar },
    props: {
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
    },
    setup(props) {
        const state = reactive({
            date: new Date(),
            endDate: null,
            selected: 'date',
            includesTime: false,
            includesEndDate: false,
            showSwitches: computed(() => {
                return [props.acceptEndDate, props.acceptTime].some(value => value);
            })
        })
        
        watch(() => state.includesEndDate, () => {
            state.endDate = state.includesEndDate ? state.date : null;
            state.selected = state.includesEndDate ? 'endDate' : 'date'; 
        })

        const setDate = (date) => {
            if (state.selected == 'endDate' && state.date && isBefore(date, state.date)) {
                const holder = state.date;
                state.date = date;
                state.endDate = holder;
                state.selected = "date"
                return
            }
            if (state.selected == 'date' && state.endDate && isAfter(date, state.endDate)) {
                const holder = state.endDate;
                state.endDate = date;
                state.date = holder;
                state.selected = "endDate"
                return
            }
            state[state.selected] = date;
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