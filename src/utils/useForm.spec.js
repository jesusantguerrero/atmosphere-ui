import { useForm } from "./useForm";

describe('Test use form', () => {
    const form = useForm({
        msg: 'hola',
        date: new Date(),
        fields: ["one", "two", "three"]
    });
    it('formats the date computed', () => {
        expect(form.msg).toBe('hola')
        expect(form.fields.length).toBe(3)
        form.fields.push('four');
        expect(form.fields.length).toBe(4)
    })
})