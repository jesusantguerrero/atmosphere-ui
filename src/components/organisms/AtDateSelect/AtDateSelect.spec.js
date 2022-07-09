import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import AtDateSelect from "./AtDateSelect.vue";
import { expect, it } from "vitest";

const renderComponent = (props) => {
  const date = new Date();
  const defaultProps = {
    modelValue: date,
  };

  return render(AtDateSelect, {
    props: props || defaultProps,
  });
};
it("opens the date picker", async () => {
  const date = new Date();
  renderComponent({ date: date });
  fireEvent.click(screen.getByRole("date-picker-trigger"));
  screen.queryByRole("date-picker");
});
