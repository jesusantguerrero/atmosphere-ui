import AtSiteFooter from "./AtSiteFooter.vue";

export default {
    title: 'Molecules/AtSiteFooter',
    component: AtSiteFooter,
};
  
const Template = (args) => ({
components: { AtSiteFooter },
setup() {
    return { args };
},
template: `<div class="w-full">
    <AtSiteFooter v-bind="args" v-on="args" class="w-full bg-gray-900" />
</div>`,
});

export const Default = Template.bind({});
Default.args = {
    title: 'Lumiere',
    year: new Date().getFullYear(),
    subtitle: 'Lumiere - The firebase template',
    links: [{
        name: 'facebook'
    }, {
        name: 'twitter'
    }, {
        name: 'github'
    }, {
        name: 'github'
    }]
}