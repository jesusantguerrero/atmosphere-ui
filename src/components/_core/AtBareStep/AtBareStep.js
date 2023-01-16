import {
  defineComponent,
  h,
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  useSlots,
  inject,
  watch,
} from "vue";

import AtStep from "../../molecules/AtStep/AtStep.vue";

export const stepProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  showLabels: {
    type: Boolean,
    default: true,
  },
  showSteps: {
    type: Boolean,
    default: true,
  },
  activeClass: {
    type: String,
    default: "bg-green-400",
  },
  activeLabelClass: {
    type: String,
    default: "text-white",
  },
  circleActiveColor: {
    type: String,
  },
  simple: {
    type: Boolean,
    default: false,
  },
};

export const AtBareStepList = defineComponent({
  name: "AtBareStepList",
  props: {
    showSteps: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, { slots }) {
    const state = inject("state");
    const handleClick = inject("handleClick");

    return () =>
      props.showSteps
        ? h(
            "div",
            slots.default({
              steps: state.steps,
              handleClick,
              state,
            })
          )
        : null;
  },
});

export const AtBareStepControls = defineComponent({
  name: "AtBareStepControls",
  setup(_props, { slots }) {
    const next = inject("next");
    const prev = inject("prev");
    const step = inject("step");
    return () =>
      slots.default({
        next,
        prev,
        step,
      });
  },
});

export const AtBareStep = defineComponent({
  name: "AtBareStep",
  props: stepProps,
  emits: ["update:modelValue", "finished", "reset"],
  setup(props, { slots, emit }) {
    const state = reactive({
      value: 0,
      steps: null,
      tabs: null,
    });

    watch(
      () => props.modelValue,
      (value) => {
        if (props.modelValue !== state.value) {
          setActiveTab(value);
        }
      }
    );

    const dispatchTabHook = (index, hookName = "before-change") => {
      if (state.tabs[index] && state.tabs[index].props[hookName]) {
        return state.tabs[index].props[hookName].call();
      }

      if (hookName === "before-change") {
        return new Promise((resolve) => resolve(false));
      }
    };

    const setStateValue = (currentIndex, emitFinished) => {
      state.value = currentIndex;
      emit("update:modelValue", currentIndex);

      if (emitFinished) {
        emit("finished", currentIndex);
      }
    };

    const setActiveTab = async (currentIndex) => {
      const oldIndex = state.value;
      let newIndex = currentIndex;
      const isNext = oldIndex < currentIndex;
      const isPrev = oldIndex > currentIndex;
      const isFinished = currentIndex > state.tabs.length - 1;

      if (isNext && state.tabs[oldIndex]) {
        const isInvalid = await dispatchTabHook(oldIndex, "before-change");
        if (isInvalid) {
          newIndex = oldIndex;
        }
        if (!isInvalid && isFinished) {
          return setStateValue(state.value, true);
        }
      } else if (isPrev) {
        newIndex = currentIndex;
      }
      setStateValue(newIndex, isFinished);

      if (oldIndex !== newIndex) {
        dispatchTabHook(oldIndex, "after-change");
      }
    };

    onMounted(() => {
      const slots = useSlots();
      state.tabs = slots
        .default()
        .find((slot) => slot.key === "_default")
        .children.filter((value) => value.type == AtStep);
      state.steps = state.tabs.map((tab) => tab.props);
      nextTick(() => {
        setActiveTab(props.modelValue);
      });
    });

    const next = async () => {
      if (state.value < state.tabs.length) {
        setActiveTab(state.value + 1);
      }
    };

    const previous = () => {
      if (state.value > 0) {
        setActiveTab(state.value - 1);
      } else {
        emit("reset");
      }
    };

    const handleClick = (index) => {
      if (index <= props.value) {
        setActiveTab(index);
      }
    };

    const activeTab = computed(() => {
      return state.tabs && state.tabs[state.value]
        ? state.tabs[state.value].props.name
        : 0;
    });

    provide("activeTab", activeTab);
    provide("state", state);
    provide("step", state.value);
    provide("handleClick", handleClick);
    provide("next", next);
    provide("prev", previous);

    return () =>
      h(
        "div",
        slots.default({
          prev: previous,
          next,
          state: state,
        })
      );
  },
});

export const useSteps = () => {
  const state = inject("state");
  const handleClick = inject("handleClick");

  return {
    steps: state?.steps,
    handleClick,
    state,
  };
};
