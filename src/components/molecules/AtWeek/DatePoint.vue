<template>
  <div 
        :key="item.id" 
        class="absolute left-0 z-10 w-11/12 px-5 py-1 overflow-hidden font-bold text-white transition border"
        ref="datePoint"
        :class="itemClasses"
        @dblclick="emit('update', item)"
    >
        {{ item.title }}
        <div class="text-xs">
            {{ formatTime(localItem.startTime)}} - {{ formatTime(localItem.endTime) }}
        </div>
    </div>
</template>

<script setup>
import { addMinutes, differenceInMinutes, format, startOfDay } from 'date-fns';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import '@interactjs/auto-start'
import '@interactjs/actions/drag'
import '@interactjs/actions/resize'
import '@interactjs/modifiers'
import '@interactjs/dev-tools'
import interact from '@interactjs/interact'
import { useTimeGrid, minutesToPixelsFunc, pixelsToMinutesFunc } from '../../../utils/useTimeGrid';

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

const emit = defineEmits([
    'update',
    'update:soft',
    'delete'
]);

const datePoint = ref();

const itemClasses = computed(() => {
    return props.item.class || `bg-blue-400`;
})

const localItem = reactive({
    startTime: props.item.startTime,
    endTime: props.item.endTime
});


const startDateToPixels = () => {
    const firstHour = startOfDay(props.day);
    const startDate = new Date(props.item.startTime);
    const offset = differenceInMinutes(startDate, firstHour);
    return minutesToPixelsFunc(offset);
}

const getDuration = () => {
    const startDate = new Date(props.item.startTime);
    const endDate = new Date(props.item.endTime);
    const duration = differenceInMinutes(endDate, startDate);
    return duration;
} 

const formatTime = (date) => {
    return date ? format(date, 'hh:mm a') : "";
}

// 
const itemDuration = computed(() => {
    const startDate = new Date(props.item.startTime);
    const endDate = new Date(props.item.endTime);
    return differenceInMinutes(endDate, startDate);
})

const setPointStyles = () => {   
    if (!datePoint?.value) return; 
    const { pixelMinutes } = useTimeGrid(itemDuration, props.day);
    datePoint.value.style.transform = `translateY(${startDateToPixels(localItem.startTime)}px)`,
    datePoint.value.style.height = `${pixelMinutes.value}px`
    datePoint.value.setAttribute('data-y', startDateToPixels(localItem.startTime));
};

watch(() => props.item, (newValue) => {
    localItem.startTime = newValue.startTime;
    localItem.endTime = newValue.endTime;
    setPointStyles();
});

const updateTimes = (top, shouldEmit) => {
    const startTime = pixelsToMinutesFunc(top, props.day);
    const endTime =  addMinutes(startTime, getDuration());
    localItem.startTime = startTime;
    localItem.endTime = endTime;
    if (shouldEmit) {
        const newItem = 
        {
            ...props.item, 
            ...localItem 
        }
        emit('update:soft', newItem);
    }
}

onMounted(() => {
    setPointStyles();
    const dragMoveListener = (event) => {
        const target = event.target;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        target.setAttribute('data-y', y);
        target.style.transform = `translateY(${y}px)`;
        updateTimes(y, false);
    };

    interact(datePoint.value).draggable({
        startAxis: 'y',
        lockAxis: 'y',
        modifiers: [
            interact.modifiers.snap({
                targets: [
                    interact.snappers.grid({ x: minutesToPixelsFunc(15), y: minutesToPixelsFunc(1) })
                ],
                range: Infinity,
                relativePoints: [ { x: 0, y: 0 } ]
            }),
            interact.modifiers.restrict({
                restriction: datePoint.value.parentNode,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                endOnly: true
            })
        ],
        listeners: {
            move: dragMoveListener,
            end (event) {
                const y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;
                updateTimes(y, true);
            }
        }
    });
})
</script>