import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import AtInput from "./AtInput.vue";
import { ref } from "vue";

describe("AtInput", async () => {
  it("renders properly", async () => {
    render(AtInput, {
      props: { placeholder: "Type something..." },
    });

    const searchInput = screen.getByPlaceholderText("Type something...");
    expect(searchInput).toBeTruthy();
  });

  it("handle input", async () => {
    const modelValue = ref();
    render(AtInput, {
      props: {
        placeholder: "Type something...",
        modelValue,
      },
    });
    const searchInput = screen.getByPlaceholderText("Type something...");

    expect(searchInput).toBeTruthy();
  });

  it("renders initial value correctly", async () => {
    const modelValue = ref("22000");
    const { container } = render(
      {
        template: '<AtInput v-model="modelValue" :placeholder="placeholder" />',
        components: {
          AtInput,
        },
      },
      {
        setup: () => ({
          placeholder: "Type something...",
          numberFormat: true,
          modelValue,
        }),
      }
    );

    const numberInput = screen.getByPlaceholderText("Type something...");
    await fireEvent.focus(numberInput);
    await fireEvent.blur(numberInput);

    expect(modelValue.value).toBe("22,000.00");
  });

  it("renders pasted value correctly", async () => {
    const modelValue = ref("0");
    const { emitted } = render(AtInput, {
      props: {
        placeholder: "Type something...",
        modelValue: modelValue.value,
        numberFormat: true,
      },
    });
    const numberInput = screen.getByPlaceholderText("Type something...");
    await fireEvent.paste(numberInput, "22,000");
    await fireEvent.blur(numberInput);
    expect(numberInput.value).toBe("22,000.00");
  });
});
