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
        childs: [
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
        childs: [
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
        childs: [
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
