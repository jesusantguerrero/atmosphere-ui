<template>
    <div class="flex space-x-5">
        <label :for="noName">
            <input
                value="no"
                @input="$emit('update:modelValue', $event.target.value)"
                :id="noName"
                ref="input"
                type="radio"
                name="yesno"
            >
            No
        </label>
        <label :for="yesName">
            <input
                value="yes"
                :id="yesName"
                @input="$emit('update:modelValue', $event.target.value)"
                ref="input"
                type="radio"
                name="yesno"
            >
            Yes
        </label>
    </div>
</template>

<script>
    import { reactive, toRefs } from 'vue'
    import { v4 as uuid } from 'uuid'

    export default {
        props: ['modelValue'],
        emits: ['update:modelValue'],
        setup() {
            const state = reactive({
                yesName: uuid(),
                noName: uuid()
            })

            return {
                ...toRefs(state)
            }
        }
    }
</script>

