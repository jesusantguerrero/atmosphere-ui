<template>
  <div v-show="isActive" class="step">
    <slot name="header">
      <header :class="headerClass">
        <h4 v-if="title" class="step__title mt-4">{{ title }}</h4>
        <p v-if="description" class="step__description">
          {{ description }}
        </p>
      </header>
    </slot>

    <div class="step__display" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: false,
  },
  beforeChange: {
    type: Function,
    required: false,
  },
  afterChange: {
    type: Function,
    required: false,
  },
  contentClass: {
    type: String,
  },
  headerClass: {
    type: String,
    default: "w-full py-2 px-2 text-center",
  },
});

const activeName = inject("activeTab", "");

const isActive = computed(() => {
  return props.name === activeName.value;
});
</script>

<style lang="scss" scoped>
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-weight: 600;
    font-size: 21px;
  }

  &__description {
    font-size: 16px;
    font-weight: 600;
  }

  &__display {
    width: 80%;
  }
}
</style>
