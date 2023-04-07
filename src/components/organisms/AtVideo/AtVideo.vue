<template>
  <div class="relative overflow-hidden bg-white rounded-md">
    <div
      class="absolute z-20 flex items-center justify-center w-full h-full"
      v-if="!isPlaying"
    >
      <slot>
        <div
          @click="playVideo"
          class="px-5 py-2 my-auto text-white transition-transform transform bg-black cursor-pointer select-none hover:scale-105 bg-opacity-60 rounded-3xl hover:bg-opacity-80"
        >
          <i class="mr-2 fa fa-play" />
          {{ label }}
        </div>
      </slot>
    </div>

    <AtPlayer
      :width="width"
      :height="height"
      :src="src"
      ref="videoPlayer"
      v-model:is-playing="isPlaying"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AtPlayer from "./AtPlayer.vue";

defineProps({
  width: {
    type: Number,
    default: 1920,
  },
  height: {
    type: Number,
    default: 1080,
  },
  src: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Play video",
  },
  type: {
    type: String,
    default: "video/mp4",
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const isPlaying = ref();
const videoPlayer = ref();
const playVideo = () => {
  videoPlayer.value.togglePlay();
};
</script>
