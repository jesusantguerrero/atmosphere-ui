<template>
   <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        class="px-4 text-gray-400 form-control input"
        :class="{ 'border-red-400 border-2': hasError }"
    />
</template>

<script>
    export default {
        props: ['modelValue', 'hasError'],

        emits: ['update:modelValue'],

        methods: {
            focus() {
                this.$refs.input.focus()
            }
        }
    }
</script>

