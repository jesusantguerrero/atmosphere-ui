import { createApp } from "vue";
import { useForm, validators } from "./useForm";
import { expect, describe, it, beforeEach, vi } from "vitest";
import axios from "axios";

export function withSetup(hook) {
  let result;

  const app = createApp({
      setup() {
          result = hook();
          return () => {};
      },
  });

  app.mount(document.createElement("div"));

  return [result, app];
}

describe("Test use form", () => {
    const emit = vi.fn((event, data) => {
        return { event, data };
    });
    let form;
    const defaultFormValues = {
        msg: "hello",
        date: new Date(),
        fields: ["one", "two", "three"],
    };
    beforeEach(() => {
        form = useForm(defaultFormValues, { emit });
    });

    it("formats the date computed", () => {
        expect(form.msg).toBe("hello");
        expect(form.fields.length).toBe(3);
        form.fields.push("four");
        expect(form.fields.length).toBe(4);
    });

    it("submit the data", () => {
        form.submit("submit");
        expect(emit).toBeCalled();
    });

    it("transform the data before submitting", () => {
        form.transform((data) => ({
            ...data,
            msg: data.msg.toUpperCase(),
        })).submit("submit");
        expect(emit).toHaveBeenLastCalledWith(
            "submit",
            expect.objectContaining({
                msg: "HELLO",
            })
        );
    });

    it("resets the data after submit", () => {
        const newDate = new Date(2020, 1, 1);
        form.msg = "Hello world";
        form.date = newDate;
        expect(form.msg).toBe("Hello world");
        form.reset("msg");
        expect(form.msg).toBe("hello");
        expect(form.date).toBe(newDate);
        form.reset();
        expect(form.date).toEqual(defaultFormValues.date);
    });

    it("submit with axios", () => {
        const axiosMock = {
            post: async () => {},
        };
        const [form] = withSetup(useForm.bind(null,
            {
                text: "hello world",
            },
            { axiosInstance: axiosMock }
        ));
        const postSpy = vi.spyOn(axiosMock, "post")
        form.submit("post", { url: "/api/message" });
        expect(postSpy.mock.calls.length).toBe(1);
    });

    it("validate before submit", () => {
        const validatedForm = useForm({
            msg: "",
        });
        validatedForm.validationSchema({
            msg: [validators.isRequired],
        });

        expect(validatedForm.validate()).toBe(false);
        validatedForm.msg = "Hello world";
        expect(validatedForm.validate()).toBe(true);
    });

    it("transform object into a formData object", () => {
        const form = useForm({
            title: "hello world",
        });
        // @ts-expect-error
        expect(form.formData().get("title")).toBe("hello world");
    });
});
