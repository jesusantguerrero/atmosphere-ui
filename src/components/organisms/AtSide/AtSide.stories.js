import { Link } from "@inertiajs/inertia-vue3";
import { ref } from "vue";
import AtSide from "./AtSide.vue";

export default {
    title: "Organisms/AtSide",
    component: AtSide,
};

const Template = (args) => ({
    components: { AtSide },
    setup() {
        const isExpanded = ref(true);
        return { args, isExpanded };
    },
    template: `
    <div :class="isExpanded ? 'w-96' : 'w-32'">
      <AtSide 
        v-bind="args"
        v-model:isExpanded="isExpanded"
      />
    </div>
  `,
});

const menu = [
    {
        icon: "users",
        label: "People",
        items: [
            {
                icon: "user",
                label: "Edit",
                to: "/people/edit",
            },
        ],
    },
    {
        icon: "star",
        label: "Favorites",
        items: [
            {
                icon: "user",
                label: "Songs",
                to: "/favorites/songs",
            },
            {
                icon: "user",
                label: "Edit",
                to: "/favorites/books",
            },
        ],
    },
    {},
    {
        icon: "home",
        label: "Dashboard",
        items: [
            {
                to: "/dashboard",
                icon: "Home",
                label: "Home",
            },
        ],
    },
];

export const Default = Template.bind({});
Default.args = {
    title: "Atmosphere UI",
    menu,
    class: "bg-white text-gray-700",
    itemClass: "text-gray-700 hover:bg-gray-500 hover:text-white",
    itemActiveClass: "bg-gray-500 text-white",
};

export const Mini = Template.bind({});
Mini.args = {
    title: "Atmosphere UI",
    menu,
    class: "bg-white text-gray-700",
    itemClass: "text-gray-700 hover:bg-gray-500 hover:text-white",
    itemActiveClass: "bg-gray-500 text-white",
    isExpandable: true,
};

export const WithHeaderMenu = Template.bind({});
WithHeaderMenu.args = {
    title: "Atmosphere UI",
    menu,
    headerMenu: menu,
    class: "bg-white text-gray-700",
    itemClass: "text-gray-700 hover:bg-gray-500 hover:text-white",
    itemActiveClass: "bg-gray-500 text-white",
};

export const WithTheme = Template.bind({});
WithTheme.args = {
    title: "Atmosphere UI",
    class: "bg-gray-700 text-white",
    menu,
    itemClass: "text-white hover:bg-gray-500 hover:text-white",
    itemActiveClass: "bg-gray-500 text-white",
};

export const ItemActive = Template.bind({});
ItemActive.args = {
    title: "Atmosphere UI",
    class: "bg-gray-700 text-white",
    menu,
    currentPath: "/dashboard",
    itemClass: "text-white hover:bg-gray-500 hover:text-white",
    itemActiveClass: "bg-gray-500 text-white",
};

export const WithSections = Template.bind({});
WithSections.args = {
    itemActiveClass: "bg-gray-500 text-white",
    menu: [
        {
            icon: "fa fa-home",
            label: "Home",
            to: "/dashboard",
        },
        {
            section: "Activity",
            items: [
                {
                    icon: "fa fa-bar-chart",
                    label: "Habits",
                    to: "/dashboard/habits",
                },
                {
                    icon: "fa fa-question-circle",
                    label: "Prompts",
                    to: "/dashboard/prompts",
                    isActiveFunction(url, currentPath) {
                        return true;
                    },
                },
                {
                    icon: "fa fa-circle-o-notch",
                    label: "Cycles",
                    to: "/dashboard/cycles",
                },
                {
                    icon: "fa fa-circle-o-notch",
                    label: "Rewards",
                    to: "/dashboard/rewards",
                },
            ],
        },
        {
            section: "Resources",
            items: [
                {
                    icon: "",
                    label: "Resources",
                    to: "/dashboard/resources",
                },
                {
                    icon: "",
                    label: "My Resources",
                    to: "/dashboard/my-resources",
                },
            ],
        },
    ],
};

export const ProductionExample = Template.bind({});
ProductionExample.args = {
    title: "Loger",
    menu: [
        {
            icon: "fa fa-home",
            name: "home",
            label: "Home",
            to: "/dashboard",
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
            to: "/housing",
            as: Link,
        },
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
    class: "bg-white text-gray-700",
    itemClass: "text-gray-700 hover:bg-gray-500 hover:text-white",
    itemActiveClass: "bg-gray-500 text-white",
    isExpandable: true,
    currentPath: "/",
};
