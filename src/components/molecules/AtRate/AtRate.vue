<template>
    <div class="flex items-center space-x-2">
        <AtBareRate
            :value="modelValue"
            v-bind="{ ...$attrs, ...$props }"
            @update:modelValue="$emit('update:modelValue', $event)"
            class="space-x-2"
            v-slot:default="{ current, selected, covered }"
        >
            <AtBareRateButton
                class="w-8 font-bold text-gray-400 transition transform rounded-lg cursor-pointer hover:text-yellow-400 hover:scale-110"
                :class="[(selected || covered) && selectedClass, itemClass]"
                :current="current"
                :selected="selected"
            >
                <slot>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </slot>
            </AtBareRateButton>
        </AtBareRate>
        <span className="inline-block" v-if="modelValue">{{
            tooltips[modelValue - 1]
        }}</span>
    </div>
</template>

<script>
import AtBareRate from "../../_core/AtBareRate/AtBareRate.vue";
import AtBareRateButton from "../../_core/AtBareRate/AtBareRateButton.vue";
import rateProps from "../../_core/AtBareRate/rateProps";

export default {
    components: {
        AtBareRate,
        AtBareRateButton,
    },
    props: {
        itemClass: {
            type: String,
            default: "hover:text-yellow-500",
        },
        selectedClass: {
            type: String,
            default: "text-yellow-500",
        },
        ...rateProps,
    },
    setup() {},
};
</script>
