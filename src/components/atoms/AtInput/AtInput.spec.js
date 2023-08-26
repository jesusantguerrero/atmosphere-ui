import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
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
    const wrapper = mount(AtInput, {
      props: {
        placeholder: "Type something...",
        modelValue: "22,000",
        numberFormat: true,
        dataTestid: "input",
        "onUpdate:modelValue": (e) => {
          wrapper.setProps({
            modelValue: e,
          });
        },
      },
    });

    expect(wrapper.find("input").element.value).toBe("22,000.00");
  });

  it("renders pasted value correctly", async () => {
    const wrapper = mount(AtInput, {
      props: {
        placeholder: "Type something...",
        modelValue: 0,
        numberFormat: true,
        dataTestid: "input",
        "onUpdate:modelValue": (e) => {
          wrapper.setProps({
            modelValue: e,
          });
        },
      },
    });

    await wrapper.find("input").setValue("22000");
    expect(wrapper.props("modelValue")).toBe("22000");
    expect(wrapper.find("input").element.value).toBe("22,000.00");
  });
});
