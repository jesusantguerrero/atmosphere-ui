<template>
<div class="w-full relative px-5">
    <Controls v-model="selectedDay" v-model:week="week" v-bind="args" class="fixed top-0 left-0 w-full bg-white z-30 shadow-md" />
    <div class="flex mt-5">
        <DayItem v-for="day in week" :key="day" :day="day" :items="items" />         
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useDateTime } from '../../../utils/useDateTime';
import Controls from './Controls.vue';
import DayItem from './DayItem.vue';
const selectedDay = ref(new Date());
const week = ref(null);

defineProps({
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

onMounted(() => {
    setTimeout(() => {
        document.querySelector('.current-hour-line')?.scrollIntoView({ smooth: true });
    })
});
</script>