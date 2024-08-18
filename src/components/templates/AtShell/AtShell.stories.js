import AtShell from "./AtShell.vue";
import AtSide from "../../organisms/AtSide/AtSide.vue";
import AtHeader from "../../organisms/AtHeader/AtHeader.vue";

import * as AtSideStories from "../../organisms/AtSide/AtSide.stories";
import * as AtHeaderStories from "../../organisms/AtHeader/AtHeader.stories";

export default {
  title: "Templates/AtShell",
  component: AtShell,
};

const Template = (args) => ({
  components: { AtShell, AtSide, AtHeader },
  setup() {
    return { args };
  },
  template: `<AtShell>
        <template #navigation>
            <AtHeader v-bind="args.header" />
        </template>
        <template #aside>
         <AtSide v-bind="args.aside" />
        </template>
        <template #main-section>
            This is the content
        </template>
    </AtShell>`,
});

export const Default = Template.bind({});
Default.args = {
  aside: AtSideStories.ProductionExample.args,
  header: AtHeaderStories.Default.args,
};
