<template>
  <div 
        class="w-full h-1 bg-red-400 absolute z-20 current-hour-line"
        :style="pointStyles"
        :title="formattedTime"
    />
</template>

<script setup>
import { differenceInMinutes, format, startOfDay } from 'date-fns';
import { computed, inject, ref, watchEffect } from 'vue';
import { useTimestamp } from '@vueuse/core';

const pixelMinuteUnit = 0.9;
const minuteToPixels = (minutes) => {
    return minutes * pixelMinuteUnit;
};

const day = inject('day');

const timestamp = useTimestamp();

const startDateToPixels = (currentTime) => {
    const firstHour = startOfDay(day);
    const startDate = new Date(currentTime);
    const offset = differenceInMinutes(startDate, firstHour);
    return minuteToPixels(offset);
}

const getPointStyles = (currentTime) => {
    return {
        top: `${startDateToPixels(currentTime)}px`,
    }
}
const pointStyles = ref(getPointStyles(timestamp.value));
watchEffect(() => {
    pointStyles.value = getPointStyles(timestamp.value);
});

const formattedTime = computed(() => {
    return format(timestamp.value, 'h:mm a');
});

</script>