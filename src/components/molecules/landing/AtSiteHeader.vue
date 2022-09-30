<template>
    <nav class="flex items-center h-24 mx-auto max-w-7xl">
        <div
            class="z-50 flex flex-wrap items-center justify-between w-full h-24 mx-auto font-medium"
        >
            <slot name="brand">
                <component
                    :is="routerComponent"
                    to="/"
                    class="py-4 pr-4 cursor-pointer"
                    :class="brandClass"
                >
                    <span class="text-3xl leading-none select-none logo"
                        >{{ title }}<span :class="dotClass">.</span></span
                    >
                </component>
            </slot>

            <div
                class="flex-col items-center justify-end hidden w-full h-full mt-12 font-bold text-center md:flex md:w-2/3 md:mt-0 md:flex-row md:items-center"
            >
                <component
                    :is="link.url ? 'a' : routerComponent"
                    v-for="link in links"
                    :href="link.to || link.url"
                    :key="link.name"
                    :to="link.to"
                    class="inline-block px-4 py-2 mx-2 text-left md:px-0 lg:mx-3 md:text-center"
                    :class="linkClass"
                >
                    {{ link.name }}
                </component>
                <div class="md:ml-8">
                    <slot name="actions">
                        <slot v-for="action in actions" :name="action.name">
                            <component
                                :is="getComponent(action)"
                                :to="action.url"
                                :href="action.url"
                                :class="action.class"
                                class="w-full px-4 py-2 font-bold transition rounded-md cursor-pointer md:mr-3 lg:mr-3 md:w-auto"
                                @click.stop="handleClick($event, action)"
                            >
                                {{ action.label || action.name }}
                            </component>
                        </slot>
                    </slot>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
const props = defineProps({
    title: {
        default: "Zen",
        type: String,
    },
    brandClass: {
        type: String,
        default: "",
    },
    links: {
        type: Array,
        default: () => {
            return [];
        },
    },
    actions: {
        type: Array,
        default: () => {
            return [];
        },
    },
    linkClass: {
        type: String,
        default: "text-white hover:text-green-500",
    },
    routerComponent: {
        type: String,
        default: "router-link",
    },
    dotClass: {
        type: String,
        default: "text-green-500",
    },
});

const emit = defineEmits(["action"]);

const handleClick = (event, action) => {
    if (action.emit) {
        event.preventDefault();
        emit("action", action.name);
    }
};

const getComponent = (action) => {
    return !action.url || action.emit ? "button" : props.routerComponent;
};
</script>
