<template>
    <div
      class="flex items-center justify-between px-5 text-left transition rounded-md cursor-pointer"
      :class="[ isActive && active, !isActive && hasActiveChild && 'active', itemClass ]"
      @click="emitValue"
    >
      <span class="w-full py-4 side-item">
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
              :classes="[itemClass, itemActiveClass]"
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