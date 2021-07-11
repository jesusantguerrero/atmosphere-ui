import AtSide from './AtSide.vue';

export default {
  title: 'Organisms/AtSide',
  component: AtSide,
};

const Template = (args) => ({
  components: { AtSide },
  setup() {
    return { args };
  },
  template: `
    <div class="w-96">
      <AtSide 
        v-bind="args"
      />
    </div>
  `,
});

const menu =  [
  {
    icon: 'users',
    label: 'People',
    childs: [
      { 
        icon: 'user',
        label: 'Edit',
      }
    ]
  },
  {
    icon: 'star',
    label: 'Favorites',
    childs: [
      { 
        icon: 'user',
        label: 'Edit',
      }
    ]
  }, {

  }, {
    icon: 'home',
    label: 'Dashboard',
    childs: [
      { 
        icon: 'user',
        label: 'Edit',
      }
    ]
  }
];

export const Default = Template.bind({});
Default.args = {
  title: 'Atmosphere UI',
  menu,
  class: "bg-white text-gray-700",
  itemClass:"text-gray-700 hover:bg-gray-500 hover:text-white",
  itemActiveClass: "bg-gray-500 text-white"
};

export const WithTheme = Template.bind({});
WithTheme.args = {
  title: 'Atmosphere UI',
  class: "bg-gray-700 text-white",
  menu,
  itemClass:"text-white hover:bg-gray-500 hover:text-white",
  itemActiveClass: "bg-gray-500 text-white"
};


