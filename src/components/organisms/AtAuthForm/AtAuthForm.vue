<template>
  <form
    @submit.prevent="loginUser()"
    @keydown.enter="loginUser()"
    class="text-white"
  >
    <div class="flex items-center justify-center w-full mb-20 sm:pt-20">
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
      <AtField field="email" label="Email">
        <AtInput
          v-model.trim="formData.email"
          data-testid="input-email"
          required
        />
        <template #error>
          <AtErrorBag :errors="errors" field="email" />
        </template>
      </AtField>

      <AtField field="password" label="Password">
        <AtInputPassword
          data-testid="input-password"
          class="bg-white"
          v-model="formData.password"
          required
        />
        <template #error>
          <AtErrorBag :errors="errors" field="password" />
        </template>
      </AtField>

      <AtField
        v-if="mode != 'login'"
        label="Confirm Password"
        field="confirm_password"
      >
        <AtInputPassword
          data-testid="input-confirm-password"
          class="bg-white"
          v-model="formData.confirmPassword"
          @blur="isDirty = true"
          :class="{ 'error-input': isConfirmationInvalid }"
          required
        />
        <small v-if="isConfirmationInvalid" class="text-red-200">
          {{ passwordNotEqualLabel }}
        </small>
        <AtErrorBag :errors="errors" field="confirm_password" />
      </AtField>
    </slot>

    <AtButton
      class="w-full"
      :class="btnClass"
      type="primary"
      data-testid="btn-submit"
      :disabled="isConfirmationInvalid"
      @click.stop.prevent="loginUser()"
    >
      {{ modeLabel }}
      <i v-if="isLoading" class="ml-2 fa fa-spinner fa-pulse"></i>
    </AtButton>

    <div class="text-center" v-if="!hideLink">
      <div>
        {{ linkDescription }}
        <slot name="link">
          <a
            @click.prevent="$emit('link-pressed', mode)"
            class="font-bold cursor-pointer"
            :class="linkClass"
          >
            {{ linkLabel }}
          </a>
        </slot>
      </div>
    </div>

    <p class="pt-10 text-center">&copy; {{ currentYear }}</p>
  </form>
</template>

<script>
import { reactive, computed, toRefs, provide } from "vue";
import AtButton from "../../atoms/AtButton/AtButton.vue";
import AtField from "../../atoms/AtField/AtField.vue";
import AtErrorBag from "../../atoms/AtErrorBag/AtErrorBag.vue";
import AtInput from "../../atoms/AtInput/AtInput.vue";
import AtInputPassword from "../../molecules/AtInputPassword/AtInputPassword.vue";

export default {
  components: {
    AtButton,
    AtField,
    AtErrorBag,
    AtInput,
    AtInputPassword,
  },
  name: "AuthForm",
  emits: {
    submit: null,
  },
  props: {
    mode: {
      type: String,
      default: "login",
    },
    btnClass: {
      type: String,
      default: "",
    },
    linkClass: {
      type: String,
      default: "",
    },
    hideLink: {
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
    passwordNotEqualLabel: {
      type: String,
      default: "Passwords are not equal",
    },
  },
  setup(props, { emit }) {
    const { mode, isLoading } = toRefs(props);
    const state = reactive({
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      currentYear: computed(() => {
        const date = new Date();
        return date.getFullYear();
      }),

      modeLabel: computed(() => {
        if (props.submitLabel) {
          return props.submitLabel;
        }
        return mode.value == "register" ? "Sign Up" : "Sign In";
      }),

      linkDescription: computed(() => {
        return mode.value == "register"
          ? " Already have an account?"
          : "Dont have an account?";
      }),

      linkLabel: computed(() => {
        return mode.value == "register" ? "Login" : "Create One";
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

    // auth manipulation

    const loginUser = () => {
      if (!validateRegistration()) {
        return;
      }

      emit("submit", {
        ...state.formData,
        confirmPassword:
          mode.value == "register" ? state.formData.confirmPassword : undefined,
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

    return {
      ...toRefs(state),
      mode,
      isLoading,
      loginUser,
    };
  },
};
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
      @apply shadow-sm;
      @apply border-2;
      @apply border-red-300;
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
