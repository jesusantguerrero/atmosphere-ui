<template>
    <div class="divider" v-if="!label">
        <div class="divider__inner"></div>
    </div>

    <div v-else class="item" effect="dark" :content="label" placement="right">
        <inertia-link
            class="flex items-center w-full px-5 py-4 rounded-3xl"
            :class="[ isPath(to) && 'active', classes ]"
            :href="to"
        >
            <i :class="`fa fa-${icon}`"  class="mr-2"/>
            {{ label }}
        </inertia-link>
    </div>
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
        isPath(url = '') {
            const link = url.replace(window.location.origin, "");
            if (url == "/") {
                return ["/", "/dashboard"].includes(window.location.pathname);
            }
            return link == window.location.pathname;
        },
    }
};
</script>