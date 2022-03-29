<template>
  <button 
    class="relative px-5 py-2 overflow-hidden focus:outline-none" 
    :class="[colorClass, disabled ? 'bg-opacity-20 text-gray-700 hover:bg-opacity-20 cursor-not-allowed' : 'hover:bg-opacity-80', roundedClass]" 
    ref="Button"
   >
        <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return ["primary", 'danger', 'secondary', 'success', 'warning', 'notice'].includes(value)
        }
    },
    disabled: {
        type: Boolean
    },
    rounded: {
        type: Boolean
    },
});

const colorClass = computed(() => {
    const typeColors = {
        primary: 'bg-blue-400 text-white',
        secondary: 'bg-gray-400 text-white',
        success: 'bg-green-400 text-white',
        warning: 'bg-yellow-400 text-white',
        danger: 'bg-red-400 text-white'
    }

    return typeColors[props.type] || ""
});

const roundedClass = computed(() => {
    return props.rounded ? 'rounded-md' : ''
});
</script>

<style lang="scss">
.at {
    .hover-effect {
        max-height: 37px;
    }
    &:hover {
       .hover-effect {
           background: rgba(0,0,0, .1);
       }
    }
    &:disabled {
        
    }
}

</style>
