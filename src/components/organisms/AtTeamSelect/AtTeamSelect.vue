<template>
  <div class="relative">
    <dropdown align="right" width="60" v-bind="$attrs" v-if="hasTeamFeatures">
      <template #trigger>
        <span class="inline-flex rounded-md">
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition bg-white border border-transparent rounded-md hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50"
          >
            {{ currentTeam.name }}

            <svg
              class="ml-2 -mr-0.5 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </span>
      </template>

      <template #content>
        <div class="w-60">
          <!-- Team Management -->
          <template v-if="hasTeamFeatures">
            <div class="block px-4 py-2 text-xs text-gray-400">
              {{ sectionTitle }}
            </div>

            <!-- Team Settings -->
            <AtDropdownLink :href="route('teams.show', currentTeam)">
              {{ resourceName }} Settings
            </AtDropdownLink>

            <AtDropdownLink :href="route('teams.create')" v-if="canCreateTeams">
              Create New {{ resourceName }}
            </AtDropdownLink>

            <div class="border-t border-gray-100"></div>

            <!-- Team Switcher -->
            <div class="block px-4 py-2 text-xs text-gray-400">
              Switch {{ resourceName }}
            </div>

            <template v-for="team in teams" :key="team.id">
              <form @submit.prevent="$emit('switch-team', team)">
                <AtDropdownLink as="button">
                  <div class="flex items-center">
                    <svg
                      v-if="team.id == currentTeam.id"
                      class="w-5 h-5 mr-2 text-green-400"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div>{{ team.name }}</div>
                  </div>
                </AtDropdownLink>
              </form>
            </template>
          </template>
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script setup>
import Dropdown from "../../molecules/AtDropdown/AtDropdown.vue";
import AtDropdownLink from "../../molecules/AtDropdownLink/AtDropdownLink.vue";

defineProps({
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
    default: () => (path) => path,
  },
  sectionTitle: {
    type: String,
    default: "Manage Team",
  },
  resourceName: {
    type: String,
    default: "Team",
  },
});

defineEmits(["switch-team", "create"]);
</script>
