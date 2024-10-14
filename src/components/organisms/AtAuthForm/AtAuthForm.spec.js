/**
 * @jest-environment jsdom
 */
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { reactive, ref } from "vue";
import AuthForm from "./AtAuthForm.vue";

describe("AuthForm component", () => {
  it("Should render the component", () => {
    const { emitted } = render(AuthForm, {
      props: {},
    });

    screen.getByText("Atmosphere");
  });
  it("Should emit when submitted", async () => {
    const { emitted, getByTestId } = render(AuthForm, {
      props: {
        mode: "login",
      },
    });

    await userEvent.type(
      screen.getByTestId("input-email"),
      "jesus@gmail.com"
    );
    await userEvent.type(screen.getByTestId("input-password"), "1234");
    await fireEvent.click(getByTestId("btn-submit"));

    expect(emitted()).toHaveProperty("submit");

    expect(emitted()["submit"][0][0]).toEqual({
      email: "jesus@gmail.com",
      password: "1234",
      confirmPassword: "",
    });
  });

  it("Should emit on password enter", async () => {
    const { emitted, getByTestId } = render(AuthForm, {
      props: {
        mode: "login",
      },
    });

    await userEvent.type(
      screen.getByTestId("input-email"),
      "jesus@gmail.com"
    );
    await userEvent.type(screen.getByTestId("input-password"), "1234");
    await fireEvent.keyDown(screen.getByTestId("input-password"), {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    });

    expect(emitted()).toHaveProperty("submit");

    expect(emitted()["submit"][0][0]).toEqual({
      email: "jesus@gmail.com",
      password: "1234",
      confirmPassword: "",
    });
  });

  it("Should render the component register", async () => {
    const { emitted } = render(AuthForm, {
      props: {
        mode: "register",
      },
    });

    screen.getByText("Atmosphere");
    await userEvent.type(
      screen.getByTestId("input-email"),
      "jesus@gmail.com"
    );
    await userEvent.type(
      screen.getByTestId("input-confirm-password"),
      "1234"
    );
    await userEvent.type(screen.getByTestId("input-password"), "1234");

    await fireEvent.click(screen.getByTestId("btn-submit"));
    expect(emitted()).toHaveProperty("submit");
    expect(emitted()["submit"][0][0]).toEqual({
      email: "jesus@gmail.com",
      password: "1234",
      confirmPassword: "1234",
    });
  });

  it("Should change email on initial value change", async () => {
    const initialValues = ref({
      email: "",
    });

    const email = "jonhdoe@example.com";

    const component = render(AuthForm, {
      props: {
        mode: "register",
        initialValues: initialValues,
        config: {
          email: {
            disabled: true
          }
        }
      },
    });

    initialValues.value.email = email;
    const inputEmail = await component.findByTestId("input-email");
    expect(inputEmail.value).toBe(email);
  });
  it("Should disable email on config set", async () => {
    const initialValues = reactive({
      email: "",
    });

    const email = "jonhdoe@example.com";
    const newEmail = "dan@example.com"

    const component = render(AuthForm, {
      props: {
        mode: "register",
        initialValues: initialValues,
        config: {
          email: {
            disabled: true
          }
        }
      },
    });

    initialValues.email = email;
    const inputEmail = await component.findByTestId("input-email");
    await userEvent.type(inputEmail, newEmail)
    expect(inputEmail.value).toBe(email);
  });

  it("Should disable email after initialization in register", async () => {
    const initialValues = reactive({
      email: "",
    });

    const component = render(AuthForm, {
      props: {
        mode: "register",
      },
    });

    initialValues.email = "jonhdoe@example.com"

    component.findByText("johndoe@example.com");
    initialValues.email = "john@doe.com";
    component.findByText("john@doe.com");
  });
});
