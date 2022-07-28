<template>
    <!-- Carousel -->
    <div class="relative w-full">
        <div class="relative custom-wrapper">
            <div
                v-if="hasScrolls && canScrollLeft"
                class="z-40 absolute top-0 left-0 flex items-center arrow-wrapper pl-2.5 bg-gradient-to-l from-transparent to-gray-dark-900 bg-opacity-30"
            >
                <div
                    class="flex items-center justify-center w-6 h-6 text-white rounded-full cursor-pointer bg-gray-dark-600 bg-opacity-80"
                    @click="prev()"
                >
                    <i class="fa fa-chevron-left" />
                </div>
            </div>
            <div
                ref="fileList"
                class="relative flex w-full pb-2 space-x-4 overflow-x-auto select-none file-input__list"
                @scroll="checkScroll"
            >
                <slot
                    v-for="(item, index) in list"
                    :key="`${item.url}-${index}`"
                    :item="item"
                    class="relative inline-block file-input__list-item rounded-1"
                />
            </div>
            <div
                v-if="hasScrolls && canScrollRight"
                class="absolute top-0 right-0 flex items-center arrow-wrapper pr-2.5 bg-gradient-to-r from-transparent to-gray-dark-900 bg-opacity-30"
            >
                <div
                    class="flex items-center justify-center w-6 h-6 text-white rounded-full cursor-pointer bg-gray-dark-600 bg-opacity-80"
                    @click="next()"
                >
                    <i icon="fa fa-chevron-right" />
                </div>
            </div>
        </div>

        <slot> </slot>
    </div>
    <!-- /Carousel -->
</template>

<script setup>
import { nextTick, ref, watchEffect } from "vue";

const props = defineProps({
    list: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["removed"]);
const fileList = ref(null);
const IMAGE_WIDTH = 180;
const IMAGE_GAP = 25;

const hasScrolls = ref(false);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const scrollSize = IMAGE_WIDTH + IMAGE_GAP;

const checkScroll = () => {
    if (fileList.value && props.list.length) {
        nextTick(() => {
            const { scrollWidth, clientWidth } = fileList.value;
            hasScrolls.value = scrollWidth > clientWidth;
            canScrollRight.value =
                fileList.value.scrollLeft < scrollWidth - clientWidth;
            canScrollLeft.value = fileList.value.scrollLeft > 0;
        });
    } else {
        hasScrolls.value = false;
        canScrollRight.value = false;
        canScrollLeft.value = false;
    }
};

watchEffect(() => {
    checkScroll();
});

const next = () => {
    fileList.value.scrollLeft += scrollSize;
};

const prev = () => {
    fileList.value.scrollLeft -= scrollSize;
};
</script>

<style scoped>
.file-input__list-item {
    height: 151px !important;
    width: 180px !important;
    min-width: 180px !important;
}

.arrow-wrapper {
    height: 151px;
}

.file-input__list {
    scroll-behavior: smooth;
}
.file-input__list::-webkit-scrollbar-thumb {
    @apply bg-gray-600;
    border-radius: 4px;
}

.file-input__list::-webkit-scrollbar-thumb:hover {
    @apply bg-gray-400;
}

.file-input__list::-webkit-scrollbar {
    @apply bg-gray-100 rounded-md;
    width: 8px;
    height: 6px;
}
</style>
