<template>
    <div
        class="w-4/12 p-5 mx-2 bg-white border-gray-300 rounded-md shadow-md border-1"
    >
        <h5 class="mb-2">
            {{ title }}
        </h5>
        <div class="text-xl font-extrabold remark_info text-cool-gray-600">
            {{ value }}
        </div>

        <div class="mt-3 links_container" v-if="links.length">
            <slot name="link">
                <a
                    class="text-sm font-bold"
                    :class="detailTextClass"
                    :href="link.ref"
                    v-for="link in links"
                    :key="link.ref"
                >
                    {{ link.label }}
                </a>
            </slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String
    },
    value: {
        type: [String, Number]
    },
    links: {
        type: Array
    },
    detailTextClass: {
        type: String,
        default: 'text-purple-500'
    }
})
</script>

<style></style>
