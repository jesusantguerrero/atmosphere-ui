<template>
   <div class="flex justify-between overflow-hidden border-2 border-gray-200 rounded-md h-9 date-pager dark:bg-gray-700 dark:border-gray-600">
    <button
      class="px-2 transition-colors bg-white dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-50 focus:outline-none hover:bg-gray-200"
      @click="controls.previous()"
    >
      <i class="fa fa-chevron-left"></i>
    </button>
    <div v-if="selectedWeek && selectedWeek.length" class="flex items-center text-sm font-bold text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-50">
      {{ formatDate(selectedWeek[0]) }} - {{ formatDate(selectedWeek[6]) }}
    </div>
    <el-date-picker v-model="date" ref="input" type="date" @change="emitDate" v-if="false">
    </el-date-picker>
    <button
      class="px-2 transition-colors bg-white dark:bg-gray-700 dark:text-gray-300 dark:hover:text-gray-50 focus:outline-none hover:bg-gray-200"
      @click="controls.next()"
    >
      <i class="fa fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
import { format } from "date-fns";
import { useDatePager } from "../../../utils/useDatePager";
import { watch, toRefs, computed } from "vue";

export default {
  name: "DatePagerWeek",
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
    nextMode: {
      type: String,
      default: "day"
    }
  },
  
  setup(props, { emit }) {
    const { modelValue, week, nextMode } = toRefs(props);
    const { controls, selectedWeek, selectedDay} = useDatePager({
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

<style lang="scss">
$primary-color: var(--primary-color);

.controls {
  @apply text-left bg-white shadow-lg mb-1 p-2 border-gray-100 border-2;
  border-radius: 12px;
}

.controls-container {
  @apply grid grid-cols-3 pb-3;
  user-select: none;
}

.day-item,
.day-controls {
  @apply text-center capitalize text-gray-600 py-2  cursor-pointer w-20;
  transition: all ease 0.3s;
  border-radius: 0.8rem;
  display: none;

  &:hover {
    @apply text-white;
    background: var(--primary-color);
  }
}

.day-controls {
  @apply flex justify-center items-center text-gray-700;
  &:hover {
    @apply bg-gray-400 text-gray-700;
  }
}

.selected-day {
  @apply visible text-white shadow-lg;
  display: block;
  background: var(--primary-color);
  box-shadow: 4px 4px 6px var(--primary-color-5);
}

@media (min-width: 768px) {
  .controls-container {
    @apply grid-cols-9;
    user-select: none;

    &.month {
      @apply grid-cols-7;
    }
  }

  .day-item {
    display: block;
  }
}
</style>
