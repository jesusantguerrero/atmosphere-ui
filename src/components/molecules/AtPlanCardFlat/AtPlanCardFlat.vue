<template>
  <div
    class="px-5 py-10 mb-5 bg-white rounded-md shadow-md"
    :class="{ 'border-blue-400 border-2': isCurrent }"
  >
    <div>
      <h3 class="font-bold text-primary">
        {{ name }} 
        <AtBadge v-if="tag" type="primary">{{ tag }}</AtBadge>
      </h3>
    </div>

    <div class="py-2 mx-auto my-2 text-left rounded-md">
      <div class="flex">
        <h2 class="text-4xl">
          <span class="font-bold text-primary">
            {{ amount}}
          </span>
          <small class="text-md"> {{ currency }} </small>
        </h2>
        <div class="flex flex-col items-start justify-center ml-4 text-xs text-gray-500">
          <span v-for="label in labels">{{ label }}</span>
        </div>
      </div>

      <div class="mt-5" v-if="!isCurrent">
        <a
          v-if="contactLink"
          class="inline-block px-5 py-2 text-blue-500 bg-white border-2 border-blue-500 rounded-md"
          :href="contactLink"
        >
          Contact Sales
        </a>

      <slot v-if="!customButton">
        <AtButton type="primary" class="block w-full mt-2"> {{ subscribeLabel }} </AtButton>
      </slot>
    </div>
    <AtButton
      v-else
      :disabled="true"
      type="secondary"
      class="block w-full mt-2"
      :href="subscribeLink"
    >
      {{ subscribeLabel }}
    </AtButton>

    <div class="mt-5">
      <div class="prose prose-md">
        {{ description }}
      </div>
    </div>

    <div class="mt-5">
      <div v-for="feature in features">
        <i class="fa fa-check text-primary-500" />
        {{ feature }}
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import AtButton from "../../atoms/AtButton/AtButton.vue"
import AtBadge from "../../atoms/AtBadge/AtBadge.vue"

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
  tag: {
    type: String,
  },
  labels: {
    type: Array
  },
  features: {
    type: Array
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
    default: "Subscribe",
  },
});
</script>
