<template>
    <dropdown
      align="right"
      
      width="60"
      v-bind="$attrs"
      v-if="hasTeamFeatures"
      :full-height="fullHeight"
    >
  
        <button
          :class="[
            rounded && 'rounded-md',
            fullHeight && 'h-full justify-between',
            colors,
          ]"
          type="button"
          class="inline-flex items-center w-full px-3 py-2 text-sm font-medium leading-4 transition border border-transparent focus:outline-none"
        >
          <section class="flex items-center">
            <div
              v-if="imageUrl || $slots.image"
              class="flex items-center justify-center w-10 h-10 bg-black rounded-md"
              :class="[imageOnly ? '' : 'mr-4']"
            >
              <slot name="image">
                <img :src="imageUrl" alt="" />
              </slot>
            </div>
            <article v-if="!imageOnly">
              {{ currentTeam.name }}
            </article>
          </section>

          <slot name="icon" v-if="!hideIcon">
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
          </slot>
        </button>

      <template #popper>
            <div class="w-60">
              <!-- Team Management -->
              <template v-if="hasTeamFeatures">
                <div class="block px-4 py-2 text-xs text-gray-400">
                  {{ sectionTitle }}
                </div>
    
                <!-- Team Settings -->
                <AtDropdownLink as="button" @click="$emit('settings')">
                  {{ resourceName }} Settings
                </AtDropdownLink>
    
                <AtDropdownLink
                  as="button"
                  @click="$emit('create')"
                  v-if="canCreateTeams"
                >
                  Create New {{ resourceName }}
                </AtDropdownLink>
    
                <div class="border-t border-gray-100"></div>
    
                <!-- Team Switcher -->
                <section v-if="teams.length > 1">
                  <h5 class="block px-4 py-2 text-xs text-gray-400">
                    Switch {{ resourceName }}
                  </h5>
      
                  <AtDropdownLink
                    v-for="team in teams"
                    :key="team.id"
                    as="button"
                    @click="$emit('switch-team', team)"
                  >
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
                </section>
              </template>
            </div>
      </template>
    </dropdown>
</template>

<script setup lang="ts">
import { Dropdown } from "floating-vue";
import AtDropdownLink from "../../molecules/AtDropdownLink/AtDropdownLink.vue";

interface Team {
  id: number;
  name: string;
}

withDefaults(
  defineProps<{
    hasTeamFeatures: boolean;
    canCreateTeams: boolean;
    currentTeam: Team;
    teams: Team[];
    sectionTitle: string;
    resourceName: string;
    imageUrl?: string;
    rounded: boolean;
    fullHeight?: boolean;
    imageOnly?: boolean;
    hideIcon?: boolean; 
    colors: string;
  }>(),
  {
    sectionTitle: "Manage Team",
    resourceName: "Team",
    rounded: true,
    colors:
      "text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 active:bg-gray-50",
  }
);

defineEmits(["switch-team", "create", "settings"]);
</script>
