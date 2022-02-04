<template>
  <div 
        class="absolute z-30 w-full bg-red-400 current-hour cursor-pointer"
        ref="hourPoint"
        :title="formattedTime"
    />
</template>

<script setup>
import { differenceInMinutes, format, startOfDay } from 'date-fns';
import { computed, inject, ref, toRefs, watchEffect } from 'vue';
import { useTimestamp } from '@vueuse/core';
import { useTimeGrid } from '../../../utils/useTimeGrid';


const schedulerState = inject('schedulerState');

const { selectedDay: day } = toRefs(schedulerState);
const timestamp = useTimestamp();

const { pixelMinutes, offset } = useTimeGrid(ref(0), day);
const hourPoint = ref();
watchEffect(() => {
    if (hourPoint.value) {
        const firstHour = startOfDay(day.value);
        const currentTime = new Date(timestamp.value);
        offset.value = differenceInMinutes(currentTime, firstHour);

        hourPoint.value.style.top = `${pixelMinutes.value}px`;
    }  
});

const formattedTime = computed(() => {
    return format(timestamp.value, 'h:mm a');
});

</script>

<style>
.current-hour {
    height: 2px;
    background-color: #ff0000;
}
</style>