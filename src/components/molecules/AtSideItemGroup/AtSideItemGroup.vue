<script lang="ts" setup>
import { computed, inject, onMounted, ref } from "vue";
import AtSideItem from "../AtSideItem/AtSideItem.vue";

interface IMenuItem {
  // eslint-disable-next-line @typescript-eslint/ban-types
  icon?: string | Object;
  name: string;
  label: string;
  to: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  as: string | Object;
  hidden?: boolean;
  class?: string;
  isActiveFunction?: (url: string, currentPath: string) => boolean;
}

const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line @typescript-eslint/ban-types
    icon: string | Object;
    label: string;
    name?: string;
    childs?: IMenuItem[];
    modelValue: string;
    trackId: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    as: string | Object;
    itemClass;
    childClass;
    string;
    itemActiveClass: string;
    childActiveClass: string;
    hide: boolean;
  }>(),
  {
    as: "router-link",
  }
);

const isExpanded = inject("isExpanded");
const currentPath = inject("currentPath", ref(""));

const isActive = computed(() => {
  return props.trackId == props.modelValue;
});
const hasActiveChild = computed(() => {
  return !isActive.value && props.childs.find((item) => item.to == currentPath.value);
});
const arrowIcon = computed(() => {
  return isActive.value ? "chevron-down" : "chevron-right";
});

const emit = defineEmits(["update:modelValue"]);
const emitValue = () => {
  const current = props.modelValue == props.trackId ? "" : props.trackId;
  emit("update:modelValue", current);
};

const isIconComponent = computed(() => {
  return typeof props.icon !== "string";
});

onMounted(() => {
  if (hasActiveChild.value) {
    emitValue();
  }
});
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between text-left transition cursor-pointer"
      v-bind="$attrs"
      :class="[
        isActive || (!isActive && hasActiveChild) ? itemActiveClass : itemClass,
        isExpanded ? 'px-5' : 'px-3',
      ]"
      :title="label"
      @click="emitValue()"
    >
      <span class="w-full py-4 text-current side-item">
        <component :is="icon" class="mr-2" v-if="isIconComponent" />
        <i :class="`fa fa-${icon} mr-2`" v-else-if="icon" />
        <span v-if="isExpanded">
          {{ label }}
        </span>
      </span>

      <span class="indicator">
        <i :class="`fa fa-${arrowIcon}`" />
      </span>
    </div>

    <div
      class="menu-item-group__childs"
      :class="{ 'my-collapse': isActive, 'custom-accordion': true }"
    >
      <div class="mt-1 mb-1 space-y-1 child-container" v-show="isActive">
        <AtSideItem
          v-for="item in childs.filter((item) => !item.hidden)"
          :ref="`${label}-${item.label}`"
          :key="`${label}-${item.label}`"
          :icon="item.icon"
          :label="item.label"
          :name="item.name"
          :to="item.to"
          :as="item.as ?? as"
          :item-active-class="childActiveClass ?? item.class ?? itemActiveClass"
          :classes="childClass ?? item.class ?? itemClass"
        >
          <slot :name="item.name" />
        </AtSideItem>
      </div>
    </div>
  </div>
</template>
