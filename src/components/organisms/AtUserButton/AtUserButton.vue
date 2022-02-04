<template>
  <at-dropdown placement="bottom-end" :width="300" trigger="click">
    <template #trigger>
      <div
        class="relative flex w-10 h-10 text-sm font-bold text-gray-400 rounded-full cursor-pointer select-none hover:bg-gray-100 lg:text-lg dark:hover:bg-gray-600 dark:hover:text-white"
        :class="handlerClass"
      > 
        <div class="flex items-center justify-center w-full h-full border-2 rounded-full cursor-pointer">
          <slot>
            <div class="w-4 h-4">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" fill="currentColor"></path></svg>
            </div>
          </slot>
        </div>
      </div>
    </template>

    <template #content>
      <div class="py-3 text-sm text-left user-button" v-for="(option, groupName) in options" :key="groupName">
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
                class="border-none cursor-pointer"
              >
                {{ section[0] }}
              </AtDropdownLink>

              <button 
                v-else-if="isSectionAction(section) && !section[1].hide" 
                :class="getClasses(section)"
                @click="$emit(section[1].emit)" class="block w-full px-3 py-2 text-left hover:bg-gray-100"
              >
                {{ section[0] }}
              </button>

              <div v-else-if="!section[0]" class="w-full h-0 border" />
          </template>
        </div>
      </div>
    </template>
  </at-dropdown>
</template>

<script setup>
import AtDropdown  from "../../molecules/AtDropdown/AtDropdown.vue";
import AtDropdownLink from '../../molecules/AtDropdownLink/AtDropdownLink.vue';

defineProps({
  options: {
      type: Object,
      default() {
          return {}
      }
  },
  isInertia: {
    type: Boolean,
    default: false
  },
  handlerClass: {
    type: String,
    default: ''
  }
})

const isSectionLink = (section) => {
  return Array.isArray(section) && typeof section[1] == 'string'; 
}

const isSectionAction = (section) => {
  return Array.isArray(section) && typeof section[1] == 'object'; 
}


const hasClasses = (section) => {
  return !!section[1].class;
}

const getClasses = (section) => {
  return {'border-t': section[1].separator, [section[1].class]: hasClasses(section)}
}
</script>

<style>
.user-button {
  min-width: 192px;
}
</style>
