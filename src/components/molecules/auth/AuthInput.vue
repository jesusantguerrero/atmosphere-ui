<template>
   <input
        id="test-password"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        class="form-control input text-gray-400 px-4"
        :class="{ 'border-red-400 border-2': false }"
    />
</template>

<script>
    export default {
        props: ['modelValue'],

        emits: ['update:modelValue'],

        methods: {
            focus() {
                this.$refs.input.focus()
            }
        }
    }
</script>

