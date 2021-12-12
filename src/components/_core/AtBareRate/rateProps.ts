export default {
    modelValue: {
        type: Number,
        required: true
    },
    allowClear: {
        type: Boolean,
        default: false
    },
    allowHalf: {
        type: Boolean,
        default: false
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 5
    },
    tooltips: {
        type: Array,
        default: () => []
    }
}
