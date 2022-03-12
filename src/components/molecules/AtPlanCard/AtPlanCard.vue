<template>
  <div
    class="w-4/12 px-5 py-10 mb-5 bg-white rounded-md shadow-md"
    :class="{ 'border-blue-400 border-2': isCurrent }"
  >
    <div class="prose prose-xl">
      <h3 class="text-center">
        {{ name }}
        <div
          v-if="isCurrent"
          class="px-1 py-1 text-xs text-blue-600 rounded-md"
        >
          Current Plan
        </div>
      </h3>
    </div>

    <div class="px-5 py-2 my-2 rounded-md">
      <h2 class="text-5xl text-center">
        <span class="font-extrabold">
          {{ amount}}
        </span>
        <small class="text-md"> {{ currency }} </small>
      </h2>

      <div class="mt-5">
        <div class="prose prose-md">
          {{ description }}
        </div>
      </div>
    </div>

    <div class="text-center" v-if="!isCurrent">
      <a
        v-if="contactLink"
        class="inline-block px-5 py-2 text-blue-500 bg-white border-2 border-blue-500 rounded-md"
        :href="contactLink"
      >
        Contact Sales
      </a>

      <slot v-if="customButton">
        <AtButton type="primary"> Subscribe </AtButton>
      </slot>
    </div>
    <a
      v-else
      class="inline-block w-full px-5 py-2 text-white bg-gray-400 rounded-sm"
      :href="subscribeLink"
    >
      {{ subscribeLabel }}
    </a>
  </div>
</template>

<script setup>
defineProps({
  name: {
      type: String,
  },
  amount: {
      type: String,
  },
  currency: {
      type: String
  },
  description: {
      type: String,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  subscribeLink: {
    type: String,
    required: true,
  },
  contactLink: {
    type: String,
  },
  customButton: {
    type: Boolean,
    default: false,
  },
  subscribeLabel: {
    type: String,
    default: "subscribe",
  },
});
</script>
