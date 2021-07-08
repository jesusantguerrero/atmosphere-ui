import userEvent from "@testing-library/user-event";
import { render, screen, waitFor} from "@testing-library/vue";
import { addMonths, format } from "date-fns";
import AtCalendar from "./AtCalendar.vue";

const renderComponent = (props) => {
    const date = new Date();
    const defaultProps = {
        modelValue: date
    }

    return render(AtCalendar, {
        props: props || defaultProps
    })
}
it('should highlight the selected date', async () => {
    const date = new Date()
    renderComponent({ selected: date});
    const selected = await screen.findByRole('selected-day');
    expect(selected.textContent).toBe(format(date, 'dd'));
})

it("It moves back and forward month", async () => {
    const date = new Date()
    const monthFormat = "MMMM, yyyy";
    renderComponent({ selected: date});
    
    const btnPrevious = screen.getByRole("button-previous");
    const btnNext = screen.getByRole("button-next");
    const monthLabel = screen.getByRole('monthlabel')
    
    userEvent.click(btnNext);
    waitFor(() => {
        expect(monthLabel.textContent).toBe(format(addMonths(date, 1), monthFormat));
    })
    userEvent.click(btnNext);
    waitFor(() => {
        expect(monthLabel.textContent).toBe(format(addMonths(date, 2), monthFormat));
    })
    userEvent.click(btnPrevious);
    waitFor(() => {
        expect(monthLabel.textContent).toBe(format(addMonths(date, 1), monthFormat));
    })
    
  });
