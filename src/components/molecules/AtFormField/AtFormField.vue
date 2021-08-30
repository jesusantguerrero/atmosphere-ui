<template>
  <div>
    <!-- Capturer value -->
    <div v-if="disabled">
      <component
        v-model="field.value"
        v-model:options="options"
        v-bind="data"
        :placeholder="field.placeholder"
        :data="field.data"
        :type="field.type"
        :emit-value="disabled"
        :is="componentName"
      />
    </div>
    <!-- /Capturer value -->

    <!-- Value makers -->
    <component
      v-else
      :is="componentName"
      :items="options"
      :allow-edit="true"
      label="Choice"
      class="ml-4"
    />
    <!-- /Value makers -->
  </div>
</template>


<script setup>
    defineProps({
        disabled: {
            type: Boolean,
            default: false
        },
        field: {
            type: Object,
            required: true
        },
        componentName: {
            type: String,
            default: 'input'
        },
        options: {
            type: Array,
            default: function () {
                return []
            }
        },
        data: {
          type: Object,
          default: function () {
            return {}
          }
        }
    })
</script>