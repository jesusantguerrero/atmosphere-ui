<template>
    <div
        class="step-item"
        :class="{
            active: isActive,
            passed: isPassed
        }"
    >
        <div class="load" :class="state.loadClass"/>
        <div
            class="circle"
            @click="handleClick(index)"
        >
            <i v-if="isActive" class="fas fa-check" />
        </div>
        <div class="step-info">
            <div class="title">
                {{ step.title }}
            </div>
            <div class="description">
                {{ step.description }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from "vue"

const props = defineProps({
    step: {
        type: Object,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isPassed: {
        type: Boolean,
        default: false,
    },
    activeClass: {
        type: String,
        default: 'bg-green-500'
    }
})

const state = reactive({
    loadClass: computed(() => {
        return [(props.isActive || props.isPassed) && props.activeClass ];
    })
})
</script>

<style lang="scss" scoped>
    .step-item {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;

        .load {
            position: absolute;
            width: 0;
            height: 100%;
            transition: width ease .5s;
        }

        &:first-child {
            .load {
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
        }

        &:last-child {
            .load {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
            }
        }

        &.active,&.passed {
            .load {
                transition: width ease .5s;
                width: 100%;
            }

            .circle {
                background: white;
                color: #333333;
                cursor: pointer;
            }
            
            .title {
                color: white;
            }
        }

        &.active {
            .load {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
            }

        }

        .circle {
            background: #DEDEDE;
            border-radius: 50%;
            margin-left: 15%;
            height: 14px;
            width: 14px;
            min-height: 14px;
            min-width: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            z-index: 2;
        }

        .step-info {
            display: absolute;
            z-index: 10;
            margin-left: 10px;
            width: 100%;
        }

        .title {
            color: #707070;
            font-size: 14px;
            font-weight: bold;
        }

        .description {
            color: #9B9B9B;
            font-size: 13px;
        }
    }

</style>
