import { ref, Ref, watch, reactive } from 'vue';
/**
 * Transform a payload 
 * @param payload 
 * @param formData 
 * @returns Ref<FormData>
 */

type CustomRecord = Record<string, any>;
interface IFormDataState {
    formData: Ref<FormData>;
    form: Ref<CustomRecord>;
    setValue: (key: string, value: any) => void;
}

export function useFormData(payload: CustomRecord): IFormDataState {
    const form = ref(payload);
    const formData = ref<FormData>(new FormData());
    
    const fillFormData = () => {
        formData.value = toFormData(form.value);
    };

    watch(()=> form.value,() => {
        fillFormData();
    }, { deep: true, immediate: true });

    const setValue = (key: string, value: any) => {
        form.value[key] = value;
        fillFormData();
    }
    
    return {
        formData,
        form,
        setValue
    }
}

export const toFormData = (payload: CustomRecord) => {
    const form = new FormData();
    return Object.entries(payload).reduce((formData, [field, value]) => {
     if (typeof value === 'string') {
        formData.append(field, value);
        return formData;
    } else if (Array.isArray(value)) {
        value.forEach((arrayValue, index) => {
        formData.append(`${field}[${index}]`, arrayValue);
        });
        return formData;
    } else {
        return formData;
    }
}, form)};