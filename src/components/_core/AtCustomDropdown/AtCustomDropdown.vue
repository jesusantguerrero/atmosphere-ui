<template>
  <div>
    <div ref="trigger" class="w-full" @click="handleClick">
      <slot name="trigger" />
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div ref="content" :class="open ? 'block' : 'hidden'">
        <slot name="content" v-if="open" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, unref, onMounted } from "vue";
import { onClickOutside  } from "@vueuse/core";

defineProps({
  placement: {
    type: String,
    default: "bottom",
  },
});

const trigger = ref(null);
const content = ref(null);
const open = ref(false);

const handleClick = () => {
    console.log('toggled')
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

onMounted(() => {
  onClickOutside(unref(content), close);
});
</script>
