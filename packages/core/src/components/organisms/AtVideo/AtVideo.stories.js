import AtVideo from './AtVideo.vue';

export default {
  title: 'Organisms/AtVideo  ',
  component: AtVideo,
};

const Template = (args) => ({
  components: { AtVideo},
  setup() {
    return { args };
  },
  template: `
    <div style="{width: '500px'}">
      <AtVideo
        v-bind="args"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
    imageUrl: "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/11/1030_Earth_atmosphere_explainer.jpg",
    src: "https://www.framer.com/images/developers/hero.mp4"
};


