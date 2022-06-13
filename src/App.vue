<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <AtDatePager
      class="h-12 w-full"
      v-model="state.date"
      v-model:dateSpan="state.dateSpan"
      v-model:startDate="state.searchOptions.date.startDate"
      v-model:endDate="state.searchOptions.date.endDate"
      next-mode="month"
  />
</template>

<script setup>
import { startOfDay } from "date-fns";
import { reactive, watch } from "vue";
import { startOfDay } from "date-fns";
import AtDatePager from "./components/molecules/AtDatePager/AtDatePager.vue"

const props = defineProps({
 serverSearchOptions: {
    type: Object,
    default() {
      return {

      }
    }
 }
})

const state = reactive({
  date: new Date(),
  filterOptions: [
      {
          label: 'Accounts',
          value: 'accounts'
      },
      {
          label: 'Descriptions',
          value: 'description'
      },
  ],
  searchOptions: {
      group: "",
      date: {
          startDate: null,
          endDate: null,
      }
  },
  date: startOfDay(new Date()),
  dateSpan: null,
  listType: 'table'
})

Object.entries(props.serverSearchOptions).forEach(([key, value]) => {
    if (key === 'date') {
        state.searchOptions.date.startDate = getDateFromIso(new Date().toISOString().slice(0, 10));
        state.searchOptions.date.endDate = getDateFromIso(new Date().toISOString().slice(0, 10))
        state.date = getDateFromIso(value.startDate)
    } else {
        state.searchOptions[key] = Object.values(state.filterOptions).map(filter => filter.value).includes(value) ? value : ""
    }
})

watch(() => state.searchOptions, () => {
  console.log(state.date)
}, { immediate: true })
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
