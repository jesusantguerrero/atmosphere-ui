import { render, screen, waitFor } from "@testing-library/vue";
import { format } from "date-fns";
import { validateStringDate } from "../../../utils/validators/dateValidator";
import userEvent from "@testing-library/user-event"
import AtFieldDateTime from "./AtFieldDateTime.vue";

it('returns false when the string date is not valid', () => {
    expect(validateStringDate('32 may, 2021')).toBe(false)
})

it('returns true when the string date is valid', () => {
    expect(validateStringDate('31 may, 2021')).toBe(true)
})

it('should render the date in a valid string format', () => {
    const date = new Date();
    const { getByDisplayValue  } = render(AtFieldDateTime, {
        props: {
            modelValue: date
        }
    })

    getByDisplayValue(format(date, 'MMM dd, yyyy'));
})

it('should display an error', async () => {
    const date = new Date();
    const { getByDisplayValue, getByRole } = render(AtFieldDateTime, {
        props: {
            modelValue: date
        }
    })

    const dateInput = getByDisplayValue(format(date, 'MMM dd, yyyy'));
    userEvent.type(dateInput, 'Jul 32, 2021');
    userEvent.tab();
    await waitFor(() => {
        getByRole('error');
    })
})