<template>
<section class="body-font">
    <div class="flex flex-col items-center pt-20 pb-8 mx-auto max-w-7xl sm:flex-row">
        <a :href="titleLink" class="text-xl font-black leading-none select-none zen" :class="textClass">{{ title }}<span class="text-green-400">.</span></a>
        <p class="mt-4 text-sm sm:ml-4 sm:pl-4 sm:border-l sm:mt-0" :class="textClass">© {{ year }} {{ subtitle }}
        </p>
        <span class="inline-flex justify-center mt-4 space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
            <a :href="link.url" :class="linkClass" v-for="link in links" :key="link.name">
                <span class="sr-only">Facebook</span>
                <slot :name="`${link.name}-icon`">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                    </svg>
                </slot>
            </a>
        </span>
    </div>
</section>
</template>

<script setup>
const props = defineProps({
    titleLink: {
        type: String,
        default: '#_'
    },
    title: {
        type: String,
        default: 'Lumiere',
    },
    subtitle: {
        type: String,
        default: '',
    },
    textClass: {
        type: String,
        default: 'text-gray-100',
    },
    year: {
        type: String,
        default: '',
    },
    links: {
        type: Array,
        default: () => [],
    },
    linkClass: {
        type: String,
        default: 'text-gray-200 hover:text-gray-100',
    }
});

</script>
