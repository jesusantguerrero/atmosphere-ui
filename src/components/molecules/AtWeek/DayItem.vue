<template>
<div class="relative w-full bg-green-500" :key="day">
    <DatePoint v-for="item in itemsOfDay" 
        :key="item.id" 
        :item="item"
        :day="day"
        @update="emit('update', item)"
        @update:soft="emit('update:soft', $event)"
        class="cursor-pointer"
    />
    <HourPoint v-if="isCurrentDay" color-class="bg-red-500" :is-marked="true" />
    <div  @click="emitCreatePoint(hour)" v-for="hour in hoursOfDay" :key="hour" :title="hour" class="relative w-full px-5 py-1 transition border cursor-pointer bg-gray-50 hover:bg-gray-100" :style="hourClass">
        <div class="absolute -left-5 -top-2.5 text-xs z-20" v-if="isFirstDay">
            {{ formatHour(hour) }} {{ getMeridian(hour) }}
        </div>
    </div>
</div>
</template>

<script setup>
import { addHours, isToday } from 'date-fns';
import { computed, inject, provide, ref } from 'vue';
import { useDateTime } from '../../../utils/useDateTime';
import DatePoint from './DatePoint.vue';
import { useTimeGrid } from '../../../utils/useTimeGrid';
import HourPoint from './HourPoint.vue';

const props = defineProps({
    day: {
        type: Date,
        default: () => new Date()
    },
    dayIndex: {
        type: Number,
        default: () => 0
    },
    items: {
        type: Array,
        default: () => []
    },
});

const emit = defineEmits([
    'create',
    'update',
    'update:soft',
    'delete'
]);

const timeFrom = inject('timeFrom', 0);
const timeTo = inject('timeTo', 0);
const timeStep = inject('timeStep', 0);

const hoursOfDay = computed(() => {
    return [...Array(24).keys()]
});

const defaultMinutes = ref(60);
const { pixelMinutes } = useTimeGrid(defaultMinutes, props.day);
const hourClass = computed(() => {
    return {
        height: `${pixelMinutes.value}px`
    }
});

const itemsOfDay = computed(() => {
    const { formatDate } = useDateTime();
    return props.items.filter(item => {
        return formatDate(new Date(item.startTime)) == formatDate(props.day);
    });
})
const options = inject('options', {});
const isFirstDay = computed(() => {
    return options.time && props.dayIndex == 0;
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

const emitCreatePoint = (hour) => {
    let startTime = props.day;
    startTime.setHours(hour, 0, 0, 0);
    const endTime = addHours(startTime, 1);

    const draftItem = {
        id: 'new',
        title: '(no title)',
        description: '(no description)',
        startTime: startTime,
        endTime: endTime,
        startDate: props.day,
        endDate: props.day,
    };

  emit('create', draftItem);
}
</script>