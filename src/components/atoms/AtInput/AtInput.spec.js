import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
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
});
