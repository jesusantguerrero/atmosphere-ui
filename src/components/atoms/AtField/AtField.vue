<template>
    <div class="form-group">
        <label :for="field" class="mb-0.5 inline-block">{{ label }}</label>
        <slot></slot>
        <slot name="error"></slot>
    </div>
</template>

<script>
    export default {
        props: ['label', 'field']
    }
</script>

