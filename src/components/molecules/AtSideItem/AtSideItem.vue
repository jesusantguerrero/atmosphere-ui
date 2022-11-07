<template>
    <div class="divider" v-if="!label">
        <div class="divider__inner"></div>
    </div>

    <div v-else class="item" v-bind="$attrs">
        <slot :label="label" :to="to" :class="classes" :icon="icon">
            <component :is="componentName" :class="classes" :href="to">
                <i
                    :class="[
                        icon ?? `fa fa-${icon}`,
                        isExpanded ? 'mr-2' : 'mx-auto',
                    ]"
                />
                <span v-if="isExpanded"> {{ label }} </span>
            </component>
        </slot>
    </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { isSamePath } from "../../../utils";

const props = defineProps({
    to: {
        type: String,
    },
    icon: {
        type: String,
    },
    label: {
        type: String,
    },
    classes: {
        type: String,
        default: "nav-link",
    },
    itemClass: {
        type: String,
    },
    itemActiveClass: {
        type: String,
    },
    as: {
        type: [String, Object],
        default: "router-link",
    },
    isActiveFunction: {
        type: [Function, null],
    },
});

const currentPath = inject("currentPath", ref(""));
const classes = computed(() => {
    const classes = "flex items-center w-full px-5 py-4 cursor-pointer";
    return [
        isActive(props.to) && props.itemActiveClass,
        props.classes,
        props.itemClass,
        classes,
    ];
});

const componentName = computed(() => {
    return props.as;
});

function isActive(url) {
    const isActiveMethod = props.isActiveFunction || isSamePath;
    return isActiveMethod(url, currentPath.value);
}

const isExpanded = inject("isExpanded", true);
</script>
