/**
 * @jest-environment jsdom
 */
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import { reactive } from "vue";
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

    await fireEvent.update(
      screen.getByTestId("input-email"),
      "jesus@gmail.com"
    );
    await fireEvent.update(screen.getByTestId("input-password"), "1234");
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

    await fireEvent.update(
      screen.getByTestId("input-email"),
      "jesus@gmail.com"
    );
    await fireEvent.update(screen.getByTestId("input-password"), "1234");
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
    await fireEvent.update(
      screen.getByTestId("input-email"),
      "jesus@gmail.com"
    );
    await fireEvent.update(
      screen.getByTestId("input-confirm-password"),
      "1234"
    );
    await fireEvent.update(screen.getByTestId("input-password"), "1234");

    await fireEvent.click(screen.getByTestId("btn-submit"));
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
