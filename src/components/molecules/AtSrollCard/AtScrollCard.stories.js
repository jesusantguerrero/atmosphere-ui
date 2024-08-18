import AtScrollCard from "./AtScrollCard.vue";

export default {
  title: "Molecules/AtScrollCard",
  component: AtScrollCard,
};

const Template = (args) => ({
  components: { AtScrollCard },
  setup() {
    return { args };
  },
  template: `<div class="w-full">
        <AtScrollCard v-bind="args" v-on="args" class="w-full bg-gray-900 text-white" v-slot:default="{ item }">
            <div
                v-if="item"
                class="cursor-pointer w-4/12 font-bold text-white border-pink-400 transition rounded-md bg-gradient-to-br from-purple-400 to-pink-500 hover:bg-pink-500 h-20 flex flex-col items-center justify-center"
            >
                <h4>
                    {{ item.name }}
                </h4>
                <p>{{ item.description  }}</p>
        </div>
        </AtScrollCard>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  list: [
    {
      name: "Desayuno",
    },
    {
      name: "Comida",
    },
    {
      name: "Cena",
    },
    {
      name: "Cena",
    },
    {
      name: "Cena",
    },
  ],
};
