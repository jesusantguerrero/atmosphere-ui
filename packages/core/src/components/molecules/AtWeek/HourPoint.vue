<template>
    <div 
        class="absolute w-full cursor-pointer current-hour"
        ref="hourPoint"
        :class="[colorClass, isMarked ? 'z-20' : 'z-0']"
        :title="formattedTime"
    >
        <div class="relative"> 
            <div class="absolute flex items-center justify-center w-16 h-8 text-xs font-bold text-gray-500 rounder-md -left-16 -top-4" v-if="!isMarked">
                {{ formattedTime }}
            </div>
            <div class="absolute left-0 w-0.5 h-4 -top-1.5" :class="colorClass" v-else>
            </div>
        </div>
    </div>
</template>

<script setup>
import { differenceInMinutes, format, startOfDay } from 'date-fns';
import { computed, inject, ref, toRefs, watchEffect } from 'vue';
import { useTimeGrid } from '../../../utils/useTimeGrid';

defineProps({
    colorClass: {
        type: String,
        default: 'bg-gray-400'
    },
    isMarked: {
        type: Boolean,
        default: false
    },
})

const schedulerState = inject('schedulerState');
const timestamp = inject('timestamp');
const { selectedDay: day } = toRefs(schedulerState);

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
}
</style>