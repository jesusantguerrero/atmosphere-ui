<template>
<div class="w-full relative" :key="day">
    <DatePoint v-for="item in itemsOfDay" 
        :key="item.id" 
        :item="item"
        :day="day"
    />
    <div v-for="hour in hoursOfDay" :key="hour" :title="hour" class="w-full bg-gray-50 hover:bg-gray-100 transition border px-5 cursor-pointer py-1" :style="hourClass">
    </div>
</div>
</template>

<script setup>
import { differenceInMinutes, startOfDay } from 'date-fns';
import { computed } from 'vue';
import { useDateTime } from '../../../utils/useDateTime';
import DatePoint from './DatePoint.vue';

const props = defineProps({
    day: {
        type: Date,
        default: () => new Date()
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

const itemsOfDay = computed(() => {
    const { formatDate } = useDateTime();
    return props.items.filter(item => {
        return formatDate(new Date(item.startTime)) == formatDate(props.day);
    });
})

const startDateToPixels = (string) => {
    const firstHour = startOfDay(props.day);
    const startDate = new Date(string);
    const offset = differenceInMinutes(startDate, firstHour);
    return secondsToPixels(offset);
}
</script>