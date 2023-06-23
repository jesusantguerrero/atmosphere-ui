/**
 * @jest-environment jsdom
 */
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { reactive } from "vue";
import AuthForm from "./AtAuthForm.vue";

describe("AuthForm component", () => {
  it("Should render the component", () => {
    const { emitted } = render(AuthForm, {
      props: {},
    });

    screen.getByText("Atmosphere");
    userEvent.type(screen.getByTestId("input-email"), "jesus@gmail.com");
    userEvent.type(screen.getByTestId("input-password"), "1234");
    userEvent.click(screen.getByTestId("btn-submit"));

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
    userEvent.type(screen.getByTestId("input-email"), "jesus@gmail.com");
    userEvent.type(screen.getByTestId("input-password"), "1234");
    userEvent.type(screen.getByTestId("input-confirm-password"), "1234");

    userEvent.click(screen.getByTestId("btn-submit"));
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
      },
    });

    component.findByText("johndoe@example.com");
    initialValues.email = "john@doe.com";
    component.findByText("john@doe.com");
  });
});
