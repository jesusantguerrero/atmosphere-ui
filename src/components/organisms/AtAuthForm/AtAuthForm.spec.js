/**
 * @jest-environment jsdom
 */
import { click } from "@testing-library/user-event/dist/click";
import { type } from "@testing-library/user-event/dist/type";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { reactive, nextTick } from "vue";
import AuthForm from "./AtAuthForm.vue";

describe("AuthForm component", () => {
    it("Should render the component", () => {
        const { emitted } = render(AuthForm, {
            props: {},
        });

        screen.getByText("Atmosphere");
        type(screen.getByTestId("input-email"), "jesus@gmail.com");
        type(screen.getByTestId("input-password"), "1234");
        click(screen.getByTestId("btn-submit"));

        expect(emitted()["submit"][0][0]).toEqual({
            email: "jesus@gmail.com",
            password: "1234",
        });
    });

    it("Should render the component register", async () => {
        const { emitted } = render(AuthForm, {
            props: {
                mode: "register",
            },
        });

        screen.getByText("Atmosphere");
        type(screen.getByTestId("input-email"), "jesus@gmail.com");
        type(screen.getByTestId("input-password"), "1234");
        type(screen.getByTestId("input-confirm-password"), "1234");

        click(screen.getByTestId("btn-submit"));
        expect(emitted()).toHaveProperty("submit");
        expect(emitted()["submit"][0][0]).toEqual({
            email: "jesus@gmail.com",
            password: "1234",
            confirmPassword: "1234",
        });
    });

    it("Should render the component register", async () => {
        const initialValues = reactive({
            email: "jonhdoe@example.com",
        });

        const component = render(AuthForm, {
            props: {
                mode: "register",
                initialValues,
            },
        });

        component.findByText("johndoe@example.com");
        initialValues.email = "john@doe.com";
        component.findByText("john@doe.com");
    });
});
