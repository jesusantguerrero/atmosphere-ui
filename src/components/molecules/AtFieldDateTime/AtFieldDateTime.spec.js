import { render, screen } from "@testing-library/vue";
import { format } from "date-fns";
import { validateStringDate } from "../../../utils/validators/dateValidator";
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