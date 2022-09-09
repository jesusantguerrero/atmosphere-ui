<template>
    <div>
        <div
            class="flex items-center justify-between px-5 text-left transition rounded-md cursor-pointer"
            v-bind="$attrs"
            :class="[
                isActive || (!isActive && hasActiveChild)
                    ? itemActiveClass
                    : itemClass,
            ]"
            @click="emitValue()"
        >
            <span class="w-full py-4 side-item">
                <i :class="`fa fa-${icon} mr-2`" v-if="icon" />
                <span v-if="isExpanded">
                    {{ label }}
                </span>
            </span>

            <span class="indicator">
                <i :class="`fa fa-${arrowIcon}`" />
            </span>
        </div>

        <div
            class="menu-item-group__childs"
            :class="{ 'my-collapse': isActive, 'custom-accordion': true }"
        >
            <div
                class="mt-1 mb-1 ml-5 child-container space-y-1"
                v-show="isActive"
            >
                <AtSideItem
                    v-for="item in childs.filter((item) => !item.hide)"
                    :ref="`${label}-${item.label}`"
                    :key="`${label}-${item.label}`"
                    :icon="item.icon"
                    :label="item.label"
                    :to="item.to"
                    :as="item.as"
                    :item-active-class="itemActiveClass"
                    :classes="[itemClass]"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import AtSideItem from "../AtSideItem/AtSideItem.vue";

const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    childs: {
        type: Array,
        default() {
            return [];
        },
    },
    modelValue: {
        type: String,
        required: true,
    },
    trackId: {
        type: String,
        required: true,
    },
    itemClass: {
        type: String,
    },
    itemActiveClass: {
        type: String,
    },
});

const isExpanded = inject("isExpanded");
const currentPath = inject("currentPath", ref(""));

const isActive = computed(() => {
    return props.trackId == props.modelValue;
});
const hasActiveChild = computed(() => {
    return (
        !isActive.value && props.childs.find((item) => item.to == currentPath.value)
    );
});
const arrowIcon = computed(() => {
    return isActive.value ? "chevron-down" : "chevron-right";
});

const emit = defineEmits(["update:modelValue"]);
const emitValue = () => {
    const current = props.modelValue == props.trackId ? "" : props.trackId;
    emit("update:modelValue", current);
};
</script>
