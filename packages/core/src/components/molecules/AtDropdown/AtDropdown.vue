<template>
    <div class="relative">
        <div @click="open = ! open">
            <slot name="trigger"></slot>
        </div>

        <!-- Full Screen Dropdown Overlay -->
        <div v-show="open" class="fixed inset-0 z-40" @click.self="closeModal(true)">
        </div>

        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div 
                v-show="open"
                ref="content"
                class="absolute z-50 mt-2 rounded-md shadow-lg"
                :class="[widthClass, alignmentClasses]"
                style="display: none;"
                @click.stop="closeModal(closeOnClick)">
                <div class="rounded-md ring-1 ring-black ring-opacity-5" :class="contentClasses">
                    <slot name="content" :close="closeModal"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";

const props = defineProps({
    align: {
        type: String,
        default: 'right'
    },
    width: {
        type: [String, Number],
        default: '48'
    },
    contentClasses: {
        type: [Array, String],
        default: () => ['py-1', 'bg-white']
    },
    closeOnClick: {
        type: Boolean,
        default: false
    }
});

const open = ref(false)

const closeOnEscape = (e) => {
    if (open.value && e.keyCode === 27) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))


const widthClass = computed(() => {
    return {
        '48': 'w-48',
        'full': 'w-full'
    }[props.width.toString()]
});

const alignmentClasses = computed(() => {
    if (props.align === 'left') {
        return 'origin-top-left left-0'
    } else if (props.align === 'right') {
        return 'origin-top-right right-0'
    } else {
        return 'origin-top'
    }
});

const content = ref(null)
const closeModal = (force) => {
    if (!force && !props.closeOnClick) {
        return
    } else {
        open.value = false;
    }
}

defineExpose({
    closeModal
})
</script>
