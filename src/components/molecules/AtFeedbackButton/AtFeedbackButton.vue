<template>
    <at-dropdown
        placement="bottom-end"
        :width="300"
        trigger="click"
        ref="dropdown"
    >
        <template #trigger>
            <div
                class="relative flex p-2 text-sm font-bold text-gray-400 rounded-full cursor-pointer select-none hover:bg-gray-100 lg:text-lg dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <div class="w-6 h-6">
                    <slot>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 12 12"
                        >
                            <g fill="none">
                                <path
                                    d="M12 3.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0zm-3-2a.5.5 0 0 0-1 0V3H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V4h1.5a.5.5 0 0 0 0-1H9V1.5z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M3 2h1.256c.126-.356.295-.691.502-1H3a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v1.5a.5.5 0 0 0 .777.416L6.651 9H9a2 2 0 0 0 1.984-1.747a4.475 4.475 0 0 1-1.557.651A.996.996 0 0 1 9 8H6.5a.5.5 0 0 0-.277.084L4 9.566V8.5a.5.5 0 0 0-.5-.5H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                                    fill="currentColor"
                                ></path>
                            </g>
                        </svg>
                    </slot>
                </div>
            </div>
        </template>

        <template v-slot:content="{ close }">
            <div class="px-5 py-3 text-sm feedback-form">
                <AtSimpleSelect v-model="form.type" :options="state.options" />
                <div class="w-full mt-2">
                    <AtTextarea
                        v-model="form.message"
                        placeholder="Type a message"
                        class="p-4 border rounded-md"
                    />
                </div>
                <div class="flex justify-end space-x-2">
                    <AtButton type="secondary" @click="close(true)"
                        >Cancel</AtButton
                    >
                    <AtButton type="primary" @click="emitSubmit">
                        Send
                    </AtButton>
                </div>
            </div>
        </template>
    </at-dropdown>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import AtDropdown from "../AtDropdown/AtDropdown.vue";
import AtSimpleSelect from "../AtSimpleSelect/AtSimpleSelect.vue";
import AtTextarea from "../../atoms/AtTextarea/AtTextarea.vue";
import AtButton from "../../atoms/AtButton/AtButton.vue";

const emit = defineEmits(["submit"]);

const form = reactive({
    type: "",
    message: "",
});

const state = reactive({
    options: [
        {
            name: "feedback",
            label: "Feedback",
        },
        {
            name: "bug",
            label: "Report A Bug",
        },
        {
            name: "question",
            label: "Question",
        },
        {
            name: "feature",
            label: "Feature Request",
        },
        {
            name: "help",
            label: "Help",
        },
    ],
});

const clearForm = () => {
    form.message = "";
    form.type = "";
};

const dropdown = ref(null);
const emitSubmit = () => {
    emit("submit", form);
    dropdown.value.closeModal(true);
};
</script>

<style>
.feedback-form {
    min-width: 252px;
}
</style>
