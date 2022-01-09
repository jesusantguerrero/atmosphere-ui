<template>
<div class="w-full">
    <AtWeekControls v-model="selectedDay" v-model:week="week" v-bind="args" />
    <div class="flex">
        <DayItem v-for="day in week" :key="day" :day="day" :items="items" />         
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useDateTime } from '../../../utils/useDateTime';
import AtWeekControls from './AtWeekControls.vue';
import DayItem from './DayItem.vue';
const selectedDay = ref(new Date());
const week = ref(null);

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
});

const pixelSecondUnit = 0.9;
const secondsToPixels = (seconds) => {
    return seconds * pixelSecondUnit;
};

const hoursOfDay = [...Array(24).keys()];
const hourClass = {
    height: `${secondsToPixels(60)}px`
};

const getForDate = (date) => {
    const { formatDate } = useDateTime();
    return props.items.filter(item => {
        return formatDate(new Date(item.startDate)) == formatDate(date);
    });
}
</script>