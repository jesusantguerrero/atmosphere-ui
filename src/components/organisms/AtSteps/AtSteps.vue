<template>
    <div class="wizard">
        <div v-if="showSteps" class="steps">
            <at-step-tab
                v-for="(step, index) in state.steps"
                :key="step.title"
                :step="step"
                :value="value"
                :is-active="value == index"
                :is-passed="value >= index"
                @click="handleClick(index)"
            />
        </div>
        <div class="display" :class="{full: showSteps}">
            <slot />
            <slot name="footer" :next="next" :prev="previous" />
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, provide, reactive, useSlots } from "vue-demi"
import AtStepTab from "../../molecules/AtStepTab/AtStepTab.vue";
import AtStep from "../../molecules/AtStep/AtStep.vue";

const props = defineProps({
    value: {
        type: Number,
        default: 0
    },
    showLabels: {
        type: Boolean,
        default: true
    },
    showSteps: {
        type: Boolean,
        default: true
    },
    activeColor: {
        type: String,
        default: "primary"
    },
    activeLabelColor: {
        type: String,
        default: "white"
    },
})
  
const emit = defineEmits(["update:value"]);

const state = reactive({
    steps: null,
    tabs: null
})

const dispatchBeforeChange = (index) => {
    return state.tabs[index].beforeChange && !tabs[index].beforeChange()
}

const setActiveTab = (currentIndex) => {
    const oldIndex = props.value;
    if (oldIndex >= 0 && state.tabs[oldIndex]) {
        if (oldIndex <= currentIndex && dispatchBeforeChange(oldIndex)) {
            return
        }
    }

    emit("update:value", currentIndex)

    if (state.tabs[currentIndex] && state.tabs[currentIndex].afterChange) {
        state.tabs[currentIndex].afterChange()
    }
}

onMounted(() =>  {
    const slots = useSlots();
    state.tabs = slots.default().filter(value => value.type == AtStep);
    state.steps = state.tabs.map(tab => tab.props);
    nextTick(() => {
        setActiveTab(props.value);
    });
});

const next = () => {
    if (props.value < state.tabs.length - 1) {
        setActiveTab(props.value + 1);
    } else {
        const isInvalid = dispatchBeforeChange(props.value);
        if (!isInvalid) {
            emit("finished", props.value)
        }
    }
}

const previous = () => {
    if (props.value > 0) {
        setActiveTab(props.value - 1)
    } else {
        emit("reset");
    }
}

const handleClick = (index) => {
    if (index <= props.value) {
        setActiveTab(index);
    }
}

const activeTab = computed(() => {
    return state.tabs && state.tabs[props.value].props.name;
})

provide('activeTab', activeTab);

</script>

<style lang="scss" scoped>
    .wizard {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .steps {
        background: #F7F7F7;
        border-radius: 4px;
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .display {
        width: 100%;
        height: 100%;
    }
</style>
