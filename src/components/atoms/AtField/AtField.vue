<template>
  <div class="form-group">
    <header class="flex justify-between">
      <label :for="field" class="mb-0.5 inline-block">
        {{ label }}
      </label>
      <slot name="action" />
    </header>
    <slot></slot>
    <slot name="error"></slot>
  </div>
</template>

<script>
export default {
  props: ["label", "field"],
};
</script>
