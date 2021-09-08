<template>
  <div class="divider" v-if="!label">
    <div class="divider__inner"></div>
  </div>

  <div v-else class="item">
    <slot :label="label" :to="to" :class="classes" :icon="icon">
      <inertia-link :class="[classes, itemClass]" :href="to">
        <i :class="`fa fa-${icon}`" class="mr-2" />
        {{ label }}
      </inertia-link>
    </slot>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "AtSideItem",
  props: {
    to: {
      type: String,
    },
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    classes: {
      type: String,
      default: "nav-link",
    },
    itemClass: {
      type: String,
    },
    itemActiveClass: {
      type: String,
    },
  },
  setup(props) {
    const state = reactive({
      path: computed(() => {
        return window.location.pathname;
      }),
      classes: computed(() => {
        const classes = "flex items-center w-full px-5 py-4 rounded-3xl";
        return [isPath(props.to) && itemActiveClass, props.classes, props.itemClass];
      }),
    });

    const isPath = (url = "") => {
      const link = url.replace(window.location.origin, "");
      if (url == "/") {
        return ["/", "/dashboard"].includes(window.location.pathname);
      }
      return link == window.location.pathname;
    };

    return {
      isPath,
      ...toRefs(state),
    };
  },
});
</script>
