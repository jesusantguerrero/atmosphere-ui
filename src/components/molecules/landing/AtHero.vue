<template>
    <header class="relative w-full px-10 pb-16 antialiased bg-gray-900 select-none md:pb-0 md:px-0">
        <site-header />

        <div class="relative z-50 py-10 mx-auto max-w-7xl md:items-center md:py-32 sm:px-4 md:flex md:justify-between">
            <div class="w-full text-left">
                <h1 class="text-2xl font-extrabold tracking-tight text-white md:leading-10 md:text-4xl sm:text-5xl sm:leading-none xl:text-3xl"><span class="block">Keep yourself in the zone</span> <span class="inline-block mt-3 text-transparent text-white ">and focus in the moment.</span></h1>
                <div class="max-w-lg mt-6 text-sm text-green-200 md:mt-4 sm:text-base -md:max-w-xl md:text-lg xl:text-xl">Take the step to improve your daily routine and get things done!</div>
                <div class="max-w-md mt-12 text-left md:space-x-5 md:items-center md:flex">
                    <router-link 
                        to="/register" 
                        class="px-5 font-bold border-0 rounded-md btn btn-action">
                        Organize your daily routine
                    </router-link>
                </div>
            </div>
            <div class="w-full">
                <div class="mt-10 md:mt-0">
                    <at-video 
                        class="overflow-hidden rounded-md shadow-lg"
                        imageUrl="src\assets\dashboard.png"
                        src="https://www.framer.com/images/developers/hero.mp4"
                        :style="{with: '400px'}"
                    /> 
                </div>    
            </div>
        </div>

        <down-wave class="z-50" />
    </header>
</template>

<script setup>
import { ref } from "vue";
import SiteHeader from "./AtSiteHeader.vue"
import AtVideo from "../../organisms/AtVideo/AtVideo.vue";
import DownWave from "./waves/down-wave.vue";

const showMenu = ref(false)
</script>

<style lang="scss" scoped>
header {
    background-size: cover;
    position: relative;
    width: 100%;
    height: 100%;

    &::after {
        content: "";
        background: linear-gradient(to left bottom,#3a4a73 0,#1b243f);
        display: block;
        position: absolute;
        width: 100%;
        top: 0;
        opacity: .95;
        left: 0;
        height: 100%;
        z-index: 40;
    }
}

.btn-action {
    @apply bg-green-400 flex items-center justify-center;
    color: white;
    border: none;
    margin: 10px 0;
    transition: all ease 0.3s;
    height: 40px;

    &:hover {
        @apply bg-green-500;
    }
}
</style>