<template>
    <div class="divider" v-if="!label">
        <div class="divider__inner"></div>
    </div>

    <ElTooltip v-else class="item" effect="dark" :content="label" placement="right">
        <InertiaLink
            class="flex items-center px-2 py-1 side-item"
            :class="{ active: isPath(to) }"
            :href="to"
            :title="label"
        >
            <i :class="`fa fa-${icon}`" class="ic-icon" />
        </InertiaLink>
    </ElTooltip>
</template>

<script>
export default {
    props: {
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
            default: "nav-link"
        }
    },
    computed: {
        path() {
            return window.location.pathname;
        }
    },
    methods: {
        isPath(url) {
            const link = url.replace(window.location.origin, "");
            if (url == "/") {
                return ["/", "/dashboard"].includes(window.location.pathname);
            }
            return link == window.location.pathname;
        },
    }
};
</script>

<style lang="scss" scoped>
.divider {
    height: 1px;
    width: 100%;
    padding: 0 5px;
    margin: 20px 0;
    &__inner {
        height: 1px;
        width: 100%;
        background: white;
    }
}
.side-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    min-width: 34px;
    font-size: 18px;
    height: 34px;
    border-radius: 8px;
    font-weight: bolder;
    margin: 10px auto;
    transition: all ease .3s;

    &:hover, &.active {
        background-color: rgb(172, 148, 250);
    }
}
</style>
