<script setup>
import AtSideItemGroup from "~molecules/AtSideItemGroup/AtSideItemGroup.vue";
import AtSideItem from "~molecules/AtSideItem/AtSideItem.vue";

import { AtSideNavProps } from "./AtSideNavProps";

defineProps({
  ...AtSideNavProps,
  modelValue: {
    type: String,
  },
});
</script>

<template>
  <div>
    <template v-for="route in menu">
      <AtSideItem
        v-if="!route[itemProperty]"
        v-bind="route"
        :item-class="itemClass"
        :item-active-class="itemActiveClass"
        :key="route.label"
      />

      <div v-else-if="route.section" :key="`${route.label}-section`">
        <p class="pl-5 mt-2 text-sm font-bold text-gray-400 capitalize">
          {{ route.section }}
        </p>
        <AtSideItem
          v-for="sectionItem in route[itemProperty]"
          :key="`${sectionItem.section}-${route.label}`"
          v-bind="sectionItem"
          :item-class="itemClass"
          :item-active-class="itemActiveClass"
          :track-id="sectionItem.label"
        />
      </div>

      <AtSideItemGroup
        v-else-if="route[itemProperty]"
        class="w-full"
        :model-value="modelValue"
        :key="`${route.label}-group`"
        :item-class="itemClass"
        :item-active-class="itemActiveClass"
        :child-class="childClass"
        :child-active-class="childActiveClass"
        :track-id="route.label"
        :icon="route.icon"
        :icon-component="route.iconComponent"
        :label="route.label"
        :childs="route[itemProperty]"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </template>
  </div>
</template>
