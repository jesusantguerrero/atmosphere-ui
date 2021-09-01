<template>
    <nav class="flex items-center h-24 mx-auto max-w-7xl">
        <div class="z-50 flex flex-wrap items-center justify-between w-full h-24 mx-auto font-medium">
            <slot name="brand">
                <component :is="routerComponent" to="/" class="py-4 pr-4 cursor-pointer" :class="brandClass">
                    <span class="text-3xl leading-none text-white select-none logo zen">{{ title }}<span class="text-green-500">.</span></span>
                </component>
            </slot>
            
            <div class="flex-col items-center justify-end hidden w-full h-full mt-12 font-bold text-center md:flex md:w-2/3 md:mt-0 md:flex-row md:items-center">
                <a :href="link.url" class="inline-block px-4 py-2 mx-2 text-left md:px-0 lg:mx-3 md:text-center" :class="linkClass" v-for="link in links">
                    {{ link.name }}
                </a>
                <div class="md:ml-8">
                    <slot v-for="action in actions" :name="action.name">
                        <component :is="routerComponent" :to="action.url" :class="action.class" class="w-full px-4 py-2 font-bold transition rounded-md cursor-pointer md:mr-3 lg:mr-3 md:w-auto">
                        {{ action.label || action.name }}
                        </component>
                    </slot>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
defineProps({
    title: {
        default: 'Zen',
        type: String
    },
    brandClass: {
        type: String,
        default: ''
    },
    links: {
        type: Array,
        default: () => {
            return [];
        } 
    },
    actions: {
        type: Array,
        default: () => {
            return [];
        }
    },
    linkClass: {
        type: String,
        default: 'text-white hover:text-green-500'
    },
    routerComponent: {
        type: String,
        default: 'router-link'
    }
});
</script>