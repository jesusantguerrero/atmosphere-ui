import AtVideo from "./AtVideo.vue";

export default {
    title: "Organisms/AtVideo  ",
    component: AtVideo,
};

const Template = (args) => ({
    components: { AtVideo },
    setup() {
        return { args };
    },
    template: `
    <div class="w-96">
      <AtVideo
        v-bind="args"
      />
    </div>
  `,
});

const CustomTemplate = (args) => ({
    components: { AtVideo },
    setup() {
        return { args };
    },
    template: `
    <div class="w-96">
      <AtVideo
        v-bind="args"
      >
        <button class="h-10 w-10 rounded-full bg-pink-400">
        
        </button>
      </AtVideo>
    </div>
  `,
});
export const Default = Template.bind({});
Default.args = {
    imageUrl:
        "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/11/1030_Earth_atmosphere_explainer.jpg",
    src: "https://www.framer.com/images/developers/hero.mp4",
};

export const CustomButton = CustomTemplate.bind({});

CustomButton.args = {
    imageUrl:
        "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/11/1030_Earth_atmosphere_explainer.jpg",
    src: "https://www.framer.com/images/developers/hero.mp4",
};
