<template>
   <div class="flex">
    <button
      class="px-2 w-64 transition-colors bg-white dark:text-gray-300  focus:outline-none hover:bg-gray-200"
      @click="controls.previous()"
      v-if="showControls"
    >
      <i class="fa fa-chevron-left"></i>
    </button>
    <div v-for="day in selectedWeek" :key="day" class="flex w-full items-center justify-center h-10 px-4 py-2 text-center cursor-pointer">
      <span class="font-bold text-gray-500 capitalize transition hover:text-primary"> 
        {{ formatDate(day)}}
      </span>
    </div>
    <button
      class="px-2 w-64 transition-colors bg-white focus:outline-none hover:bg-gray-200"
      @click="controls.next()"
      v-if="showControls"
    >
      <i class="fa fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
import { format, isThisWeek} from "date-fns";
import { useDatePager } from "../../../utils/useDatePager";
import { watch, toRefs } from "vue";

const props = defineProps({
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
    },
    showControls: {
      type: Boolean,
      default: true
    }
});

const emit = defineEmits([
    "input",
    "change"
]);

const { modelValue, week, nextMode } = toRefs(props);
const { controls, selectedWeek, selectedDay} = useDatePager({
  nextMode: nextMode.value,
  initialDate: modelValue.value
});

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
      return format(date, 'eeee');
  }
  return format(date,  props.format)
}
</script>