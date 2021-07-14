import { fireEvent, render, screen } from "@testing-library/vue";import { ref } from "vue";
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
    const acceptEndDate = ref(false);
    const { rerender } = renderComponent({
       date: new Date(),
       acceptEndDate
   });

    expect(screen.queryByRole('enddate')).toBeFalsy();
    acceptEndDate.value = true;
    await rerender({ acceptEndDate });
    await fireEvent.click(screen.getByText('Include end'))
    expect(screen.queryByRole('enddate')).toBeTruthy();
})

it('works with ranges', async () => {
    const acceptEndDate = ref(true);
    const { emitted } = renderComponent({
        date: new Date(),
        acceptEndDate
    });

    await fireEvent.click(screen.getByText('Include end'))
    expect(screen.queryByRole('enddate')).toBeTruthy();

    await fireEvent.click(screen.getByRole('button-previous'));
    await fireEvent.click(screen.getByText('05'));
    expect(emitted()).toHaveProperty('update:date');
    await fireEvent.click(screen.getByRole('button-next'));
    await fireEvent.click(screen.getByRole('button-next'));
    await fireEvent.click(screen.getByText('05'));
    expect(emitted()).toHaveProperty('update:endDate');
    await fireEvent.click(screen.getByText('06'));
    console.log(emitted()).toHaveProperty('update:endDate');
})
