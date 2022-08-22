<template>
    <div class="border transition app-side">
        <div class="mx-auto my-5">
            <slot name="brand">
                <h1>
                    {{ title }}
                </h1>
            </slot>
        </div>
        <div class="mx-auto py-8" role="tablist" aria-orientation="vertical">
            <template v-for="route in menu">
                <AtSideItem
                    v-if="!route[itemProperty]"
                    v-bind="route"
                    :item-class="itemClass"
                    :item-active-class="itemActiveClass"
                    :key="route.label"
                />

                <div v-else-if="route.section" :key="`${route.label}-section`">
                    <p
                        class="pl-5 mt-2 text-sm font-bold text-gray-400 capitalize"
                    >
                        {{ route.section }}
                    </p>
                    <div>
                        <AtSideItem
                            v-for="sectionItem in route[itemProperty]"
                            :key="`${sectionItem.section}-${route.label}`"
                            v-bind="sectionItem"
                            :item-class="itemClass"
                            :item-active-class="itemActiveClass"
                            :track-id="sectionItem.label"
                        />
                    </div>
                </div>

                <AtSideItemGroup
                    v-else
                    v-model="activeGroup"
                    :key="`${route.label}-group`"
                    :item-class="itemClass"
                    :item-active-class="itemActiveClass"
                    :track-id="route.label"
                    :icon="route.icon"
                    :label="route.label"
                    :childs="route[itemProperty]"
                />
            </template>
        </div>

        <div class="nav-container flex flex-col justify-end">
            <div
                class="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
                v-if="headerMenu"
            >
                <template v-for="route in headerMenu" :key="route.label">
                    <AtSideItem
                        v-if="!route.childs"
                        :icon="route.icon"
                        :label="route.label"
                        :to="route.to"
                    />

                    <AtSideItemGroup
                        v-else
                        :track-id="route.label"
                        :icon="route.icon"
                        :label="route.label"
                        v-model="activeGroup"
                        :childs="route.childs"
                    />
                </template>
            </div>
            <div class="flex w-full justify-end pr-4" v-if="isExpandable">
                <slot name="close-icon">
                    <div
                        class="transform cursor-pointer hover:bg-white/80 rounded-full p-2"
                        :class="[
                            isExpanded ? 'rotate-180' : 'rotate-0',
                            iconClass,
                        ]"
                        @click="$emit('update:isExpanded', !isExpanded)"
                    >
                        <svg width="32" height="32" viewBox="0 0 16 16">
                            <g fill="none">
                                <path
                                    d="M6.293 8.5l-.647.647a.5.5 0 1 0 .708.707l1.5-1.5a.5.5 0 0 0 0-.707l-1.5-1.5a.5.5 0 1 0-.708.707l.647.646H4.502a.5.5 0 1 0 0 1h1.79z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M12 13.001a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6.002a2 2 0 0 0 2 2h8zm1-2a1 1 0 0 1-1 1H9.998V4H12a1 1 0 0 1 1 1v6.002zM8.998 4v8.002H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4.998z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { provide, ref, toRefs } from "vue";
import AtSideItemGroup from "~molecules/AtSideItemGroup/AtSideItemGroup.vue";
import AtSideItem from "~molecules/AtSideItem/AtSideItem.vue";

const props = defineProps({
    title: String,
    menu: {
        type: Array,
        required: true,
    },
    headerMenu: {
        type: Array,
    },
    itemClass: {
        type: String,
    },
    itemActiveClass: {
        type: String,
    },
    iconClass: {
        type: String,
    },
    currentPath: {
        type: String,
        default: "/",
    },
    itemProperty: {
        type: String,
        default: "items",
    },
    isExpanded: {
        type: Boolean,
        default: true,
    },
    isExpandable: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["update:isExpanded"]);
const { isExpanded, currentPath } = toRefs(props);
const activeGroup = ref("");
provide("currentPath", currentPath);
provide("isExpanded", isExpanded);
</script>

<style lang="scss" scoped>
.app-side {
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    position: relative;
    display: grid;
    grid-template-rows: 80px 1fr 1fr;
    z-index: 1001;

    .nav-container {
        display: flex;
        padding-bottom: 10px;
        .nav {
            margin-top: auto;
        }
    }

    .nav {
        margin-top: 40px;
        width: 100%;
        max-height: 100%;
        flex-flow: row;
        overflow-y: auto;

        &::-webkit-scrollbar-thumb {
            background-color: transparentize($color: #000000, $amount: 0.7);
        }

        &::-webkit-scrollbar {
            background-color: transparent;
            width: 8px;
        }
    }

    .nav-link {
        text-align: left;
        transition: all ease 0.3s;
        margin: 2px;

        &:not(.active):hover {
            background: dodgerblue;
            color: white;
        }
    }
}
</style>
