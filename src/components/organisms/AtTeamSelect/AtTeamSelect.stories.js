import AtTeamSelect from './AtTeamSelect.vue';

export default {
  title: 'Organisms/AtTeamSelect  ',
  component: AtTeamSelect,
};

const Template = (args) => ({
  components: { AtTeamSelect},
  setup() {
    return { args };
  },
  template: `
    <div>
      <AtTeamSelect
        v-bind="args"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
    hasTeamFeatures: true,
    canCreateTeams: true,
    currentTeam: {
        id: '1',
        name: 'Team 1',
        description: 'Team 1 description',
        avatar: 'https://via.placeholder.com/150',
    },
    teams: [
        {
            id: '1',
            name: 'Team 1',
            description: 'Team 1 description',  
            avatar: 'https://via.placeholder.com/150',
        },
        {
            id: '2',
            name: 'Team 2',
            description: 'Team 2 description',
            avatar: 'https://via.placeholder.com/150',  
        },
      ],
};


