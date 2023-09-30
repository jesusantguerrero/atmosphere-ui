import { Link } from "@inertiajs/vue3";
import { ref } from "vue";
import AtSide from "./AtSide.vue";
import CustomIcon from "./CustomIcon.vue";
import AtSideAccountItem from "./AtSideAccountItem.vue";
import AtTeamSelect from "../AtTeamSelect/AtTeamSelect.vue";

export default {
  title: "Examples/AtSideBlock",
  component: AtSide,
};

const HeaderSlotTemplate = (args) => ({
  components: { AtSide, AtTeamSelect },
  setup() {
    const teamProps = {
      hasTeamFeatures: true,
      canCreateTeams: true,
      currentTeam: {
        id: "1",
        name: "Team 1",
        description: "Team 1 description",
        avatar: "https://via.placeholder.com/150",
      },
      teams: [
        {
          id: "1",
          name: "Team 1",
          description: "Team 1 description",
          avatar: "https://via.placeholder.com/150",
        },
        {
          id: "2",
          name: "Team 2",
          description: "Team 2 description",
          avatar: "https://via.placeholder.com/150",
        },
      ],
      imageUrl:"blob:http://neatlancer.test/f87e1fb3-c9f4-42dd-8604-8d6e61b74779",
      colors: "bg-white text-gray-700 hover:bg-gray-200 transition",
      rounded: false,
      fullHeight: true,
    };

    const isExpanded = ref(true);
    return { args, isExpanded, teamProps };
  },
  template: `
    <div :class="isExpanded ? 'w-96' : 'w-16'">
      <AtSide 
        v-bind="args"
        v-model:isExpanded="isExpanded"
      >
      <template #brand="{ toggleExpand }">
       <section class="cursor-pointer flex justify-between pr-4">
        <p class="capitalize font-bold text-lg" v-if="isExpanded">
          Atmosphere<span class="text-orange-500">UI</span>
        </p>
        <p class="capitalize font-bold text-lg mx-auto mt-2" :class="isExpanded ? '' : 'group-hover:hidden'" v-else>
          A<span class="text-orange-500">UI</span>
        </p>
        <section :class="{'group-hover:flex hidden transition-all mx-auto mt-2': !isExpanded }">
          <button class="bg-gray-100 rounded-md px-4 py-2 font-bold hover:text-orange-400 hover:border-orange-300 border"  @click="toggleExpand"> 
            < 
          </button>
        </section>
       </section>
      </template>
      <template #start>
        <section class="w-full h-16">
          <AtTeamSelect 
            v-bind="teamProps" 
            class="w-full" 
            :image-only="!isExpanded" 
            :hide-icon="!isExpanded" 
          />
        </section>
      </template>
      <template #end>
        <section class="w-full h-16">
          <AtTeamSelect 
            v-bind="teamProps" 
            class="w-full" 
            :image-only="!isExpanded" 
            :hide-icon="!isExpanded"
          />
        </section>
      </template>
      </AtSide>
    </div>
  `,
});


export const ExampleOne = HeaderSlotTemplate.bind({});
ExampleOne.args = {
  title: "ICLoan",
  menu: [
    {
      icon: CustomIcon,
      name: "home",
      label: "Home",
      to: "/",
      as: Link,
    },
    {
      icon: "far fa-calendar-alt",
      label: "Meal Planner",
      name: "mealPlanner",
      to: "/meal-planner",
      as: Link,
      isActiveFunction(url, currentPath) {
        return /meal-planner|meals|ingredients/.test(currentPath);
      },
    },
    {
      icon: "fas fa-dollar-sign",
      label: "Finance",
      name: "finance",
      to: "/finance",
      as: Link,
      isActiveFunction(url, currentPath) {
        return /finance|budgets|trends/.test(currentPath);
      },
    },
    {
      icon: "fas fa-heart",
      label: "Relationship",
      to: "/relationships",
      as: Link,
    },
    {
      icon: "fas fa-home",
      label: "Home Projects",
      name: "housing",
      to: "/housing",
      as: Link,
    },
    {
      separator: true,
      icon: "fas fa-wallet",
      label: "Accounts",
      name: "accounts",
      to: "/accounts",
      as: Link,
    },
    {
      icon: "fas fa-wallet",
      label: "Categories",
      name: "categories",
      to: "/categories",
      as: AtSideAccountItem,
    }
  ],
  headerMenu: [
    {
      icon: "cogs",
      label: "Settings",
    },
    {
      icon: "star",
      label: "Help",
    },
  ],
  class: "bg-white border-r border-gray-100",
  itemClass: "hover:bg-gray-100 hover:text-gray-600",
  itemActiveClass: "bg-orange-300/20 text-orange-600 font-bold",
  isExpandable: true,
  brandContainerClass: "group cursor-pointer",
  currentPath: "/",
  hideIcon: true,
  counters: {
    housing: {
      count: 7,
      class: 'bg-orange-400'
    },
  },
};
