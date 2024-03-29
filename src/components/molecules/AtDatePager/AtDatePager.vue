<script setup lang="ts">
import { format } from "date-fns";
import { useDatePager } from "vueuse-temporals";
import { watch, toRefs, computed } from "vue";
import { isSameDate } from "~utils/useDateTime";

import { PagerSizes } from "./constants";
// viewHelpers
const formatDate = (date) => {
  return format(date, props.format);
};

const props = defineProps({
  modelValue: {
    type: Date,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  dateSpan: {
    type: Array,
  },
  format: {
    type: String,
    default: "MMM dd yyyy",
  },
  nextMode: {
    type: String,
    default: "day",
  },
  controlsClass: {
    type: String,
    default: "bg-white hover:bg-gray-200",
  },
  iconsOnly: {
    type: Boolean,
  },
  size: {
    type: String,
    validator(value: string) {
      return Object.keys(PagerSizes).includes(value);
    },
    default: "medium",
  },
});

const emit = defineEmits([
  "update:modelValue",
  "update:dateSpan",
  "update:startDate",
  "update:endDate",
  "change",
]);
const { modelValue, dateSpan, nextMode, startDate, endDate } = toRefs(props);
const {
  controls,
  selectedSpan,
  selectedDay,
  startDate: selectedStartDate,
  endDate: selectedEndDate,
} = useDatePager({
  nextMode: nextMode.value,
  initialDate: modelValue.value,
});

const emitChange = (mode) => {
  if (mode == "next") {
    controls.next();
  } else {
    controls.previous();
  }
  emit("change", [startDate.value, endDate.value]);
};

// dateSpan
const emitDateSpan = (value) => {
  emit("update:dateSpan", value);
};
watch(dateSpan, controls.setDateSpan, { immediate: true });
watch(selectedSpan, emitDateSpan, { immediate: true });

// Day
const emitDay = (value) => {
  if (!isSameDate(value, modelValue.value)) {
    emit("update:modelValue", value);
  }
};

watch(
  () => props.nextMode,
  () => {
    controls?.setMode(props.nextMode);
  }
);

watch(
  modelValue,
  (date) => {
    controls.setDay(date);
  },
  { immediate: true }
);

watch(
  startDate,
  (date) => {
    controls.setDay(date);
  },
  { immediate: true }
);

watch(selectedDay, emitDay, { immediate: true });
watch(
  selectedStartDate,
  (value) => {
    if (!isSameDate(value, startDate.value)) {
      emit("update:startDate", selectedStartDate.value)
    }
  },
  {
    immediate: true,
  }
);

watch(
  selectedEndDate,
  (value) => {
  if (!isSameDate(value, endDate.value)) {
      emit("update:endDate", selectedEndDate.value);
  }
}, {
  immediate: true,
});

const sizeClass = computed(() => {
  const widthClass = props.iconsOnly ? "w-14" : "";
  return [PagerSizes[props.size], widthClass];
});
</script>

<template>
  <div
    class="flex justify-between overflow-hidden text-gray-500 bg-white border-2 border-gray-200 rounded-md date-pager"
    :class="sizeClass"
  >
    <button
      class="px-2 transition-colors focus:outline-none"
      :class="controlsClass"
      @click="emitChange('prev')"
    >
      <slot name="previous">
        <i class="fa fa-chevron-left"></i>
      </slot>
    </button>
    <div
      v-if="!iconsOnly"
      class="flex items-center text-sm font-bold"
    >
      <slot> 
        <span v-if="startDate && endDate">
          {{ formatDate(startDate) }} - {{ formatDate(endDate) }} 

        </span>
        <span v-else>
          {{ formatDate(selectedDay) }}

        </span>
      </slot>
    </div>
    <button
      class="px-2 transition-colors focus:outline-none"
      :class="controlsClass"
      @click="emitChange('next')"
    >
      <slot name="next">
        <i class="fa fa-chevron-right"></i>
      </slot>
    </button>
  </div>
</template>

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
