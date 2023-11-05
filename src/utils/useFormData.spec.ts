import { nextTick } from "vue";
import { useFormData } from "./useFormData";

describe('useFormData', () => {

    it('Transform into FormData attributes', () => {
        const initialForm = {
            title: 'hello',
            msg: 'Name',
            name: ''
        }

        const { formData, form, setValue } = useFormData(initialForm);
        expect(formData.value.get('title')).toBe('hello')
        form.value.title = 'world';
        setValue('title', 'world');
        expect(formData.value.get('title')).toBe('world')
    })

})