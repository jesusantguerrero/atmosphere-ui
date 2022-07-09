import AtFieldCheck from "./AtFieldCheck.vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { ref } from "vue";

const renderComponent = (localProps) => {
  const state = ref(false);
  return render(AtFieldCheck, {
    props: localProps || {
      modelValue: state,
      label: "Test",
    },
  });
};

it("should emits updateValue on click", async () => {
  const state = ref(true);
  const { emitted } = renderComponent({ modelValue: state, label: "test" });

  const checkField = screen.getByRole("checkbox", { ariaChecked: true });
  await fireEvent.click(checkField);
  expect(emitted()).toHaveProperty("update:modelValue");
  expect(emitted()["update:modelValue"][0][0]).toBe(false);
});
