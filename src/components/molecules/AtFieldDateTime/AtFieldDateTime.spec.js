import { render, screen } from "@testing-library/vue";
import { format } from "date-fns";
import AtFieldDateTime from "./AtFieldDateTime.vue";
it('Should render component correctly', () => {
    const date = new Date();
    const { getByText, getByDisplayValue  } = render(AtFieldDateTime, {
        props: {
            modelValue: date
        }
    })

    getByDisplayValue(format(date, 'MMM dd, yyyy'));
})