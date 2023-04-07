<template>
  <div
    class="relative flex flex-col justify-center px-4 py-5 text-center rounded-md shadow-md"
  >
    <div
      class="absolute background-icon opacity-40"
      :class="iconContainerClass"
    >
      <slot name="icon">
        <i
          class="fa text-7xl"
          :class="[icon, iconClass]"
          v-if="icon && !isIconComponent"
        />
        <component
          :is="icon"
          class="fa text-7xl"
          :class="[iconClass]"
          v-else-if="icon"
        />
      </slot>
    </div>
    <slot name="content">
      <div class="text-3xl font-bold">
        {{ value }}
        <small class="block text-sm">
          {{ title }}
        </small>
      </div>
      <div class="mt-2">
        <slot name="action"> </slot>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value: string;
    title: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    icon?: string | Object;
    iconPosition: "left" | "right" | "center";
    iconClass: string;
  }>(),
  {
    iconPosition: "right",
  }
);

const iconContainerClass = computed(() => {
  const positions = {
    left: "left-14",
    right: "right-14",
  };
  return positions[props.iconPosition];
});

const isIconComponent = computed(() => {
  return typeof props.icon !== "string";
});
</script>

<style></style>
