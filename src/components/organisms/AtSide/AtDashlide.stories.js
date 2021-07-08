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
        v-bind="args" class="bg-white text-gray-700"

      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Atmosphere UI',
  menu: [
    {
      icon: 'users',
      label: 'Users',
      childs: [
        { 
          icon: 'user',
          label: 'Edit',
        }
      ]
    },
    {
      icon: 'home',
      label: 'Dashboard',
      childs: [
        { 
          icon: 'user',
          label: 'Edit',
        }
      ]
    }
  ],
  itemClass:"text-gray-700 hover:bg-gray-500 hover:text-white",
  itemActiveClass: "bg-gray-500 text-white"
};


