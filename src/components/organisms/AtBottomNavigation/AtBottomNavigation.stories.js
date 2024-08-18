import AtBottomNavigation from "./AtBottomNavigation.vue";

export default {
  title: "Organisms/AtBottomNavigation",
  component: AtBottomNavigation,
  argTypes: {
    menu: {
      type: Object,
    },
  },
};

const Template = (args) => ({
  components: { AtBottomNavigation },
  setup() {
    return { args };
  },
  template: `<AtBottomNavigation v-bind="args"></AtBottomNavigation>`,
});

const menuItems = [
  {
    icon: "users",
    name: "users",
    label: "People",
    childs: [
      {
        icon: "user",
        label: "Edit",
      },
    ],
  },
  {
    icon: "star",
    name: "favorites",
    label: "Favorites",
    childs: [
      {
        icon: "user",
        label: "Edit",
      },
    ],
  },
  {},
  {
    icon: "home",
    name: "home",
    label: "Dashboard",
    childs: [
      {
        icon: "user",
        label: "Edit",
      },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  menuItems,
};
