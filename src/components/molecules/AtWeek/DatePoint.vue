<template>
  <div 
        :key="item.id" 
        class="left-0 absolute bg-red-300 w-full rounded-md px-5 text-white font-bold py-1"
        :style="pointStyles"
    >
        {{ item.title }}
    </div>
</template>

<script setup>
import { differenceInMinutes, startOfDay } from 'date-fns';
import { computed } from 'vue';

const props = defineProps({
    day: {
        type: Date,
        default: () => new Date()
    },
    item: {
        type: Object,
        default: () => {}
    },
});

const pixelMinuteUnit = 0.9;
const minuteToPixels = (minutes) => {
    return minutes * pixelMinuteUnit;
};

const startDateToPixels = (string) => {
    const firstHour = startOfDay(props.day);
    const startDate = new Date(props.item.startTime);
    const offset = differenceInMinutes(startDate, firstHour);
    return minuteToPixels(offset);
}

const itemDuration = computed(() => {
    const startDate = new Date(props.item.startTime);
    const endDate = new Date(props.item.endTime);
    return differenceInMinutes(endDate, startDate);
})

const pointStyles = computed(() => {
    return {
        top: `${startDateToPixels(props.item.startTime)}px`,
        height: `${minuteToPixels(itemDuration.value)}px`
    }
})
</script>