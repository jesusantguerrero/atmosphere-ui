<template>
<div class="options-container">
    <div class="list-container">
        <div
            v-for="(check, index) in items"
            :key="check.id"
        >
            <label for="" v-if="label" class="text-sm"> {{ label }} #{{ index + 1}}</label>
            <div
                class="flex items-center justify-between px-2 bg-white border border-gray-200 rounded-md"
            >
                <div class="flex items-center w-full">
                    <i class="mr-2 opacity-0 fa fa-arrows-alt checklist-item__move handle"  v-if="allowMove"></i>
                    <input
                        type="checkbox"
                        class="mx-2 form-control-check checkbox-done"
                        v-model="check.done"
                        v-if="showChecks"
                        @change.stop="trackChanges"
                    />
                    <input
                        class="w-full h-8 border-none focus:outline-none"
                        :disabled="!allowEdit"
                        v-model="check.label"
                    />
                </div>

                <button class="w-5">
                    <i
                        class="text-gray-400 opacity-0 cursor-pointer fa fa-trash checklist-item__delete hover:text-red-300"
                        @click="deleteItem(index)"
                    ></i>
                </button>
            </div>
        </div>
    </div>

    <div class="mt-2 form-group">
        <label for="" v-if="label" class="text-sm font-bold"> New {{ label }}</label>
        <div class="flex items-center justify-between px-2 bg-white border border-gray-200 rounded-md"
            :class="{'border-gray-400': isFocused}"
        >
            <input
                v-model="checkItemTitle"
                class="w-full h-8 border-none focus:outline-none"
                ref="input"
                @keydown.enter.exact.prevent="saveItem()"
                @focus="isFocused=true"
                @blur="isFocused=false"
                :placeholder="`+ Add an ${label || 'item'} and press enter`"
            >
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from "vue";


const props = defineProps({
    items: Array,
    task: Object,
    allowEdit: Boolean,
    label: String
})

const emit = defineEmits({
    'updated': Array,
    'update:items': Array
})

const isFocused = ref(false)
const input = ref(null)

const checkItemTitle = ref("")

const deleteItem = (index) => {
    props.items.splice(index, 1);
}

const clearForm = () => {
    checkItemTitle.value = ""
}

const saveItem = () => {
    props.items.push({
        label: checkItemTitle.value,
        name: 1
    });
    clearForm()
    input.value && input.value.focus();
}
</script>

