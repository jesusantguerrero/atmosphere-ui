import { computed, ComputedRef, reactive, watch } from "vue";
import { cloneDeep, isEqual } from "lodash-es";

interface IValidator {
    (value: string): string | boolean
}

type ValidationSchema = Record<string, IValidator[]>;

type IFormState = {
    [key: string]: any;
    isDirty: boolean;
    hasErrors: boolean;
    data: () => Record<string, any>;
    transform: (data: Record<string, any>) => IFormState;
    validationSchema: (schema: ValidationSchema) => IFormState;
    reset: () => IFormState;
    submit: () => void;
    validate: (schema?: ValidationSchema) => Boolean;
}

type IFormConfig = {
   emit?: (event: string, data: any) => void;
   axiosInstance?: any; 
}
export const useForm = (props: any[], config?: IFormConfig = {} ) => {
    const data = (typeof props[0] === "string" ? props[1] : props[0]) || {};
    const defaults = cloneDeep(data);
    let transform = (data: Record<string, any>) => data;
    let validationSchema: ValidationSchema = {};

    const form: IFormState = reactive<IFormState>({
        ...data,
        isDirty: false,
        errors: {},
        hasErrors: computed(() => Object.keys(form.errors).length > 0),
        data() {
            return Object
              .keys(data)
              .reduce((carry: Record<string, any>, key) => {
                carry[key] = this[key]
                return carry
              }, {})
        },
        transform(callback: (data: any) => any) {
          transform = callback
          return this
        },
        validationSchema(schema: ValidationSchema) {
          validationSchema = schema
          return this
        },
        reset(...fields: any[]) {
          let clonedDefaults = cloneDeep(defaults)
          if (fields.length === 0) {
            Object.assign(this, clonedDefaults)
          } else {
            Object.assign(
              this,
              Object
                .keys(clonedDefaults)
                .filter(key => fields.includes(key))
                .reduce((carry: Record<string, any>, key) => {
                  carry[key] = clonedDefaults[key]
                  return carry
                }, {}),
            )
          }
    
          return this
        },
        submitEvent: (event: string) => {
          if (config.emit) {
            config.emit(event, transform(form.data()))
          }
        },
        submitForm(method: string|Function, options: Record<string, any>) {
          options = options || {}
    
          if (typeof method === "function") {
            method('submit', transform(form.data()))
          } else {
            options.url = method
          }
          
          options.onSuccess && options.onSuccess();
        },

        submit(name: string, options: Record<string, any>) {
          if (config.emit) {
            form.submitEvent(name)
          } else if (config.axiosInstance) {
            form.submitForm(name, options)
          }
        },
        validate(schema: ValidationSchema = validationSchema) {
          form.errors = {}
          const fields = Object.keys(schema)
          if (fields.length) {
            fields.forEach(field => {
              if (validationSchema[field] && validationSchema[field].length) {
                const result = validationSchema[field].map(validator => validator(form.data()[field])).filter(result => result !== true)
                if (result.length) {
                  form.errors[field] = result[0];
                }
              }
            })
          }
          return !form.hasErrors;
        }
    })

    watch(() => form, () => {
        form.isDirty = !isEqual(form.data(), defaults);
        if (form.hasErrors) {
          form.validate();
        }
    }, { immediate: true, deep: true })

    return form;
}

export const validators = {
  isRequired(value: string)  {
    return value ? true : 'URL is required' 
  },
  isUrl (value: string)  {
    return ('https://' + value).match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/) ? true : 'Invalid URL'
  },
}
