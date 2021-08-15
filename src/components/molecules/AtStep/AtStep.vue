<template>
    <div v-show="isActive" class="step">
        <h4 v-if="title" class="step__title">
            {{ title }}
        </h4>
        <p v-if="description" class="step__description">
            {{ description }}
        </p>

        <div class="step__display">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from "vue";
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    description: {
        type: String,
        required: false,
    },
    beforeChange: {
        type: Function,
        required: false
    },
    afterChange: {
        type: Function,
        required: false
    }
})

const activeName = inject('activeTab', '')

const isActive = computed(() => {
     return props.name === activeName.value;
}) 
</script>

<style lang="scss" scoped>
    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
            font-weight: 600;
            font-size: 21px;
        }

        &__description {
            font-size: 16px;
            font-weight: 600;
        }

        &__display {
            width: 80%;
        }
    }

</style>
