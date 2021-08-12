import { defineComponent,h, defineEmits, defineProps, computed, nextTick, onMounted, provide, reactive, useSlots, inject } from "vue"
import AtStep from "../../molecules/AtStep/AtStep.vue"

export const stepProps = {
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
}

export const AtBareStepList = defineComponent({
    name: "AtBareStepList",
    setup: (_props, { slots }) => {
        const state = inject("state");
        const handleClick = inject("handleClick");

        return () => h('div', slots.default({
            steps: state.steps,
            handleClick,
        }))
    }
})

export const AtBareStepControls = defineComponent({
    name: "AtBareStepControls",
    setup(_props, { slots }) {
        const next = inject("next");
        const prev = inject("prev");
        const step = inject("step");
        console.log(slots);
        return () => slots.default({
            next,
            prev,
            step
        });
    }
})

export const AtBareStep = defineComponent({
    name: "AtBareStep",
    props: stepProps,
    emits: ["update:value"],
    setup(props, { slots, emit }) {        
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
        
            if (state.tabs[oldIndex] && state.tabs[oldIndex].afterChange) {
                state.tabs[oldIndex].afterChange()
            }
        }
        
        onMounted(() =>  {
            const slots = useSlots();
            state.tabs = slots.default().find( slot => slot.key === '_default').children.filter(value => value.type == AtStep);
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
        provide('state', state)
        provide('step', props.value);
        provide('handleClick', handleClick);
        provide('next', next);
        provide('prev', previous)

        return () => slots.default()
    },
})