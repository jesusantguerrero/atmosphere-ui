<template>
  <div class="px-2 py-2 divide-y w-72" role="date-picker">
    <div class="flex flex-wrap">
      <AtFieldDateTime
        v-model="state.date"
        data-test-id="date"
        :include-time="state.includesTime"
        :selected="state.selected == 'date'"
        @click="state.selected = 'date'"
      />
      <AtFieldDateTime
        role="enddate"
        data-test-id="enddate"
        placeholder="pick an end date"
        v-model="state.endDate"
        :include-time="state.includesTime"
        :selected="state.selected == 'endDate'"
        v-if="state.includesEndDate"
        @click="state.selected = 'endDate'"
      />
    </div>
    <!-- Calendar -->
    <div>
      <AtCalendar
        :selected="state.selectedDate"
        :start-date="state.date"
        :end-date="state.endDate"
        @selected="setDate"
      />
    </div>

    <!-- Reminders -->
    <div class="py-1 mt-2" v-if="acceptReminders">
      <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100">
        <i class="fa fa-clock"></i> Remind
      </div>
    </div>

    <!-- Shortcuts -->
    <div class="py-2" v-if="shortcuts.length">
      <at-date-action
        v-for="shortcut in shortcuts"
        :key="shortcut.text"
        class="cursor-pointer"
        @click="setDate(shortcut.value)"
      >
        {{ shortcut.text }}
      </at-date-action>
    </div>

    <!-- Switches -->
    <div class="py-2" v-if="state.showSwitches">
      <AtFieldCheck label="Include end" v-model="state.includesEndDate" v-if="acceptEndDate" />
      <AtFieldCheck label="Include time" v-model="state.includesTime" v-if="acceptTime" />
    </div>

    <!-- TimeFormat Config -->
    <div class="py-1" v-if="timeFormatConfig">
      <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100">
        <i class="fa fa-cog"></i> Date format &amp; timezone
      </div>
    </div>

    <!-- Actions -->
    <div class="py-1">
      <AtDateAction>Clear</AtDateAction>
    </div>

    <!-- Reminder information -->
    <div class="py-1" v-if="acceptReminders">
      <small
        class="inline-block w-full px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"
      >
        <i class="fa fa-question-circle"></i> Learn more about reminders</small
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, watch } from "vue";
import AtFieldCheck from "../../molecules/AtFieldCheck/AtFieldCheck.vue";
import AtFieldDateTime from "../../molecules/AtFieldDateTime/AtFieldDateTime.vue";
import AtCalendar from "../../molecules/AtCalendar/AtCalendar.vue";
import AtDateAction from "./AtDateAction.vue";
import { isAfter, isBefore, startOfDay } from "date-fns";
import { isSameDate } from "~utils/useDateTime";

const props = defineProps({
  date: {
    type: [Date, null],
  },
  endDate: {
    type: Date,
  },
  acceptEndDate: {
    type: Boolean,
    default: false,
  },
  acceptTime: {
    type: Boolean,
    default: false,
  },
  acceptReminders: {
    type: Boolean,
    default: false,
  },
  acceptRecurrence: {
    type: Boolean,
    default: false,
  },
  timeFormatConfig: {
    type: Boolean,
    default: false,
  },
  shortcuts: {
    type: Array,
    default() {
      return [];
    },
  },
  class: {
    type: String,
    default: "bg-white",
  },
});

const emit = defineEmits(["update:date", "update:enddate"]);
const state = reactive({
  date: null,
  endDate: null,
  selected: "date",
  includesTime: props.acceptTime,
  includesEndDate: props.acceptEndDate,
  showSwitches: computed(() => {
    return [props.acceptEndDate, props.acceptTime].some((value) => value);
  }),
});

const emitUpdate = () => {
  emit(`update:${state.selected}`, state[state.selected]);
};

watch(
  () => props.date,
  () => {
    if (!isSameDate(state.date, props.date)) {
      state.date = props.date || state.date;
    }
  },
  { immediate: true }
);

watch(
  () => props.endDate,
  () => {
    state.endDate = props.endDate;
  },
  { immediate: true }
);

watch(
  () => state.date,
  () => {
    state.selected = "date";
    emitUpdate();
  }
);

watch(
  () => state.endDate,
  () => {
    state.selected = "enddate";
    emitUpdate();
  }
);

watch(
  () => state.includesEndDate,
  () => {
    state.endDate = state.includesEndDate ? state.date : null;
    state.selected = state.includesEndDate ? "endDate" : "date";
  },
  { immediate: true }
);

const setDate = (date) => {
  if (!props.includesTime) {
    date = startOfDay(date);
  }
  if (state.selected == "endDate" && state.date && isBefore(date, state.date)) {
    const holder = state.date;
    state.date = date;
    state.endDate = holder;
    state.selected = "date";
  } else if (state.selected == "date" && state.endDate && isAfter(date, state.endDate)) {
    const holder = state.endDate;
    state.endDate = date;
    state.date = holder;
    state.selected = "endDate";
  } else {
    state[state.selected] = date;
  }

  emitUpdate();
};

const selectedDate = computed(() => {
  return state[state.selected];
});
</script>
