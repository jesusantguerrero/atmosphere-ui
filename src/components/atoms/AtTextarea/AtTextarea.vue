<template>
<textarea
    ref="descriptionInput"
    v-model="localValue"
    v-bind="$attrs"
    class="w-full overflow-hidden transition-all border-gray-200 rounded-md resize-none focus:outline-none hover:outline-none focus:shadow-none focus:border-gray-200"
    rows="5"
    @input="onInput()">
</textarea>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";

const props = defineProps({
    modelValue: String
});
const emit = defineEmits({
    'update:modelValue': String
})
const localValue = ref('');

watch(() => props.modelValue, (value) => {
    localValue.value = value
}, { immediate: true})


// Heigth
const descriptionInput = ref(null);
const setHeight = () => {
  setTimeout(() => {
    const description = descriptionInput.value || "";
    const hasScroll = description.scrollHeight - description.clientHeight;
    console.log(hasScroll);
    if (!description || !hasScroll) {
      return
    }
    description.style.height = "";
    description.style.height = (description.scrollHeight) + "px"
  })
}


onMounted(() => {
  setHeight()
})

const onInput = () => {
    setHeight()
    emit('update:modelValue', localValue.value)
}

</script>
