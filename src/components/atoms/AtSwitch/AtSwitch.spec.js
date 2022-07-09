import AtSwitch from "./AtSwitch.vue";
import { fireEvent, render, screen } from "@testing-library/vue";
import { ref } from "vue";

const renderSwitch = (localProps) => {
  const state = ref(false);
  return render(AtSwitch, {
    props: localProps || {
      modelValue: state,
    },
  });
};
it("should toggle switch", async () => {
  renderSwitch();
  const switcher = screen.getByRole("switch");
  await fireEvent.click(switcher);
  screen.getByRole("switch", { ariaChecked: true });
  await fireEvent.click(switcher);
  screen.getByRole("switch", { ariaChecked: false });
});

it("should emits updateValue", async () => {
  const state = ref(false);
  const { emitted } = renderSwitch({ modelValue: state.value });

  const switcher = screen.getByRole("switch");
  await fireEvent.click(switcher);
  expect(emitted()).toHaveProperty("update:modelValue");
  expect(emitted()["update:modelValue"][0][0]).toBe(true);
});
