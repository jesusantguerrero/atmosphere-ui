<template>
<label
    @click="updateModelValue(current)" 
    @mouseover="setCurrentHover(current)"
    @mouseout="setCurrentHover(0)"
    :title="rateState.title"
>
    <input
        :value="current" :checked="checked" type="radio" :name="name" class="visuallyhidden"
    /> 
    <span class="visuallyhidden">{{ current }} stars</span>
    <slot></slot>
</label>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
    current: {
        type: Number,
        required: true
    }
})
const updateModelValue = inject('updateModelValue')
const setCurrentHover = inject('setCurrentHover')
const rateState = inject('rateState', {});
const name = inject('name')

</script>

<style>
.visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
</style>