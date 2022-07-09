<template>
  <AtDatePicker v-model:date="state.date" />
</template>

<script setup>
import { reactive, watch } from "vue";
import { startOfDay } from "date-fns";
// import AtDateSelect from "~organisms/AtDateSelect/AtDateSelect.vue";
import AtDatePicker from "~organisms/AtDatePicker/AtDatePicker.vue";

const state = reactive({
  filterOptions: [
    {
      label: "Accounts",
      value: "accounts",
    },
    {
      label: "Descriptions",
      value: "description",
    },
  ],
  searchOptions: {
    group: "",
    date: {
      startDate: null,
      endDate: null,
    },
  },
  date: startOfDay(new Date()),
  dateSpan: null,
  listType: "table",
});

watch(
  () => state.searchOptions,
  () => {
    console.log(state.date);
  },
  { immediate: true }
);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
