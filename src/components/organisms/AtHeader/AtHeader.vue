<template>
  <nav class="app-header">
    <!-- Primary Navigation Menu -->
    <div class="px-4 mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Navigation Links -->
        </div>

        <div class="hidden sm:flex sm:items-center sm:ml-6">
          <AtTeamSelect
            :has-team-features="true"
            :current-team="currentTeam"
            :teams="teams"
            :can-create-teams="true"
            :route="route"
            @switch-team="$emit('switch-team', $event)"
          />

          <!-- Settings Dropdown -->
          <AtUserButton 
            :show-profiles="showProfile"
            :options="userButtonOptions"
            v-on="$attrs"
          />
        </div>

        <!-- Hamburger -->
        <div class="flex items-center -mr-2 sm:hidden">
          <button
            @click="state.showingNavigationDropdown = !state.showingNavigationDropdown"
            class="inline-flex items-center justify-center p-2 text-gray-400 transition rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
          >
            <svg
              class="w-6 h-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{
                  hidden: state.showingNavigationDropdown,
                  'inline-flex': !state.showingNavigationDropdown,
                }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{
                  hidden: !state.showingNavigationDropdown,
                  'inline-flex': state.showingNavigationDropdown,
                }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div
      :class="{
        block: state.showingNavigationDropdown,
        hidden: !state.showingNavigationDropdown,
      }"
      class="sm:hidden"
    >
      <div class="pt-2 pb-3 space-y-1">
        <at-responsive-nav-link
          :href="route('dashboard')"
        >
          Dashboard
        </at-responsive-nav-link>
      </div>

      <!-- Responsive Settings Options -->
    </div>
  </nav>
</template>

<script setup>
import { reactive } from "vue";
import AtTeamSelect from "../AtTeamSelect/AtTeamSelect.vue";
import AtUserButton from "../AtUserButton/AtUserButton.vue";

const props = defineProps({
  hasTeamFeatures: {
    type: Boolean,
    default: false,
  },
  canCreateTeams: {
    type: Boolean,
    default: false,
  },
  currentTeam: {
    type: Object,
    default: () => ({}),
  },
  teams: {
    type: Array,
    default: () => [],
  },
  route: {
    type: Function,
    default: () => (path) => {
      return {
        current(path) {
          return path 
        },
      } 
    },
  },
  showProfile: {
    type: Boolean,
    default: false,
  },
  userButtonOptions: {
    type: Object,
    default: () => ({}),
  },
});

const state = reactive({
  showingNavigationDropdown: false,
});
</script>
