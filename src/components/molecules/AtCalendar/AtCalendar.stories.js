import AtCalendar from "./AtCalendar.vue";

export default {
    title: 'Molecules/AtCalendar',
    component: AtCalendar,
    argTypes: { selected: {action: 'selected' }}
};
  
const Template = (args) => ({
components: { AtCalendar },
setup() {
    return { args };
},
template: '<div class="w-52"><at-calendar v-bind="args" v-on="args" class="w-full"/></div>',
});

export const Default = Template.bind({});
Default.args = {
    selected: new Date()
}