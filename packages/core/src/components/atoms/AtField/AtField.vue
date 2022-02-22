<template>
    <div class="form-group">
        <label :for="field">{{ label }}</label>
        <slot></slot>
        <slot name="error"></slot>
    </div>
</template>

<script>
    export default {
        props: ['label', 'field']
    }
</script>

