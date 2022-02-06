<template>
  <div>
    <div class="flex controls__header justify-between w-full mx-4">
      <div class="font-bold text-xl text-gray-500">{{ currentMonth }}</div>
      <div>

        <div class="w-20 flex space-x-1 mr-5">
          <button
            class="px-2 rounded-md transition-colors bg-white focus:outline-none hover:bg-gray-200"
            @click="controls.previous()"
            v-if="showControls"
          >
            <i class="fa fa-chevron-left"></i>
          </button>
          <button
            class="px-2 rounded-md transition-colors bg-white  focus:outline-none hover:bg-gray-200"
            @click="controls.next()"
            v-if="showControls"
          >
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="flex">
      <div
        class="flex items-center justify-center w-16 h-10 px-4 py-2 text-center cursor-pointer "
        v-if="options.time"
      >
        <span
          class="font-bold text-center text-gray-500 capitalize transition  hover:text-primary"
        >
          HR
        </span>
      </div>
      <div
        v-for="day in visibleWeekDays"
        :key="day"
        class="flex items-center justify-center w-full h-10 px-4 py-2 text-center cursor-pointer "
      >
        <span
          class="font-bold text-gray-500 capitalize transition hover:text-primary"
        >
          {{ formatDate(day) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format, isThisWeek } from "date-fns";
import { useDatePager } from "../../../utils/useDatePager";
import { watch, toRefs, inject, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Date,
  },
  week: {
    type: Array,
  },
  format: {
    type: String,
    default: "MMM dd yyyy",
  },
  relativeDates: {
    type: Boolean,
    default: false,
  },
  highlightToday: {
    type: Boolean,
    default: false,
  },
  nextMode: {
    type: String,
    default: "day",
  },
  showControls: {
    type: Boolean,
    default: true,
  },
  visibleWeekDays: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["input", "change"]);

const options = inject("options", {});
const { modelValue, week, nextMode } = toRefs(props);
const { controls, selectedWeek, selectedDay } = useDatePager({
  nextMode: nextMode.value,
  initialDate: modelValue.value,
});

// week
const emitWeek = (value) => {
  emit("update:week", value);
};
watch(week, controls.setWeek, { immediate: true });
watch(selectedWeek, emitWeek, { immediate: true });

// Day
const emitDay = (value) => {
  emit("update:modelValue", value);
};
watch(modelValue, controls.setDay, { immediate: true });
watch(selectedDay, emitDay, { immediate: true });

// viewHelpers
const getISODate = (date) => {
  return date.toISOString ? date.toISOString().slice(0, 10) : "";
};

const formatDate = (date) => {
  if (props.relativeDates && isThisWeek(date)) {
    return format(date, "eee dd");
  }
  return format(date, props.format);
};

const currentMonth = computed(() => {
  return format(selectedDay.value, "MMMM yyyy");
})
</script>
