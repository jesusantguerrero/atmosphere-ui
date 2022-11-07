import AtSiteHeader from "./AtSiteHeader.vue";

export default {
    title: "Molecules/AtSiteHeader",
    component: AtSiteHeader,
};

const Template = (args) => ({
    components: { AtSiteHeader },
    setup() {
        return { args };
    },
    template: `<div class="w-full bg-gray-900">
    <AtSiteHeader v-bind="args" v-on="args" class="w-full bg-gray-900 text-white" />
</div>`,
});

const links = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Features",
        url: "/features",
    },
    {
        name: "Blog",
        url: "/blog",
    },
    {
        name: "Contact",
        url: "/contact",
    },
];

const actions = [
    {
        name: "Login",
        url: "/login",
        class: "text-green-400 transition bg-white rounded-md hover:bg-green-500 hover:text-white",
    },
    {
        name: "Start a free trial",
        url: "/signup",
        class: "text-white transition bg-green-400 rounded-md hover:bg-green-500",
    },
];

export const Default = Template.bind({});
Default.args = {
    title: "Lumiere",
    links,
    actions,
};

export const WithEmit = Template.bind({});
WithEmit.args = {
    title: "Lumiere",
    links: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Features",
            url: "/features",
        },
        {
            name: "Blog",
            url: "/blog",
        },
        {
            name: "Contact",
            url: "/contact",
        },
    ],
    actions: [
        {
            name: "Login",
            url: "/login",
            class: "text-green-400 transition bg-white rounded-md hover:bg-green-500 hover:text-white",
        },
        {
            name: "Start",
            url: "/login",
            emit: true,
            class: "text-white transition bg-green-400 rounded-md hover:bg-green-500",
        },
    ],
};

export const SmallSize = Template.bind({});
SmallSize.args = {
    title: "Lumiere",
    links,
    actions,
    size: "small",
};

export const MediumSize = Template.bind({});
MediumSize.args = {
    title: "Lumiere",
    links,
    actions,
    size: "medium",
};
