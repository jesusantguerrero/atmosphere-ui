<script lang="ts" setup>
import { formatNumber } from "~utils/formatMoney";
import { computed, reactive, ref, watch, onMounted, nextTick } from "vue";
const props = defineProps({
  dataTestid: {
    type: String,
    default: null,
  },
  modelValue: String,
  disabled: Boolean,
  prefix: String,
  isBorderless: Boolean,
  rounded: Boolean,
  theme: {
    type: String,
    default: "default",
  },
  suffix: String,
  formatter: Function,
  parser: Function,
  numberFormat: {
    type: Boolean,
    default: false,
  },
  decimalDigits: {
    type: Number,
    default: 2,
  },
  placeholder: {
    type: String,
  },
  numberFormatter: Function,
  allowCalculator: Boolean,
});

const themes = {
  primary: {
    normal: "text-gray-700",
    focus: "border-primary ring-primary",
  },
  secondary: {
    normal: "text-gray-700",
    focus: "border-secondary ring-secondary",
  },
  success: {
    normal: "text-gray-700",
    focus: "border-success ring-success",
  },
  danger: {
    normal: "text-gray-700",
    focus: "border-danger ring-danger",
  },
  warning: {
    normal: "text-gray-700",
    focus: "border-warning ring-warning",
  },
  info: {
    normal: "text-gray-700",
    focus: "border-info ring-info",
  },
  default: {
    normal: "text-gray-700",
    focus: "border-indigo-300 ring-indigo-200",
  },
};

const emit = defineEmits([
  "update:modelValue",
  "change",
  "focus",
  "blur",
  "mouseover",
  "mouseleave",
]);

const state = reactive({
  isFocused: false,
  isMouseover: false,
});

const inputRef = ref();
const focus = () => {
  inputRef.value?.focus();
};

const blur = () => {
  inputRef.value.blur();
};

watch(
  () => props.modelValue,
  (value) => {
    if (parseEmit(value) !== parseEmit(inputRef.value.value)) {
      inputRef.value.value = parseEmit(value);
    }
  }
);

onMounted(() => {
  nextTick(() => {
    emit("update:modelValue", parseEmit(props.modelValue));
  })
});

const parseEmit = (value: string) => {
  if (props.numberFormat) {
    return value?.replaceAll?.(",", "");
  }
  return value;
}

const onInput = (evt) => {
  emit("update:modelValue", parseEmit(evt.target.value));
  emit("change", parseEmit(inputRef.value.value));
};

const onFocus = (evt) => {
  state.isFocused = true;
  emit("focus", evt);
};

const onMouseLeave = (evt) => {
  state.isMouseover = false;
  emit("mouseleave", evt);
};

const onMouseOver = (evt) => {
  state.isMouseover = false;
  emit("mouseover", evt);
};

const onBlur = (evt) => {
  state.isFocused = false;
  emit("blur", evt);
};

defineExpose({
  focus,
  blur,
  inputRef,
});

const inputClasses = computed(() => {
  const theme = themes[props.theme] || themes.default;
  const disabledClasses = props.disabled ? "cursor-not-allowed opacity-50" : "";
  const focusClasses = state.isFocused
    ? `ring-indigo-200 ring-opacity-50 ${theme.focus}`
    : "";
  const borderClasses = props.isBorderless
    ? "border-none"
    : "border border-gray-300";
  const formClasses = props.rounded ? "rounded-md" : "";

  return [
    disabledClasses,
    focusClasses,
    borderClasses,
    formClasses,
    theme.normal,
  ];
});

const defaultFormatter = (value: number) => {
  return formatNumber(value, {
    style: "decimal",
    minimumFractionDigits: props.decimalDigits,
    maximumFractionDigits: props.decimalDigits,
  });
};
const formattedValue = computed(() => {
  const value = props.modelValue;
  const formatter = props.formatter;
  const parser = props.parser;
  const numberFormat = props.numberFormat;
  const numberFormatter = props.numberFormatter;

  let formatted = value;
  if (formatter) {
    formatted = formatter(value);
  }

  if (parser) {
    formatted = parser(value);
  }

  if (numberFormat && (numberFormatter || defaultFormatter)) {
    const formatter = numberFormatter || defaultFormatter;
    formatted = formatter(value);
  }

  return state.isFocused ? value : formatted;
});
</script>

<template>
  <div
    ref="inputWrapper"
    class="flex w-full h-10 overflow-hidden shadow-sm focus:ring focus:ring-opacity-50"
    :class="inputClasses"
    @click="focus"
  >
    <slot
      name="prefix"
      v-if="prefix || $slots.prefix"
      :is-focused="state.isFocused"
      :is-mouseover="state.isMouseover"
    >
      <div class="flex items-center justify-center w-4 h-full px-2">
        {{ prefix }}
      </div>
    </slot>
    <input
      ref="inputRef"
      v-bind="$attrs"
      :value="formattedValue"
      :disabled="disabled"
      :data-testid="dataTestid"
      class="w-full h-full px-2 focus:outline-none"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @mouseover="onMouseOver(true)"
      @mouseleave="onMouseLeave(false)"
    />
    <slot
      name="suffix"
      v-if="suffix || $slots.suffix"
      :is-focused="state.isFocused"
      :is-mouseover="state.isMouseover"
    >
      <div class="flex items-center justify-center w-4 h-full px-2">
        {{ suffix }}
      </div>
    </slot>
  </div>
</template>
