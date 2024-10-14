<template>
  <form @submit.prevent="loginUser()">
    <div class="flex items-center justify-center w-full" :class="brandContainerClass">
      <div
        class="text-6xl text-center cursor-pointer brand-font"
        @click="$emit('home-pressed')"
      >
        <slot name="brand">
          {{ appName }}
        </slot>
      </div>
    </div>
    <slot name="prependInput" />

    <slot name="content">
      <component :is="AtField" field="email" label="Email">
        <component
          :is="AtInput"
          v-model.trim="formData.email"
          v-bind="getFieldConfig('email')"
          data-testid="input-email"
          required
        />
        <template #error>
          <AtErrorBag :errors="errors" field="email" />
        </template>
      </component>

      <component :is="AtField" field="password" label="Password" :errors="errors">
        <component
          :is="AtInputPassword"
          data-testid="input-password"
          class="bg-white"
          required
          v-model="formData.password"
          @keydown.enter.stop="loginUser()"
        />
      </component>

      <component
        :is="AtField"
        v-if="mode != 'login'"
        label="Confirm Password"
        field="confirm_password"
      >
        <component
          :is="AtInputPassword"
          data-testid="input-confirm-password"
          class="bg-white"
          v-model="formData.confirmPassword"
          required
          :class="{ 'error-input': isConfirmationInvalid }"
          :errors="errors"
          @blur="isDirty = true"
          @keydown.enter.stop="loginUser()"
        />
        <small v-if="isConfirmationInvalid" class="text-red-200">
          {{ passwordNotEqualLabel }}
        </small>
      </component>
    </slot>

    <slot name="action">
      <AtButton
        v-if="!hideAction"
        class="w-full"
        type="primary"
        data-testid="btn-submit"
        attr-type="button"
        :class="btnClass"
        :disabled="isConfirmationInvalid"
        @click.prevent.stop="loginUser()"
      >
        {{ modeLabel }}
        <i v-if="isLoading" class="ml-2 fa fa-spinner fa-pulse"></i>
      </AtButton>
    </slot>
    <slot name="more-actions" />

    <div class="text-center" v-if="!hideLink">
      <div>
        {{ linkDescription }}
        <slot name="link">
          <a
            class="font-bold cursor-pointer"
            :class="linkClass"
            @click.prevent="$emit('link-pressed', mode)"
          >
            {{ state.linkLabel }}
          </a>
        </slot>
      </div>
    </div>

    <p class="pt-10 text-center">&copy; {{ currentYear }}</p>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed, toRefs, provide, watch } from "vue";
import AtButton from "../../atoms/AtButton/AtButton.vue";
import AtField from "../../atoms/AtField/AtField.vue";
import AtErrorBag from "../../atoms/AtErrorBag/AtErrorBag.vue";
import AtInput from "../../atoms/AtInput/AtInput.vue";
import AtInputPassword from "../../molecules/AtInputPassword/AtInputPassword.vue";
import { watchOnce } from "@vueuse/core";

const emit = defineEmits({
  submit: null,
  "link-pressed": null,
  "home-pressed": null
});

const props = defineProps({
  mode: {
    type: String,
    default: "login",
  },
  brandContainerClass: {
    type: String,
    default: "mb-20 sm:pt-20",
  },
  btnClass: {
    type: String,
    default: "",
  },
  btnLabel: {
    type: String,
  },
  linkClass: {
    type: String,
    default: "",
  },
  hideLink: {
    type: Boolean,
    default: false,
  },
  hideAction: {
    type: Boolean,
    default: false,
  },
  appName: {
    type: String,
    default: "Atmosphere",
  },
  submitLabel: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Object,
    default() {
      return {};
    },
  },
  dark: {
    type: Boolean,
    default: false,
  },
  customLinkLabel: {
    type: String,
  },
  passwordNotEqualLabel: {
    type: String,
    default: "Passwords are not equal",
  },
  initialValues: {
    type: Object,
    default() {
      return {};
    },
  },
  config: {
    type: Object,
    default() {
      return {};
    },
  },
});

const { mode, isLoading, initialValues } = toRefs(props);

const state = reactive({
  formData: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  currentYear: new Date().getFullYear(),
  modeLabel: computed(() => {
    if (props.submitLabel) {
      return props.submitLabel;
    }
    return props.btnLabel ?? (mode.value == "register" ? "Sign Up" : "Sign In");
  }),

  linkDescription: computed(() => {
    return mode.value == "register"
      ? " Already have an account?"
      : "Don't have an account?";
  }),

  linkLabel: computed(() => {
    return props.customLinkLabel ?? (mode.value == "register" ? "Login" : "Create One");
  }),
  // validation
  isDirty: false,
  isConfirmationInvalid: computed(() => {
    return (
      state.isDirty.value &&
      mode.value == "register" &&
      state.formData.password != state.formData.confirmPassword
    );
  }),
});


const getFieldConfig = (field: string) => {
  return props.config?.[field] ?? {};
} 

watch(
  initialValues,
  (formValues) => {
    Object.keys(state.formData).forEach((key) => {
      const fieldConfig = props.config?.[key];
      let fieldName = key
      if (fieldConfig && state.formData[key] !== formValues[fieldConfig.mapper || key]) {
        fieldName = fieldConfig.mapper || key
      }

      state.formData[key] = formValues[fieldName] ?? "";
    });
  },
  {
    immediate: true,
    deep: true
  }
);

// auth manipulation

const loginUser = () => {
  if (!validateRegistration()) {
    return;
  }

  console.log("emitted login")

  emit("submit", {
    ...state.formData,
    ...(mode.value == "register"
      ? {
          confirmPassword: state.formData.confirmPassword,
        }
      : {}),
  });
};

const validateRegistration = () => {
  if (
    mode.value == "register" &&
    state.formData.password != state.formData.confirmPassword
  ) {
    return false;
  }
  return true;
};

provide("dark", props.dark);

const {
  formData,
  currentYear,
  modeLabel,
  linkDescription,
  isDirty,
  isConfirmationInvalid,
} = toRefs(state);
</script>

<style lang="scss">
.form-group {
  margin: 15px 0;

  label {
    margin: 0.5rem 0;
  }

  &--error {
    @apply text-red-400;
    input {
      @apply shadow-sm
      border-2
      border-red-300;
    }
  }
}

.form-control {
  @apply text-gray-400;
  @apply px-2;

  &:focus {
    outline: none;
  }
}
</style>
