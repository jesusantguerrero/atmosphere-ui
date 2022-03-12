<template>
    <div 
        ref="inputWrapper" 
        class="flex w-full h-10 overflow-hidden shadow-sm focus:ring focus:ring-opacity-50"
        :class="inputClasses"
        @click="focus"
    >
        <slot name="prefix" v-if="prefix || $slots.prefix">
            <div class="flex items-center justify-center w-4 h-full px-2">{{ prefix }}</div>
        </slot>
        <input 
            ref="inputRef" 
            :value="formattedValue"
            :disabled="disabled"
            class="w-full h-full px-2 focus:outline-none" 
            v-bind="$attrs"
            @focus="onFocus"
            @blur="onBlur"
            @input="onInput" 
        />
        <slot name="suffix" v-if="suffix || $slots.suffix">
            <div class="flex items-center justify-center w-4 h-full px-2">{{ suffix }}</div>
        </slot>
    </div>
</template>

<script setup>
    import { computed, reactive, ref, watch } from 'vue';
    const props = defineProps({
        modelValue: String,
        disabled: Boolean,
        prefix: String,
        suffix: String,
        isBorderless: Boolean,
        rounded: Boolean,
        theme: {
            type: String,
            default: 'default'
        },
        formatter: Function,
        parser: Function,
        numberFormat: {
            type: Boolean,
            default: false
        },
        decimalDigits: {
            type: Number,
            default: 2
        },
        numberFormatter: Function,
    });

    const themes = {
        primary: '',
        secondary: '',
        success: '',
        danger: '',
        warning: '',
        info: '',
        default: {
            normal: 'text-gray-700', 
            focus: 'border-indigo-300 ring-indigo-200'
        }
    }

    const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur']);

    const state = reactive({
        isFocused: false,
    });

    const inputRef = ref();
    const focus = () => {
        inputRef.value.focus()
    }

    const blur = () => {
        inputRef.value.blur()
    }

    watch(() => props.modelValue, (value) => {
        if (value !== inputRef.value.value) {
            inputRef.value.value = value;
        }
    })

    const onInput = (evt) => {
        emit('update:modelValue', evt.target.value)
        emit('change', inputRef.value.value)
    }

    const onFocus = () => {
        state.isFocused = true;
        emit('focus');
    }

    const onBlur = () => {
        state.isFocused = false;
        emit('blur');
    }

    defineExpose({
        focus,
        blur,
        inputRef
    });

    const inputClasses = computed(() => {
        const theme = themes[props.theme] || themes.default;
        const disabledClasses = props.disabled ? 'cursor-not-allowed opacity-50' : '';
        const focusClasses = state.isFocused ? `ring-indigo-200 ring-opacity-50 ${theme.focus}` : '';
        const borderClasses = props.isBorderless ? 'border-none' : 'border border-gray-300';
        const formClasses = props.rounded ? 'rounded-md' : '';

        return [disabledClasses, focusClasses, borderClasses, formClasses, theme.normal];
    });

    const formattedValue = computed(() => {
        const value = props.modelValue;
        const formatter = props.formatter;
        const parser = props.parser;
        const numberFormat = props.numberFormat;
        const numberFormatter = props.numberFormatter;

        const defaultFormatter = () => {
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'decimal',
                minimumFractionDigits: props.decimalDigits,
                maximumFractionDigits: props.decimalDigits,
            }).format(value);
            return formatted;
        }

        let formatted = value;
        if (formatter) {
            formatted = formatter(value);
        }

        if (parser) {
            formatted = parser(value);
        }

        if (numberFormat && (numberFormatter || defaultFormatter)) {
            const formatter = numberFormatter || defaultFormatter;
            formatted = formatter(value);
        }

        return state.isFocused ? value : formatted;
    })
</script>

