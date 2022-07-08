import { useForm, validators } from "./useForm";

describe('Test use form', () => {
    const emit =  jest.fn((event, data) => {
        return { event, data };
    });
    let form;
    const defaultFormValues = {
        msg: 'hello',
        date: new Date(),
        fields: ["one", "two", "three"]
    }
    beforeEach(() => {
        form = useForm(defaultFormValues, { emit });
    })

    
    it('formats the date computed', () => {
        expect(form.msg).toBe('hello')
        expect(form.fields.length).toBe(3)
        form.fields.push('four');
        expect(form.fields.length).toBe(4)
    })

    it('submit the data', () => {
        form.submit('submit');
        expect(emit).toBeCalled()
    })

    it('transform the data before submitting', () => {
        form.transform((data) => ({
            ...data,
            msg: data.msg.toUpperCase()
        })).submit('submit');
        expect(emit).toHaveBeenLastCalledWith('submit', expect.objectContaining({
            msg: 'HELLO',
        }))
    })

    it('resets the data after submit', () => {
        const newDate = new Date(2020, 1, 1);
        form.msg = "Hello world"
        form.date = newDate;
        expect(form.msg).toBe("Hello world");
        form.reset('msg');
        expect(form.msg).toBe('hello');
        expect(form.date).toBe(newDate);
        form.reset();
        expect(form.date).toEqual(defaultFormValues.date);
    })

    it('submit with axios', () => {
        const axiosMock = {
            post: jest.fn()
        };
        const form = useForm({
            text: 'hello world',
        }, { axiosInstance: axiosMock });
        form.submit('post', { url: '/api/message' });
        expect(axiosMock.post).toHaveBeenLastCalledWith(expect.objectContaining({
            data: {
                text: 'hello world',
            }
        }))
    })

    it('validate before submit', () => {
        const validatedForm = useForm({ 
            msg: ''
        })
        validatedForm.validationSchema({
            msg: [validators.isRequired]
        })

        expect(validatedForm.validate()).toBe(false);
        validatedForm.msg = "Hello world";
        expect(validatedForm.validate()).toBe(true);
    })

    it('transform object into a formData object', () => {
        const form = useForm({
            title: 'hello world',
        });
        expect(form.formData().get('title')).toBe('hello world');
    })
})