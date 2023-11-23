<script setup lang="ts">
import { provide, ref, toRefs } from "vue";
import AtSideNav from "./AtSideNav.vue";

import { AtSideNavProps } from "./AtSideNavProps";

const props = defineProps({
  title: String,
  headerMenu: {
    type: Array,
  },
  ...AtSideNavProps,
  currentPath: {
    type: String,
    default: "/",
  },
  isExpanded: {
    type: Boolean,
    default: true,
  },
  isExpandable: {
    type: Boolean,
    default: false,
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
  },
  brandContainerClass: {
    default: "mx-auto my-5",
    type: String,
  },
  navContainerClass: {
    default: "py-8",
    type: String,
  },
  counters: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emit = defineEmits(["update:isExpanded"]);
const { isExpanded, currentPath, counters } = toRefs(props);
const activeGroup = ref("");

const toggleIcon = () => {
  emit('update:isExpanded', !isExpanded.value)
}

provide("currentPath", currentPath);
provide("isExpanded", isExpanded);
provide("counters", counters);
</script>


<template>
  <div class="transition app-side" :class="{ 'side-mini': !isExpanded }">
    <div :class="brandContainerClass">
      <slot name="brand" :toggleExpand="toggleIcon" >
        <h1>
          {{ title }}
        </h1>
      </slot>
    </div>
    <section class="flex-col">
      <slot name="start" :toggleExpand="toggleIcon" />
      <AtSideNav
        v-model="activeGroup"
        class="w-full mx-auto"
        :class="navContainerClass"
        role="tablist"
        aria-orientation="vertical"
        :menu="menu"
        :item-property="itemProperty"
        :icon-class="iconClass"
        :child-class="childClass"
        :child-active-class="childActiveClass"
        :item-class="itemClass"
        :item-active-class="itemActiveClass"
        :counters="counters"
      >
        <template v-for="item in menu">
          <slot :name="item.name" />
        </template>
      </AtSideNav>
      <slot name="end-main" :toggleExpand="toggleIcon" />
    </section>

    <div class="flex flex-col justify-end nav-container">
      <AtSideNav
        class="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
        v-if="headerMenu"
        v-model="activeGroup"
        :menu="headerMenu"
        :item-property="itemProperty"
        :icon-class="iconClass"
        :child-class="childClass"
        :child-active-class="childActiveClass"
        :item-class="itemClass"
        :item-active-class="itemActiveClass"
        :counters="counters"
      />

      <div class="flex justify-end w-full pr-4" v-if="isExpandable && !hideIcon">
        <slot name="close-icon">
          <div
            class="p-2 transform rounded-full cursor-pointer hover:bg-white/80"
            :class="[isExpanded ? 'rotate-180' : 'rotate-0', iconClass]"
            @click="toggleIcon"
          >
            <svg width="32" height="32" viewBox="0 0 16 16">
              <g fill="none">
                <path
                  d="M6.293 8.5l-.647.647a.5.5 0 1 0 .708.707l1.5-1.5a.5.5 0 0 0 0-.707l-1.5-1.5a.5.5 0 1 0-.708.707l.647.646H4.502a.5.5 0 1 0 0 1h1.79z"
                  fill="currentColor"
                />
                <path
                  d="M12 13.001a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6.002a2 2 0 0 0 2 2h8zm1-2a1 1 0 0 1-1 1H9.998V4H12a1 1 0 0 1 1 1v6.002zM8.998 4v8.002H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4.998z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
        </slot>
      </div>
      <slot name="end" :toggleExpand="toggleIcon" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.app-side {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 64px 1fr 1fr;
  grid-template-columns: var(--app-side-width);
  z-index: 1001;

  .nav-container {
    display: flex;
    padding-bottom: 10px;
    .nav {
      margin-top: auto;
    }
  }

  .nav {
    margin-top: 40px;
    width: 100%;
    max-height: 100%;
    flex-flow: row;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
      background-color: transparentize($color: #000000, $amount: 0.7);
    }

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 8px;
    }
  }

  .nav-link {
    text-align: left;
    transition: all ease 0.3s;
    margin: 2px;

    &:not(.active):hover {
      background: dodgerblue;
      color: white;
    }
  }
}
</style>
