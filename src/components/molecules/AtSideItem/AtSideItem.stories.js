import AtSideSideItem from './AtSideItem.vue'
import AtLink from "../../atoms/AtLink/AtLink.vue";

export default {
  title: 'Molecules/AtSideItem',
  component: AtSideSideItem,
};

const Template = (args) => ({
  components: { AtSideSideItem, InertiaLink: AtLink },
  setup() {
    return { args };
  },
  template: `<AtSideItem v-bind="args">
    <template #link="props">
      <InertiaLink> {{ props }}</InertiaLink>
    </template>
  </AtSideItem>`,
});

export const Default = Template.bind({});
Default.args = {
  icon: 'users',
  label: 'Users',
  childs: [
    { 
      icon: 'user',
      label: 'Edit',
    }
  ]
};