<template>
    <div class="relative overflow-hidden bg-white rounded-md">
        <div
            class="absolute z-20 flex items-center justify-center w-full h-full"
        >
            <slot>
                <div
                    class="px-5 py-2 my-auto text-white transition-transform transform bg-black cursor-pointer select-none hover:scale-105 bg-opacity-60 rounded-3xl hover:bg-opacity-80"
                >
                    <i class="mr-2 fa fa-play" />
                    {{ label }}
                </div>
            </slot>
        </div>
        <video
            loop
            muted
            preload="metadata"
            :width="width"
            :height="height"
            controls
        >
            <source :src="src" :type="type" />
        </video>
    </div>
</template>

<script setup>
defineProps({
    width: {
        type: Number,
        default: 1920,
    },
    height: {
        type: Number,
        default: 1080,
    },
    src: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: "Play video",
    },
    type: {
        type: String,
        default: "video/mp4",
    },
    imageUrl: {
        type: String,
        required: true,
    },
});
</script>
