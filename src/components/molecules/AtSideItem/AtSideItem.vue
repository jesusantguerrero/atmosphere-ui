<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import { isSamePath } from "../../../utils";

const props = withDefaults(
  defineProps<{
    to: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    icon: string | Object;
    label: string;
    name: string;
    classes: string;
    itemClass?: string;
    itemActiveClass?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    as: string | Object;
    is: string | Object;
    // eslint-disable-next-line @typescript-eslint/ban-types
    isActiveFunction?: Function | null;
  }>(),
  {
    classes: "nav-link",
  }
);

const currentPath = inject("currentPath", ref(""));
const counters = inject("counters", ref({}));
const classes = computed(() => {
  const classes = "flex items-center w-full px-5 py-4 cursor-pointer";
  return [
    isActive(props.to) && props.itemActiveClass,
    props.classes,
    props.itemClass,
    classes,
  ];
});

const componentName = computed(() => {
  return props.as;
});

function isActive(url: string) {
  const isActiveMethod = props.isActiveFunction || isSamePath;
  return isActiveMethod(url, currentPath.value);
}

const isExpanded = inject("isExpanded", true);

const isIconComponent = computed(() => {
  return typeof props.icon !== "string";
});

const itemCounter = computed(() => {
  return counters.value[props.name] ?? null
});
</script>

<template>
  <div class="divider" v-if="!label">
    <div class="divider__inner"></div>
  </div>

  <div v-else class="item" v-bind="$attrs">
    <slot :label="label" :to="to" :class="classes" :icon="icon">
      <component :is="componentName" :class="classes" :href="to" :label="label">
        <component
          :class="[isExpanded ? 'mr-2' : 'mx-auto']"
          :is="icon"
          v-if="isIconComponent"
        />
        <i
          v-else-if="icon"
          :class="[icon ?? `fa fa-${icon}`, isExpanded ? 'mr-2' : 'mx-auto']"
        />

        <span v-if="isExpanded">
          {{ label }}
        </span>
        <span v-else-if="!icon">
          {{ label?.at?.(0) }}
        </span>
        <div
          v-if="itemCounter"
          class="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full shadow-md"
          :class="[itemCounter.class ?? 'bg-error' , isExpanded && 'ml-4']"
        >
          {{ itemCounter.count }}
        </div>
      </component>
    </slot>
  </div>
</template>
