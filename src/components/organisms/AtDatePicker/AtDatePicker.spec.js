import { fireEvent, render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import AtDatePicker from "./AtDatePicker.vue";
import {expect, it, describe } from "vitest";

const renderComponent = (props) => {
  const date = new Date();
  const defaultProps = {
    modelValue: date,
  };

  return render(AtDatePicker, {
    props: props || defaultProps,
  });
};
it("renders shortcuts", async () => {
  renderComponent({
    modelValue: new Date(),
    shortcuts: [
      {
        text: "Today",
        value: new Date(),
      },
    ],
  });

  screen.getByText("Today");
});
it("displays end date", async () => {
  renderComponent({
    date: new Date(),
    acceptEndDate: true,
  });
  expect(screen.queryByRole("enddate")).toBeTruthy();
});

it("works with ranges", async () => {
  const { emitted } = renderComponent({
    date: new Date(),
    acceptEndDate: true,
  });

  expect(screen.queryByRole("enddate")).toBeTruthy();

  await fireEvent.click(screen.getByRole("button-previous"));
  await fireEvent.click(screen.getByText("05"));
  expect(emitted()).toHaveProperty("update:enddate");
  await fireEvent.click(screen.getByRole("button-next"));
  await fireEvent.click(screen.getByRole("button-next"));
  await fireEvent.click(screen.getByText("05"));
  expect(emitted()).toHaveProperty("update:enddate");
  await fireEvent.click(screen.getByText("06"));
  expect(emitted()).toHaveProperty("update:enddate");
});
