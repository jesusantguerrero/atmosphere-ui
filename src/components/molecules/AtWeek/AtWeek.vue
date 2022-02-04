<template>
<div class="relative w-full" :class="{'pl-5': time}" ref="weekline">
    <Controls 
        v-model="state.selectedDay" 
        v-model:week="state.week" 
        v-bind="args"
        :visible-week-days="visibleWeekDays" 
        class="absolute top-0 left-0 z-30 w-full bg-white shadow-md week__header" 
    />
    <div class="flex pt-9 relative">
        <DayItem 
            v-for="(day, index) in visibleWeekDays"
            :day-index="index" 
            :key="day" 
            :day="day" 
            :items="visibleItems" 
            @create="onCreate" 
            @update:soft="$emit('update:soft', $event)" 
            @update="$emit('update', $event)" 
        />     
        <HourPoint />    
    </div>
</div>
</template>

<script setup>
import { useScroll } from '@vueuse/core';
import { addMilliseconds, differenceInMilliseconds, isWeekend, subDays } from 'date-fns';
import { rrulestr } from 'rrule';
import { computed, onMounted, provide, reactive, ref, watch, watchEffect, watchSyncEffect } from 'vue';
import Controls from './Controls.vue';
import DayItem from './DayItem.vue';
import HourPoint from './HourPoint.vue';

const state = reactive({
    selectedDay: new Date(),
    week: null,
})

const props = defineProps({
    args: {
        type: Object,
        default: () => ({
            nextMode: 'week',
            showControls: false,
            highlightToday: true,
            relativeDates: true,
            format: 'MMM dd yyyy'
        })
    },
    items: {
        type: Array,
        default: () => []
    },
    modalControl: {
        type: Boolean,
        default: false,
    },
    hideWeekends: {
        type: Boolean,
        default: false,
    },
    timeFrom: {
        type: Number,
        default: 0
    },
    timeTo: {
        type: Number,
        default: 23 * 60
    },
    timeStep: {
        type: Number,
        default: 30
    },
    time: {
        type: Boolean,
        default: true
    },
});

provide('options', props);
provide('schedulerState', state);

const emit = defineEmits([
    'create',
    'update',
    'delete'
]);

const temporalItems = ref([]);

const visibleItems = computed(() => {
    const events = []; 
    props.items.forEach(scheduleEvent => {
        if (scheduleEvent.recurrence) {
            const duration = differenceInMilliseconds(scheduleEvent.endTime, scheduleEvent.startTime);
            rrulestr(scheduleEvent.recurrence).between(subDays(visibleWeekDays.value[0], 1), visibleWeekDays.value[visibleWeekDays.value.length - 1]).forEach(date => {
                events.push({
                    ...scheduleEvent,
                    startTime: date,
                    endTime: addMilliseconds(date, duration)
                });
            });
        } else {
            events.push(scheduleEvent);
        }
    })
    return [...temporalItems.value, ...events];
});

const onCreate = (item) => {
    if (temporalItems.value.length) {
        temporalItems.value.splice(0, 1, item);
    } else {
        temporalItems.value.push(item);
    }
    emit('create', item);
}

watch(() => props.modalControl, (newValue) => {
    if (!newValue) {
        temporalItems.value = [];
    }
});

const weekline = ref(null);
const setStickyHeaders = () => {
    requestAnimationFrame(() => {
        if (weekLineTop.value >= 40 ) {
            const header = document.querySelector('.week__header')
            header.style.transform = `translate3d(0px, ${weekLineTop.value}px, 1px)`
        } else {
            const header = document.querySelector('.week__header')
            header.style.transform = ``
        }
    })
}
const { y:weekLineTop } = useScroll(weekline, {
    onScroll: setStickyHeaders,
});

const visibleWeekDays = computed(() => {
    return props.hideWeekends && state.week ? state.week.filter(day => !isWeekend(day)) : state.week;
});

onMounted(() => {
    setTimeout(() => {
        document.querySelector('.current-hour-line')?.scrollIntoView({ smooth: true });
    })
});

</script>