<template>
  <div><slot /></div>
</template>

<script setup>
import { provide } from "vue";

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
});
provide("themeConfig", props.config);
</script>
