<template>
    <div class="">
        <AtBareRate
            :value="modelValue"
            v-bind="{ ...$attrs, ...$props }"
            @update:modelValue="$emit('update:modelValue', $event)"
            class="space-y-2"
            :class="[scale ? 'space-x-2' : 'flex-col space-y-2']"
            v-slot:default="{ current, selected, hovered }"
        >
            <AtBareRateButton
                class="px-3 py-2 font-medium text-gray-400 transition transform bg-white border rounded-lg cursor-pointer"
                :class="[
                    itemClass,
                    (selected || hovered) && selectedClass + ' shadow-md',
                ]"
                :current="current"
                :selected="selected"
            >
                <span
                    v-if="!scale"
                    class="px-1.5 py-0.5 text-white bg-gray-500 rounded-md mr-2"
                    :class="[(selected || hovered) && selectedLetterClass]"
                >
                    {{ letters[current - 1] }}
                </span>
                <span>
                    {{ tooltips[current - 1] ?? current }}
                </span>
            </AtBareRateButton>
        </AtBareRate>
        <div v-if="leftLabel && rightLabel" class="flex justify-between">
            <span> {{ leftLabel }}</span>
            <span> {{ rightLabel }}</span>
        </div>
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
            default: "",
        },
        selectedClass: {
            type: String,
            default: "",
        },
        selectedLetterClass: {
            type: String,
            default: "",
        },
        scale: {
            type: Boolean,
            default: false,
        },
        leftLabel: {
            type: String,
            default: "",
        },
        rightLabel: {
            type: String,
            default: "",
        },
        ...rateProps,
    },
    setup() {
        return {
            letters: [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
            ],
        };
    },
};
</script>
