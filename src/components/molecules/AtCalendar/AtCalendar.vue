<template>
  <div class="w-full overflow-hidden">
    <header class="flex items-center justify-between py-1">
        <h4 role="monthlabel"> {{ monthName }}</h4>
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
        v-for="day in displayWeek"
        :key="`item-${day}`"
        class="flex justify-center w-full py-1 rounded-md cursor-pointer"
        :class="{'hover:bg-gray-200': day, 'bg-gray-400 text-white hover:text-gray-700 font-bold': isSelectedDate(day)}"
        @click="emitSelected(day)"
        v-bind="getDayAttributes(day)"
    >
        <span class="block text-sm text-center" v-if="day">
            {{ format(day, 'dd') }}
        </span>
    </div>
    </div>

  </div>
</template>

<script>
import { computed, toRefs, watch } from "@vue/runtime-core";
import { useWeekPager } from "../../../utils/useWeekPager";
import { format, isSameDay } from "date-fns";

export default {
  props: {
    selected: {
        type: Date,
    }
  },
  emits: {
      selected: Date
  },
  setup(props, { emit }) {
    const {
      controls,
      selectedDay,
      selectedWeek,
    } = useWeekPager({ nextMode: 'month', initialDate: props.selected || new Date() });
    
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const displayWeek = computed(() => {
      const dw = [];
      const daysBefore = selectedWeek.value[0].getDay();
      for (let index = 0; index < daysBefore; index++) {
        dw.push("");
      }
      dw.push(...selectedWeek.value);
      return dw;
    });
    
    const isSelectedDate = (date) => {
      return date ? format(props.selected, 'yyyyMMdd') === format(date, 'yyyyMMdd') : false;
    };

    const getDayAttributes = (day) => {
      return { role: isSelectedDate(day) ? 'selected-day' : 'calendar-day'}
    }

    const { selected } = toRefs(props);
    watch(selected, () => {
        if (!isSameDay(selectedDay, selected)) {
            controls.setDay(new Date(selected.value));
        }
    })

    const emitSelected = (day) => {
        emit('selected', day)
    }

    const monthName = computed(() => {
        return selectedDay ? format(selectedDay.value, 'MMMM, yyyy') : '';
    })

    return {
      weekDays,
      selectedWeek,
      controls,
      displayWeek,
      format,
      isSelectedDate,
      getDayAttributes,
      monthName,
      emitSelected,
    };
  },
};
</script>

<style></style>
