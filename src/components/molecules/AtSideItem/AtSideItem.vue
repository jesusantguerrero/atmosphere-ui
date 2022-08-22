<template>
    <div class="divider" v-if="!label">
        <div class="divider__inner"></div>
    </div>

    <div v-else class="item">
        <slot :label="label" :to="to" :class="classes" :icon="icon">
            <component
                :is="componentName"
                :class="[classes, itemClass]"
                :href="to"
            >
                <i
                    :class="[
                        iconClass ?? `fa fa-${icon}`,
                        isExpanded ? 'mr-2' : 'mx-auto',
                    ]"
                />
                <span v-if="isExpanded">
                    {{ label }}
                </span>
            </component>
        </slot>
    </div>
</template>

<script setup>
import { computed, inject, reactive, toRefs } from "vue";

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
        type: String,
        default: "router-link",
    },
});

const currentPath = inject("currentPath", "");
const state = reactive({
    classes: computed(() => {
        const classes =
            "flex items-center w-full px-5 py-4 rounded-md cursor-pointer";
        return [
            isPath(props.to) && props.itemActiveClass,
            props.classes,
            props.itemClass,
            classes,
        ];
    }),
});
const componentName = computed(() => {
    return props.as;
});
const isPath = (url = "") => {
    const linkUrl = url.replace("", "");
    if (url === "/") {
        return currentPath && ["/", "/dashboard"].includes(currentPath);
    }
    return linkUrl === currentPath;
};

const { classes } = toRefs(state);

const isExpanded = inject("isExpanded");
</script>
