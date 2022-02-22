<template>
    <div
        class="w-full px-5 pt-10 text-gray-600 rounded-md form-field"
        :class="[`field-${field.name}`, disabled ? 'pb-4' : 'border-2 border-gray-200 bg-white space-y-5' ]"
    >
        <div class="flex space-x-4">
            <div class="mb-2" :class="[disabled ? 'w-full' : 'w-8/12']">
                <label v-if="!disabled"> Label: </label>
                <div class="flex font-bold ">
                    <span v-if="index" class="mr-2"> {{ index }}.</span>
                    <p v-if="disabled">{{ field.title }}</p>
                    <input
                        v-else
                        v-model="field.title"
                        placeholder="Question"
                        :disabled="disabled"
                        class="w-full font-bold bg-white focus:outline-none"
                        :class="{'py-2 px-2 border-gray-200 border rounded-md focus:border-gray-200': !disabled}"
                    />
                </div>
            </div>
            <div v-if="!disabled" class="w-4/12">
                <label> Field Type: </label>
                <div>
                    <jet-select
                        :options="fieldTypes"
                        v-model="field.type"
                        class="w-full">
                    </jet-select>
                </div>
            </div>
        </div>

        <at-form-field
            :disabled="disabled"
            :field="field"
            :options="field.options"
            :component-name="state.componentName"
        />

        <div class="flex space-x-4" v-if="field.should_accept_comment">
            <div class="w-full">
                <label v-if="!disabled"> Comment label: </label>
                <div>
                    <input
                        v-model="field.comment_label"
                        placeholder="Question"
                        :disabled="disabled"
                        class="w-full bg-white focus:outline-none"
                        :class="{'py-2 px-2 border-gray-200 border rounded-md focus:border-gray-200': !disabled}"
                    />
                </div>
            </div>
        </div>

        <div
            class="flex justify-end py-2 mt-5 space-x-2 font-bold text-gray-400 border-t border-gray-200"
            v-if="!disabled"
        >

            <at-switch
                v-model="field.should_accept_comment"
                active-text="Should accept comment"
                active-color="#13ce66"
            />

            <at-switch
                v-model="field.is_required"
                active-text="Is required"
                active-color="#13ce66"
            />

            <button @click="$emit('copied')" class="hover:text-gray-500">
                <i class="fa fa-copy"></i>
            </button>

            <button @click="$emit('delete')" class="ml-2 hover:text-red-500">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, toRefs, watch } from 'vue';
import JetSelect from "../../molecules/AtSimpleSelect/AtSimpleSelect.vue"
import AtSwitch from "../../atoms/AtSwitch/AtSwitch.vue";
import AtButton from "../../atoms/AtButton/AtButton.vue";
import AtFormField from "../../molecules/AtFormField/AtFormField.vue";

const props = defineProps({
    field: {
        type: Object,
        required: true
    },
    fieldTypes: {
        type: Array,
        required: true
    },
    disabled: {
        type: Boolean,
        required: false
    },
    index: {
        type: Number
    }
});

const state = reactive({
    options: props.field.options ?? [],
    componentName: 'input'
});

watch(() => ({ ...props.field}) , (type) => {
    const field = props.fieldTypes.find(field => field.name == props.field.type);
    state.componentName =  field ? field.component : 'input'
}, { deep: true, immediate: true });

defineExpose({
    ...toRefs(state)
})

</script>
