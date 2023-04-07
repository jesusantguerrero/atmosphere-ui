<template>
  <div class="player">
    <video
      @click="togglePlay()"
      :width="width"
      :height="height"
      ref="videoPlayer"
      class="player__video viewer"
    >
      <source :src="src" :type="type" />
    </video>

    <div class="player__controls">
      <div class="progress">
        <div class="progress__filled bg-primary" ref="progressFilled"></div>
      </div>
      <button
        class="player__button toggle"
        @click="togglePlay()"
        title="Toggle Play"
      >
        ►
      </button>
      <input
        type="range"
        name="volume"
        class="player__slider"
        min="0"
        max="1"
        step="0.05"
        value="1"
      />
      <input
        type="range"
        name="playbackRate"
        class="player__slider"
        min="0.5"
        max="2"
        step="0.1"
        value="1"
      />
      <button data-skip="-10" class="player__button back">« 10s</button>
      <button data-skip="25" class="player__button ahead">25s »</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";

const props = defineProps({
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

const state = reactive({
  isPlaying: false,
  timer: null,
  duration: 0,
  controls: null,
});

const videoPlayer = ref();
const setup = () => {
  state.isPlaying = false;
  state.timer = null;
  state.controls = {
    progress: document.querySelector(".progress"),
    toggle: document.querySelector(".toggle"),
    volume: document.querySelector("[name=volume]"),
    playbackRate: document.querySelector("[name=playbackRate]"),
    back: document.querySelector(".back"),
    ahead: document.querySelector(".ahead"),
  };

  state.duration = videoPlayer.value.duration;
};

onMounted(() => {
  setup();
});

const progressFilled = ref();

const checkTime = () => {
  const v = videoPlayer.value;

  state.timer = setInterval(() => {
    const width = (v.currentTime / v.duration) * 100;
    progressFilled.value.style.flexBasis = `${width}%`;
  }, 1000);
};

const togglePlay = () => {
  if (state.isPlaying) {
    videoPlayer.value.pause();
    clearInterval(state.timer);
  } else {
    checkTime();
    videoPlayer.value.play();
  }
  state.isPlaying = !state.isPlaying;
};

const emit = defineEmits(["update:is-playing"]);
watch(
  () => state.isPlaying,
  (isPlaying) => {
    emit("update:is-playing", isPlaying);
  },
  { immediate: true }
);
defineExpose({
  togglePlay,
});
</script>

<style>
.player {
  max-width: 750px;
  border: 5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  font-size: 0;
  overflow: hidden;
  cursor: pointer;
}

/* This css is only applied when fullscreen is active. */
.player:fullscreen {
  max-width: none;
  width: 100%;
}

.player:-webkit-full-screen {
  max-width: none;
  width: 100%;
}

.player__video {
  width: 100%;
}

.player__button {
  background: none;
  border: 0;
  line-height: 1;
  color: white;
  text-align: center;
  outline: 0;
  padding: 0;
  cursor: pointer;
  max-width: 50px;
}

.player__button:focus {
  border-color: #ffc600;
}

.player__slider {
  width: 10px;
  height: 30px;
}

.player__controls {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  transform: translateY(100%) translateY(-5px);
  transition: all 0.3s;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.1);
}

.player:hover .player__controls {
  transform: translateY(0);
}

.player:hover .progress {
  height: 10px;
}

.player__controls > * {
  flex: 1;
}

.progress {
  flex: 10;
  position: relative;
  display: flex;
  flex-basis: 100%;
  height: 5px;
  transition: height 0.3s;
  background: rgba(0, 0, 0, 0.5);
  cursor: ew-resize;
}

.progress__filled {
  width: 50%;
  flex: 0;
  flex-basis: 0%;
}

/* unholy css to style input type="range" */

input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  width: 100%;
  margin: 0 5px;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type="range"]::-webkit-slider-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #ffc600;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #bada55;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
  background: #ffffff;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #ffc600;
  cursor: pointer;
}
</style>
