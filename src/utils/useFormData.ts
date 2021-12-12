export function useFormData(payload: Record<string,any>, formData?:FormData ): FormData {
    formData = formData || new FormData();
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
    }, formData);
}

export function useForm() {
    
}