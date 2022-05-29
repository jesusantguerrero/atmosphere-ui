<template>
  <div class="overflow-hidden rounded-md shadow-md dashlide-container">
    <div
        class="z-10 shadow-md dashlide-container__title h-14"
        :style="{backgroundColor: presented.color, color: presented.textColor }"
        v-if="renderTitle">
            <h3 class="pt-4">
                {{ presented.title }}
            </h3>
    </div>

    <div class="dashlide-container__presenter">
        <template v-for="slide in slides">
            <div
              :key="slide.name"
              class="dashlide-container__item" v-if="presented.name == slide.name"
            >
            <slot :name="slide.name">
                <div class="card w-100 dashlide-container__item">
                <div class="card-body">
                    <h5 class="card-title">{{ slide.title }}</h5>
                    <p class="card-text">{{ slide.content }}</p>
                </div>
                </div>
            </slot>
            </div>
        </template>
    </div>

    <div class="bg-blue-500 dashlide-container__controls">
      <button
        v-for="slide in slides"
        :key="slide.name"
        class="bg-blue-400 dashlide-control"
        :class="{ active: presented.name == slide.name }"
        @click="presented = slide"
      >
        {{ slide.title }}
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    slides: {
      type: Array,
      required: true
    },
    renderTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      presented: {}
    };
  },
  mounted() {
    this.presented = this.slides[0];
  }
};
</script>

<style lang="scss">
.dashlide-container {
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
  background: white;
  color: var(--primary-color);

  &__presenter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 100%;
    top: 0;
    flex-wrap: wrap;
    overflow: hidden;
  }

  &__controls {
    display: flex;
    width: 100%;

    button.dashlide-control {
      width: 100%;
      height: 45px;
      border: 0;
      color: white;

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.3);
      }

      &.active,&:focus,&:active {
        background-color: rgba($color: #000, $alpha: 0.2);
        outline: none;
      }
    }
  }

  &__title {
    color: #0c1821;
    font-weight: bolder;
    background: white;
    overflow: visible;
    display: flex;
    justify-content: center;

  }

  &__item {
    width: 100%;
    height: 100%;
  }
}
</style>
