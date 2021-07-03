<template>
<AtBareRate :value="modelValue" :max="max" @update:modelValue="$emit('update:modelValue')" class="mt-4 space-x-2" v-slot:default="{ current, selected }">
    <AtBareRateButton 
        class="w-8 font-bold text-gray-400 transition rounded-lg"
        :class="[selected && selectedClass, itemClass ]"
        :current="current"
    > 
        <slot>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z" fill="currentColor"></path></svg>
        </slot>
    </AtBareRateButton>
</AtBareRate>
</template>

<script>
import AtBareRate from "../../_core/AtBareRate/AtBareRate.vue";
import AtBareRateButton from "../../_core/AtBareRate/AtBareRateButton.vue";

export default {
    components: {
        AtBareRate,
        AtBareRateButton
    },
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        itemClass: {
            type: String,
            default: "hover:text-yellow-500"
        },
        selectedClass: {
            type: String,
            default: 'text-yellow-500'
        },
        max: {
            type: Number,
            default: 5
        }
    },
    setup() {
        
    },
}
</script>