<template>
  <button
    class="relative px-5 py-2 overflow-hidden focus:outline-none"
    :class="[
      colorClass,
      disabled
        ? 'bg-opacity-20 text-gray-700 hover:bg-opacity-20 cursor-not-allowed'
        : 'hover:bg-opacity-80',
      shapeClasses,
    ]"
    ref="Button"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, inject } from "vue";
const props = defineProps({
  type: {
    type: String,
    validator(value) {
      return [
        "primary",
        "danger",
        "secondary",
        "success",
        "warning",
        "notice",
      ].includes(value);
    },
  },
  disabled: {
    type: Boolean,
  },
  rounded: {
    type: Boolean,
  },
});

const themeConfig = inject("themeConfig", {});
const buttonConfig = themeConfig.button;

const colorClass = computed(() => {
  const typeColors = {
    primary: buttonConfig?.colors?.primary || "bg-blue-400 text-white",
    secondary: buttonConfig?.colors?.secondary || "bg-gray-400 text-white",
    success: buttonConfig?.colors?.success || "bg-green-400 text-white",
    warning: buttonConfig?.colors?.warning || "bg-yellow-400 text-white",
    danger: buttonConfig?.colors?.danger || "bg-red-400 text-white",
  };

  return typeColors[props.type] || "";
});

const shapeClasses = computed(() => {
  const roundedClasses = props.rounded ? "rounded-md" : "";
  return buttonConfig?.shape || [roundedClasses];
});
</script>

<style lang="scss">
.at {
  .hover-effect {
    max-height: 37px;
  }
  &:hover {
    .hover-effect {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  &:disabled {
  }
}
</style>
