<template>
<div class="w-full relative" :key="day">
    <DatePoint v-for="item in itemsOfDay" 
        :key="item.id" 
        :item="item"
        :day="day"
    />
    <HourPoint v-if="isCurrentDay" />
    <div v-for="hour in hoursOfDay" :key="hour" :title="hour" class="w-full bg-gray-50 hover:bg-gray-100 transition border px-5 cursor-pointer py-1 relative" :style="hourClass">
        <div class="absolute -left-5 -top-2.5 text-xs z-20" v-if="isFirstDay">
            {{ formatHour(hour) }} {{ getMeridian(hour) }}
        </div>
    </div>
</div>
</template>

<script setup>
import { isSunday, isToday } from 'date-fns';
import { computed, onMounted, provide } from 'vue';
import { useDateTime } from '../../../utils/useDateTime';
import DatePoint from './DatePoint.vue';
import HourPoint from './HourPoint.vue';

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

const isFirstDay = computed(() => {
    return isSunday(props.day);
})

const getMeridian = (hour) => {
    return hour > 12 ? 'PM' : 'AM';
}

const formatHour = (hour) => {
    return hour > 12 ? hour - 12 : hour;
}

const isCurrentDay = computed(() => {
    return isToday(props.day);
})

provide('day', props.day);
</script>