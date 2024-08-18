import AtTable from "./AtTable.vue";

export default {
  title: "Organisms/AtTable  ",
  component: AtTable,
};

const Template = (args) => ({
  components: { AtTable },
  setup() {
    return { args };
  },
  template: `
    <div style="{width: '500px'}" class="px-10">
      <AtTable
        v-bind="args"
        />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  cols: [
    {
      label: "Account Name",
      name: "display_id",
      width: 200,
    },
    {
      label: "Name",
      name: "name",
      width: 300,
    },
    {
      label: "Description",
      name: "description",
    },
  ],
  tableData: [
    {
      display_id: "sales",
      name: "Sales",
      description: "Receive all the invoices",
    },
    {
      display_id: "bills",
      name: "Bills",
      description: "Track all the expenses",
    },
  ],
};

export const WithMoney = Template.bind({});
WithMoney.args = {
  cols: [
    {
      label: "Account Name",
      name: "display_id",
      width: 200,
    },
    {
      label: "Name",
      name: "name",
      width: 300,
    },
    {
      label: "Description",
      name: "description",
    },
    {
      label: "Balance",
      name: "balance",
      type: "money",
      currency_prop: "currency",
    },
  ],
  tableData: [
    {
      display_id: "sales",
      name: "Sales",
      description: "Receive all the invoices",
      balance: 80,
      currency: "USD",
    },
    {
      display_id: "bills",
      name: "Bills",
      description: "Track all the expenses",
      balance: 2000,
      currency: "CAD",
    },
    {
      display_id: "bills",
      name: "Bills",
      description: "Track all the expenses",
      balance: 2000,
    },
  ],
};
