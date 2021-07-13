<template>
    <div>
        <div ref="trigger">
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
                <slot name="content" v-if="open"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { ref, unref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { createPopper } from "@popperjs/core";
import { onClickOutside } from "@vueuse/core"

export default {
    props: {
        placement: {
            type: String,
            default: 'bottom-right'
        }
    },
    setup(props) {
        const trigger = ref(null)
        const content = ref(null)
        const popper = ref(null);
        const open = ref(false);

        onMounted(() => {
           popper.value = createPopper(trigger.value, content.value, {
                placement: props.placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 8],
                        },
                    },
                ],
            });

            trigger.value.addEventListener('click', () => {
                open.value = !open.value;
            })

            const close = () => {
                open.value = false;
            }
            
            onClickOutside(unref(content), close)
        })

        return {
            trigger,
            content,
            open
        }
    },
}
</script>