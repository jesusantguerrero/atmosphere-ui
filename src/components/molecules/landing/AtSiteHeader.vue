<template>
  <nav
    class="z-50 flex flex-wrap items-center justify-between mx-auto font-medium max-w-7xl py-4"
  >
    <slot name="brand">
      <component
        :is="routerComponent"
        to="/"
        class="py-4 pr-4 cursor-pointer"
        :class="brandClass"
      >
        <span class="text-3xl leading-none select-none logo"
          >{{ title }}<span :class="dotClass">.</span></span
        >
      </component>
    </slot>

    <div
      class="flex-col items-center justify-end hidden w-full h-full mt-12 font-bold text-center md:flex md:w-2/3 md:mt-0 md:flex-row md:items-center"
    >
      <component
        :is="link.url ? 'a' : routerComponent"
        v-for="link in links"
        :href="link.to || link.url"
        :key="link.name"
        :to="link.to"
        class="inline-block px-4 py-2 mx-2 text-left md:px-0 lg:mx-3 md:text-center"
        :class="linkClass"
      >
        {{ link.name }}
      </component>
      <div class="md:ml-8">
        <slot name="actions">
          <slot v-for="action in actions" :name="action.name">
            <component
              :is="getComponent(action)"
              :to="action.url"
              :href="action.url"
              :class="action.class"
              class="w-full px-4 py-2 font-bold transition rounded-md cursor-pointer md:mr-3 lg:mr-3 md:w-auto"
              @click.stop="handleClick($event, action)"
            >
              {{ action.label || action.name }}
            </component>
          </slot>
        </slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { headerSizes } from "../../../utils/constants";

interface IMenuAction {
  url: string;
  class: string;
  label?: string;
  name: string;
}

interface IMenuLink {
  url: string;
  to: string;
  name: string;
  label: string;
}

interface Props {
  title: string;
  brandClass: string;
  links: IMenuLink[];
  linkClass: string;
  actions: IMenuAction[];
  routerComponent: string;
  dotClass: string;
  size: "large" | "medium" | "small";
}

const props = withDefaults(defineProps<Props>(), {
  title: "Zen",
  brandClass: "",
  links: () => [],
  actions: () => [],
  linkClass: "text-white hover:text-green-500",
  routerComponent: "router-link",
  dotClass: "text-green-500",
  size: "large",
});

const emit = defineEmits(["action"]);

const handleClick = (event, action) => {
  if (action.emit) {
    event.preventDefault();
    emit("action", action.name);
  }
};

const getComponent = (action) => {
  return !action.url || action.emit ? "button" : props.routerComponent;
};
</script>
