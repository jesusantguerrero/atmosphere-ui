import AtHeader from './AtHeader.vue';

export default {
  title: 'Organisms/AtHeader  ',
  component: AtHeader,
};

const Template = (args) => ({
  components: { AtHeader},
  setup() {
    return { args };
  },
  template: `
    <div>
      <AtHeader
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
    userButtonOptions: {
      account: {
        label: "Manage Account",
        sections: [
            ["Settings", '/settings' ],
            ["Profile", '/settings/profile'],
            ["Billing", '/settings/billing'],
            '',
            ['API Tokens', '/settings/tokens'],
            ['About', '/about'],
            '',
            ['Logout', {
              emit: 'logout'
            }]
        ]
    }
    },
};


