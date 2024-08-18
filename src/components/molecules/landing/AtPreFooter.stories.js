import AtPreFooter from "./AtPreFooter.vue";

export default {
  title: "Molecules/AtPreFooter",
  component: AtPreFooter,
};

const Template = (args) => ({
  components: { AtPreFooter },
  setup() {
    return { args };
  },
  template: `<div class="w-full">
    <AtPreFooter v-bind="args" v-on="args" class="w-full bg-gray-900 text-white" />
</div>`,
});

export const Default = Template.bind({});
Default.args = {
  sections: {
    general: {
      label: "General Resources",
      links: {
        Docs: "",
        Blog: "",
        "Use Cases": "",
      },
    },
    more: {
      label: "More",
      links: {
        Zenboard: "",
        Atmosphere: "",
        Lumiere: "",
        "Insane Code": "",
      },
    },
    about: {
      label: "About Neatlancer",
      links: {
        "Open Source Software": "",
        Github: "",
        Twitter: "",
      },
    },
    legal: {
      label: "Legal",
      links: {
        "Privacy Policy": "/privacy-policy",
        "Terms of service": "/terms",
      },
    },
  },
};
