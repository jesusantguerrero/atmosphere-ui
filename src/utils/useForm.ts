/* eslint-disable prettier/prettier */
import { computed, reactive, watch } from "vue";
import { cloneDeep, isEqual } from "lodash";
import { toFormData } from "./useFormData";

interface IValidator {
    (value: string): string | boolean;
}

type ValidationSchema = Record<string, IValidator[]>;

type IFormState = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key: string]: string | number | Date | boolean | Function | Record<string,any>;
    isDirty: boolean;
    hasErrors: boolean;
    data: () => Record<string, any>;
    transform: (callback: (data: Record<string, any>) => any) => IFormState;
    validationSchema: (schema: ValidationSchema) => IFormState;
    reset: () => IFormState;
    submit: (name: string, options: Record<string, any>) => void;
    validate: (schema?: ValidationSchema) => boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    submitForm: (method: string | Function, options: Record<string, any>) => void
    submitEvent: (event: string) => void
};

type IFormConfig = {
    emit?: (event: string, data: any) => void;
    axiosInstance?: any;
};
export const useForm = (
    props: Record<string, any>,
    config: IFormConfig = {}
) => {
    const data = props || {};
    const defaults = cloneDeep(data);
    let transform = (data: Record<string, any>) => data;
    let validationSchema: ValidationSchema = {};

    const form: IFormState = reactive({
        ...data,
        isDirty: false,
        errors: {},
        /* @ts-expect-error: computed problems */
        hasErrors: computed(() => Object.keys(form.errors).length > 0),
        data() {
            return Object.keys(data).reduce(
                (carry: Record<string, any>, key) => {
                    carry[key] = form[key];
                    return carry;
                },
                {}
            );
        },
        transform(callback: (data: any) => any) {
            transform = callback;
            return form;
        },
        validationSchema(schema: ValidationSchema) {
            validationSchema = schema;
            return form;
        },
        reset(...fields: any[]) {
            const clonedDefaults = cloneDeep(defaults);
            if (fields.length === 0) {
                Object.assign(this, clonedDefaults);
            } else {
                Object.assign(
                    this,
                    Object.keys(clonedDefaults)
                        .filter((key) => fields.includes(key))
                        .reduce((carry: Record<string, any>, key) => {
                            carry[key] = clonedDefaults[key];
                            return carry;
                        }, {})
                );
            }

            return this;
        },
        submitEvent: (event: string) => {
            if (config.emit) {
                config.emit(event, transform(form.data()));
            }
        },
        // eslint-disable-next-line prettier/prettier, @typescript-eslint/ban-types
        submitForm(method: string | Function, options: Record<string, any>): void {
            options = options || {};

            if (typeof method === "function") {
                method("submit", transform(form.data()));
            } else {
                config.axiosInstance[method]({
                    ...options,
                    data: transform(form.data()),
                });
            }

            options.onSuccess && options.onSuccess();
        },

        submit(name: string, options: Record<string, any>) {
            if (config.emit) {
                form.submitEvent(name);
            } else if (config.axiosInstance) {
                form.submitForm(name, options);
            }
        },
        formData() {
            return toFormData(form.data());
        },
        validate(schema: ValidationSchema = validationSchema) {
            form.errors = {};
            const fields = Object.keys(schema);
            if (fields.length) {
                fields.forEach((field) => {
                    if (
                        validationSchema[field] &&
                        validationSchema[field].length
                    ) {
                        const result = validationSchema[field]
                            .map((validator) => validator(form.data()[field]))
                            .filter((result) => result !== true);
                        if (result.length) {
                            form.errors[field] = result[0];
                        }
                    }
                });
            }
            return !form.hasErrors;
        },
    });

    watch(
        () => form,
        () => {
            form.isDirty = !isEqual(form.data(), defaults);
            if (form.hasErrors) {
                form.validate();
            }
        },
        { immediate: true, deep: true }
    );

    return form;
};

export const validators = {
    isRequired(value: string) {
        return value ? true : "URL is required";
    },
    isUrl(value: string) {
        return ("https://" + value).match(
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
        )
            ? true
            : "Invalid URL";
    },
};
