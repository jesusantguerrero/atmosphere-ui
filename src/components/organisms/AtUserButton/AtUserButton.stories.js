import AtUserButton from './AtUserButton.vue';

export default {
  title: 'Organisms/AtUserButton',
  component: AtUserButton,
};

const Template = (args) => ({
  components: { AtUserButton},
  setup() {
    return { args };
  },
  template: `
    <div class="flex justify-end">
      <AtUserButton
        v-bind="args"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
    options: {
      account: {
        label: "General options",
        sections: [
          ["Profile", "/settings/profile"],
          ["Favorites", "/favorites"],
          ["My Collection", "/my-items"],
          ["Favorites", "/settings"],
          ["Logout", { emit: 'logout', separator: true }],
        ]
      }
    }
};

export const HiddenOption = Template.bind({});
HiddenOption.args = {
    options: {
      account: {
        label: "General options",
        sections: [
          ["Profile", "/settings/profile"],
          ["Favorites", "/favorites"],
          ["My Collection", "/my-items"],
          ["Favorites", "/settings"],
          ["Logout", { emit: 'logout', hide: true }],
        ]
      }
    }
};


