<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <at-date-pager v-model="state.date"/>
</template>

<script setup>
import { reactive, watch } from "vue";
import AtDatePager from "./components/molecules/AtDatePager/AtDatePager.vue"
const state = reactive({
  date: new Date()
})

watch(() => state.date, () => {
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
