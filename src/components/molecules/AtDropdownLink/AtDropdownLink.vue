<template>
  <div>
    <button
      type="submit"
      class="block w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      v-if="isButton"
    >
      <slot></slot>
    </button>

    <a
      :href="href"
      class="block px-4 py-2 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      v-else-if="isLink"
    >
      <slot></slot>
    </a>

    <component
      :is="routerComponent"
      :to="href"
      :href="href"
      v-bind="$attrs"
      class="block px-4 py-2 text-sm leading-5 text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      v-else
    >
      <slot></slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isInertia: {
      type: Boolean,
      default: false,
  },
  href: {
    type: String,
    default: "#",
  },
  as: {
    type: String,
    default: "",
  },
});

const isButton = computed(() => props.as === "button");
const isLink = computed(() => props.as === "a");
const routerComponent = computed(() => props.isInertia ? "inertia-link" : "router-link");
</script>
