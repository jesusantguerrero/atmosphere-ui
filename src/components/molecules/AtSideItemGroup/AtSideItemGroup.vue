<template>
    <div
      class="flex items-center justify-between px-5 transition rounded-full menu-item-group__toggle"
      :class="[ isActive && active, !isActive && hasActiveChild && 'active', itemClass ]"
      @click="emitValue"
    >
      <span class="w-full px-5 py-4 side-item">
        <i :class="`fa fa-${icon}`" />
        {{ label }}
      </span>

      <span class="indicator">
        <i :class="`fa fa-${arrowIcon}`" />
      </span>
    </div>

    <div
      class="menu-item-group__childs"
      :class="{ 'my-collapse': isActive, 'custom-accordion': true }"
    >
        <div class="mt-1 ml-5 child-container" v-show="isActive">
          <template v-for="item in childs">
            <at-side-item
              v-if="!item.hide"
              :ref="`${label}-${item.label}`"
              :key="`${label}-${item.label}`"
              :icon="item.icon"
              :label="item.label"
              :to="item.to"
              :classes="itemClass"
            />
          </template>
        </div>
    </div>
</template>

<script>
import AtSideItem from '../AtSideItem/AtSideItem.vue';

export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    childs: {
      type: Array,
      default() {
        return [];
      }
    },
    modelValue: {
      type: String,
      required: true
    },
    trackId: {
      type: String,
      required: true
    },
    currentPath: {
      type: String,
      default: '/'
    },
    itemClass: {
      type: String
    },
    itemActiveClass: {
      type: String
    }
  },
  components: {
    AtSideItem
  },
  data() {
    return {
      active: false
    };
  },
  computed: {
    arrowIcon() {
      return this.isActive ? "chevron-down" : "chevron-right";
    },
    isActive() {
      return this.trackId == this.modelValue;
    },
    hasActiveChild() {
      return !this.isActive &&  this.childs.find(item => item.to == this.currentPath)
    }
  },
  methods: {
    emitValue() {
      const current = this.modelValue == this.trackId ? "" : this.trackId;
      this.$emit("update:modelValue", current);
    },
  }
};
</script>

<style lang="scss" scoped>
.menu-item-group {
  &__toggle {
    text-align: left;
    transition: all ease 0.3s;
    margin: 2px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    overflow: hidden;

    .indicator {
      transition: all ease 0.3s;
    }

    &.active {
      color: #777 !important;
      background: #eee !important;
      overflow-x: visible;

      .indicator {
        transform: rotate(90deg);
      }
    }

    &.current {
      background: dodgerblue;
      color: white;
      box-shadow: transparentize(dodgerblue, $amount: 0.5) 5px 3px 10px;
      overflow-x: visible;

      &:hover {
        color: white !important;
        background: dodgerblue !important;
      }

      .indicator {
        transform: rotate(90deg);
      }
    }
  }
}
</style>

<style lang="scss">
.custom-accordion {
  animation: open 0.3s;
  overflow: hidden;
}

.custom-accordion.my-collapse {
  animation: open 0.3s reverse;
}

@keyframes open {
  0% {
    height: 0;
  }
  50% {
    height: 50%;
  }
  100% {
    max-height: auto;
  }
}
</style>
