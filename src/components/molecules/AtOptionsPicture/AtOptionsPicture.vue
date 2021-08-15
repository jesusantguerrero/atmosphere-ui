<template>
<div class="options-container">
    <div class="flex flex-wrap list-container">
        <at-options-picture-item
            v-for="(item, index) in options"
            :key="item.id"
            :index="index"
            :item="item"
            :selected="item.label == modelValue"
            @click="$emit('update:modelValue', item.label)"
            :class="{'border-blue-500 border-4 text-blue-500 bg-blue-50': item.label == modelValue}"
            class="mb-3 mr-3 overflow-hidden font-bold text-gray-600 transition-all border rounded-md shadow-md cursor-pointer hover:border-blue-500 hover:text-blue-500"
        />
    </div>
</div>
</template>

<script setup>
import AtOptionsPictureItem from "../AtOptionsPictureItem/AtOptionsPictureItem.vue";

defineProps({
    options: Array,
    modelValue: String
})

defineEmits({
    'updated': Array,
    'update:modelValue': String
})
</script>


