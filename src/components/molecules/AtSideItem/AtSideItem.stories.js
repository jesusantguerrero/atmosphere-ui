import AtSideSideItem from "./AtSideItem.vue";
import AtLink from "../../atoms/AtLink/AtLink.vue";
import { Link } from "@inertiajs/vue3";

export default {
  title: "Molecules/AtSideItem",
  component: AtSideSideItem,
};

const Template = (args) => ({
  components: { AtSideSideItem, InertiaLink: Link },
  setup() {
    return { args };
  },
  template: `<AtSideItem v-bind="args" />`,
});

export const Default = Template.bind({});
Default.args = {
  icon: "home",
  label: "Home",
  to: "/",
  classes: "text-gray-400",
  as: Link,
};

const TemplateWithCustom = (args) => ({
  components: { AtSideSideItem, AtLink },
  setup() {
    return { args };
  },
  template: `<AtSideItem v-bind="args"> 
    <AtLink href="https://google.com">Google</AtLink> 
  </AtSideItem>`,
});

export const CustomChild = TemplateWithCustom.bind({});
CustomChild.args = {
  icon: "home",
  label: "Home",
  to: "/",
  classes: "text-gray-400",
};
