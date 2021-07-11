import AtSideSideItem from './AtSideItem.vue'
import AtLink from "../../atoms/AtLink/AtLink.vue";
import { InertiaLink } from "@inertiajs/inertia-vue3";

export default {
  title: 'Molecules/AtSideItem',
  component: AtSideSideItem,
};

const Template = (args) => ({
  components: { AtSideSideItem, InertiaLink },
  setup() {
    return { args };
  },
  template: `<AtSideItem v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  icon: 'home',
  label: 'Home',
  to: '/',
  class: 'text-gray-400'
};