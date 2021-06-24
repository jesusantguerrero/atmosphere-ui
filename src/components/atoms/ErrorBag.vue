<template>
  <div v-if="errors[field]" class="text-sm font-bold text-red-400">{{ errors[field] }}</div>
</template>

<script>
export default {
    props: {
        field: String,
        errors: Object
    }
}
</script>
