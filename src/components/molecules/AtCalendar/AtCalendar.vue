<template>
  <div class="w-full overflow-hidden">
    <header class="flex items-center justify-between py-1">
        <h4 role="monthlabel" class="pl-1"> {{ monthName }}</h4>
        <div class="">
            <button data-test-id="btn-previous" role="button-previous"  class="px-2 py-1 rounded-md hover:bg-gray-200" @click="controls.previous()"><i class="fa fa-chevron-left" /></button>
            <button data-test-id="btn-next" role="button-next" class="px-2 py-1 rounded-md hover:bg-gray-200" @click="controls.next()"><i class="fa fa-chevron-right" /></button>
        </div>
    </header>
    <div class="grid w-full grid-cols-7">
      <div
        v-for="weekDay in weekDays"
        :key="weekDay"
        class="text-sm text-center text-gray-400 capitalize"
      >
        {{ weekDay }}
      </div>
    </div>
    <div class="grid w-full grid-cols-7 gap-1 mt-2">
    <div
        v-for="(day, index) in displayWeek"
        :key="`item-${index}-${day}`"
        class="flex justify-center w-full rounded-md cursor-pointer select-none"
        :class="{
          'hover:bg-gray-200': day, 
          'bg-blue-100' : isBetween(day) && !isSelectedDate(day),
          'bg-gray-400 text-white hover:text-gray-700 font-bold': isSelectedDate(day),
          }"
        @click="emitSelected(day)"
        v-bind="getDayAttributes(day)"
    >
        <span class="block w-full py-1 text-sm text-center" v-if="day" :class="{
          'bg-red-400 text-white font-bold rounded-full': isToday(day) && !isSelectedDate(day),
        }">
            {{ format(day, 'dd') }}
        </span>
    </div>
    </div>

  </div>
</template>

<script setup>
import { computed, toRefs, watch } from "vue";
import { useDatePager } from "../../../utils/useDatePager";
import { format, isSameDay, isToday, isWithinInterval } from "date-fns";

const props = defineProps({
    selected: {
      type: Date,
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
});

const emit = defineEmits({
      selected: Date
});

const {
  controls,
  selectedDay,
  selectedSpan,
} = useDatePager({ 
  nextMode: 'month', 
  initialDate: props.selected || new Date() 
});
    
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const displayWeek = computed(() => {
  const dw = [];
  const daysBefore = selectedSpan.value[0].getDay();
  for (let index = 0; index < daysBefore; index++) {
    dw.push("");
  }
  dw.push(...selectedSpan.value);
  return dw;
});
    
const isSelectedDate = (date) => {
  return date && props.selected ?  format(props.selected, 'yyyyMMdd') === format(date, 'yyyyMMdd') : false;
};

const getDayAttributes = (day) => {
  let role = 'calendar-day';
  if (day && isToday(day)) {
    role = 'today'
  }

  if (isSelectedDate(day)) {
    role = 'selected-day'
  }

  return { 
    role
  }
}

const { selected } = toRefs(props);
watch(selected, () => {
    if (!isSameDay(selectedDay, selected)) {
      controls.setDay(new Date(selected.value));
    }
})

const isBetween = (date) => {
  if (props.startDate && props.endDate && date) {
    return isWithinInterval(date, {
      start: props.startDate, end: props.endDate
    })
  }
}

const emitSelected = (day) => {
    emit('selected', day)
}

const monthName = computed(() => {
    return selectedDay ? format(selectedDay.value, 'MMMM, yyyy') : '';
})
</script>