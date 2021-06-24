<template>
<div
    class="form-group text-left"
>
    <label for="email" class="inline-block mb-2">{{ label }}</label>
    <p :class="{ control: true }">
        <slot> </slot>
    </p>
</div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>
