<template>
  <at-dropdown placement="bottom-end" :width="300" trigger="click">
    <template #trigger>
      <div
        class="relative flex p-2 text-sm font-bold text-gray-400 rounded-full cursor-pointer select-none hover:bg-gray-100 lg:text-lg dark:hover:bg-gray-600 dark:hover:text-white"
      > 
        <div class="w-6 h-6 bg-red-200 rounded-full cursor-pointer">
        </div>
      </div>
    </template>

    <template #content>
      <div class="py-3 text-sm user-button" v-for="(option, groupName) in options" :key="groupName">
        <div
          class="flex items-center justify-between px-3 pb-2 text-xs font-bold text-center text-gray-400"
        >
          <div>{{ option.label }}</div>
        </div>
        <div class="flex flex-col text-gray-600">
          <template v-for="section in option.sections">
              <AtDropdownLink
                v-if="isSectionLink(section)"
                :is-inertia="isInertia"
                :as="section[3]"
                :to="section[1]"
                class="border-none"
              >
                {{ section[0] }}
              </AtDropdownLink>

              <button v-else-if="isSectionAction(section)" @click="$emit(section[1].emit)" class="block w-full px-3 py-2 text-left hover:bg-gray-100">
                {{ section[0] }}
              </button>

              <div v-else class="w-full h-0 border "></div>
          </template>
        </div>
      </div>
    </template>
  </at-dropdown>
</template>

<script setup>
import AtDropdown  from "../../molecules/AtDropdown/AtDropdown.vue";
import AtDropdownLink from '../../molecules/AtDropdownLink/AtDropdownLink.vue';

const props = defineProps({
      options: {
          type: Object,
          default() {
              return {}
          }
      },
      isInertia: {
        type: Boolean,
        default: false
      }
})

const isSectionLink = (section) => {
  return Array.isArray(section) && typeof section[1] == 'string'; 
}

const isSectionAction = (section) => {
  return Array.isArray(section) && typeof section[1] == 'object'; 
}
</script>

<style>
.user-button {
  min-width: 192px;
}
</style>
