<template>
  <button class="relative overflow-hidden rounded-md at focus:outline-none" :class="[colorClass]" ref="Button">
    <div class="flex items-center justify-center w-full h-full px-5 py-2 hover-effect">
        <slot></slot>
    </div>
  </button>
</template>

<script>
import { computed } from 'vue'
export default {
    props: {
        type: {
            type: String,
            validator(value) {
                return ["primary", 'danger', 'secondary', 'success', 'warning', 'notice'].includes(value)
            }
        }
    },
    setup(props) {
        return {
            colorClass: computed(() => {
                const typeColors = {
                    primary: 'bg-blue-400 text-white',
                    danger: 'bg-red-400 text-white'
                }

                return typeColors[props.type] || ""
            })
        }
    },
}
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
}

</style>
