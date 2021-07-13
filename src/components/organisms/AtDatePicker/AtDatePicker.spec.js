import { render, screen } from "@testing-library/vue";import { ref } from "vue";
;
import AtDatePicker from "./AtDatePicker.vue";

const renderComponent = (props) => {
    const date = new Date();
    const defaultProps = {
        modelValue: date
    }

    return render(AtDatePicker, {
        props: props || defaultProps
    })
}
it('renders shortcuts', async () => {
   renderComponent({
       modelValue: new Date(),
       shortcuts: [{
            text: 'Today',
            value: new Date(),
        }]
   });

   screen.getByText('Today');
})
it('displays end date', async () => {
    const includesEndDate = ref(false);
    const { rerender } = renderComponent({
       modelValue: new Date(),
       includesEndDate
   });

   expect(screen.queryByRole('enddate')).toBeFalsy();
   includesEndDate.value = true;
   await rerender({ includesEndDate});
    expect(screen.getByRole('enddate')).toBeTruthy();
})

