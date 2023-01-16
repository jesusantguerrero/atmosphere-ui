<template>
  <div class="step-item" :class="stepClass">
    <div class="load shadow-md" :class="state.loadClass" />
    <div class="circle rounded-full" :class="circleClass" @click="$emit('click')">
      <i v-if="isActive || isPassed" class="fas fa-check" />
    </div>
    <div class="step-info">
      <div class="title" v-if="!simple">
        {{ step.title }}
      </div>
      <div class="description" v-if="!simple">
        {{ step.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps({
  step: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isPassed: {
    type: Boolean,
    default: false,
  },
  activeClass: {
    type: String,
    default: "bg-green-500",
  },
  showLabels: {
    type: Boolean,
    default: true,
  },
  simple: {
    type: Boolean,
    default: false,
  },
  loadShadowColor: {
    type: String,
    default: "shadow-green-500",
  },
  circleActiveColor: {
    type: String,
    default: "bg-white text-gray-400",
  },
});

const state = reactive({
  loadClass: computed(() => {
    return [
      props.loadShadowColor,
      (props.isActive || props.isPassed) && props.activeClass,
    ];
  }),
});

const stepClass = computed(() => {
  const classes = props.simple
    ? "w-100 items-center relative w-full flex"
    : "flex items-center relative w-full";

  return [
    classes,
    props.isActive && "active",
    props.isPassed && "passed",
    props.simple && "simple",
  ];
});

const circleClass = computed(() => {
  const classes = props.isActive
    ? props.circleActiveColor + "scale-120 transform text-white"
    : props.isPassed
    ? props.activeClass
    : "bg-gray-300";
  const passedClass = props.isPassed ? props.circleActiveColor : "";
  return [classes, passedClass];
});
</script>

<style lang="scss" scoped>
.step-item {
  .load {
    position: absolute;
    width: 0;
    height: 100%;
    transition: width ease 0.5s;
  }

  &:first-child {
    .load {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }

  &:last-child {
    .load {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  &.active,
  &.passed {
    .load {
      transition: width ease 0.5s;
      width: 100%;
    }

    .circle {
      cursor: pointer;
    }

    .title {
      color: white;
    }
  }

  &.active {
    .load {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  .circle {
    margin-left: 15%;
    height: 14px;
    width: 14px;
    min-height: 14px;
    min-width: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    z-index: 2;
  }

  &.simple {
    .circle {
      height: 16px;
      width: 16px;
      min-height: 16px;
      min-width: 16px;
    }
  }

  .step-info {
    display: absolute;
    z-index: 10;
    margin-left: 10px;
    width: 100%;
  }

  .title {
    color: #707070;
    font-size: 14px;
    font-weight: bold;
  }

  .description {
    color: #9b9b9b;
    font-size: 13px;
  }
}
</style>
