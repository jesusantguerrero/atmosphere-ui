<template>
   <div class="grid grid-cols-9 space-x-4">
    <button
      class="px-2 transition-colors bg-white rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-50 focus:outline-none hover:bg-gray-200"
      @click="controls.previous()"
    >
      <i class="fa fa-chevron-left"></i>
    </button>
    <div v-for="day in selectedWeek" :key="day" class="flex items-center justify-center h-20 px-4 py-2 text-center border rounded-md cursor-pointer">
      <span class="font-bold text-gray-500 capitalize transition hover:text-primary"> 
        {{ formatDate(day)}}
      </span>
    </div>
    <button
      class="px-2 transition-colors bg-white rounded-md dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-50 focus:outline-none hover:bg-gray-200"
      @click="controls.next()"
    >
      <i class="fa fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
import { format, isThisWeek} from "date-fns";
import { useWeekPager } from "../../../utils/useWeekPager";
import { watch, toRefs, computed } from "vue";

export default {
  name: "AtWeekControls",
  props: {
    modelValue: {
      type: Date
    },
    week: {
      type: Array
    },
    format: {
      type: String,
      default: 'MMM dd yyyy'
    },
    relativeDates: {
      type: Boolean,
      default: false,
    },
    highlightToday: {
      type: Boolean,
      default: false
    },
    nextMode: {
      type: String,
      default: "day"
    }
  },
  
  setup(props, { emit }) {
    const { modelValue, week, nextMode } = toRefs(props);
    const { controls, selectedWeek, selectedDay} = useWeekPager({
      nextMode: nextMode.value,
      initialDate: modelValue.value
    });

    const isMonthMode = computed(() => nextMode.value == "month");

    // week
    const emitWeek = value => {
      emit("update:week", value);
    };
    watch(week, controls.setWeek, { immediate: true });
    watch(selectedWeek, emitWeek, { immediate: true });

    // Day
    const emitDay = value => {
      emit("update:modelValue", value);
    };
    watch(modelValue,  controls.setDay , { immediate: true });
    watch(selectedDay, emitDay, { immediate: true });

    // viewHelpers
    const getISODate = date => {
      return date.toISOString ? date.toISOString().slice(0, 10) : "";
    };

    const formatDate = (date) => {
      if (props.relativeDates && isThisWeek(date)) {
        // if (isToday(date) || isTomorrow(date) || isYesterday(date)) {
        //   const result = formatRelative(date, new Date())
        //   return result.slice(0, result.search('at'));
        // } else {
          return format(date, 'iiii');
        // }
      }
      return format(date,  props.format)
    }

    return {
      selectedWeek,
      selectedDay,
      isMonthMode,
      // methods
      controls,
      // ui helpers
      getISODate,
      formatDate
    };
  }
};
</script>