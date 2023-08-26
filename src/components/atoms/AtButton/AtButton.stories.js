import AtButton from "./AtButton.vue";
import AtThemeProvider from "../AtThemeProvider/AtThemeProvider.vue";

export default {
  title: "Atoms/AtButton",
  component: AtButton,
};

const Template = (args) => ({
  components: { AtButton },
  setup() {
    return { args };
  },
  template: '<at-button v-bind="args" > Submit </at-button>',
});

const ThemeProviderSetup = (args, { argTypes }) => ({
  components: { AtButton, AtThemeProvider },
  props: Object.keys(argTypes),
  setup() {
    return { args };
  },
  template: `<AtThemeProvider :config="args.themeProviderArgs">
  <at-button v-bind="args"> Submit </at-button>
  </AtThemeProvider>`,
});

export const Default = Template.bind({});
Default.args = {
  type: "primary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: "primary",
  disabled: true,
};

export const Primary = Template.bind({});
Primary.args = {
  type: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
};

export const Danger = Template.bind({});
Danger.args = {
  type: "danger",
};

export const withThemeProvider = ThemeProviderSetup.bind({});
withThemeProvider.args = {
  type: "primary",
  themeProviderArgs: {
    button: {
      shape: "rounded-md",
      colors: {
        primary: "bg-pink-500 text-white",
      },
    },
  },
};

export const AsLink = Template.bind({});
AsLink.args = {
  type: "danger",
  as: "a",
};
