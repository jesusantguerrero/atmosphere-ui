<template>
    <div class="border app-side">
        <div class="px-5 my-5">
            <slot name="brand">
                <h1>
                    {{ title }}
                </h1>
            </slot>
        </div>
        <div class="px-5" role="tablist" aria-orientation="vertical">
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

        <div class="nav-container">
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
        </div>
    </div>
</template>

<script setup>
import { provide, ref } from "vue";
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
    currentPath: {
        type: String,
        default: "/",
    },
    itemProperty: {
        type: String,
        default: "items",
    },
});

const activeGroup = ref("");
provide("currentPath", props.currentPath);
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
