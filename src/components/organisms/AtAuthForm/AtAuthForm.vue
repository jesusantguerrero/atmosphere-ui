<template>
    <form @submit.prevent="loginUser()" @keydown.enter="loginUser()" class="text-white">
        <div class="flex items-center justify-center w-full mb-20 sm:pt-20">
            <div class="text-6xl text-center cursor-pointer brand-font" @click="$emit('home-pressed')">
                <slot name="brand">
                {{ appName }}
                </slot>
            </div>
        </div>

        <slot name="prependInput" />

        <slot name="content">
            <at-field field="email" label="Email">
                <at-input
                    v-model.trim="formData.email"
                    data-test-id="input-email"
                    required
                />
                <template #error>
                    <at-error-bag :errors="errors" field="email" />
                </template>
            </at-field>

            <at-field field="password" label="Password">
                <at-input
                    type="password"
                    data-test-id="input-password"
                    v-model="formData.password"
                    required
                />
                <template #error>
                    <at-error-bag :errors="errors" field="password"></at-error-bag>
                </template>
            </at-field>

            <at-field
                v-if="mode!='login'"
                label="Confirm Password"
                field="confirm_password"
            >
                <at-input
                    type="password"
                    data-test-id="input-confirm-password"
                    v-model="formData.confirmPassword"
                    @blur="isDirty=true"
                    :class="{ 'error-input': isConfirmationInvalid }"
                    required
                />
                <small v-if="isConfirmationInvalid" class="text-red-200"> Passwords are not equal </small>
                <at-error-bag :errors="errors" field="confirm_password"></at-error-bag>
            </at-field>
        </slot>

        <at-button
            class="w-full rounded-md"
            :class="btnClass"
            type="primary"
            data-test-id="btn-submit"
            :disabled="isConfirmationInvalid"
            @click="loginUser()"
        >
            {{ modeLabel }}
            <i v-if="isLoading" class="ml-2 fa fa-spinner fa-pulse"></i>
        </at-button>

        <div class="text-center" v-if="!hideLink">
                <div> {{ linkDescription }}
                <slot name="link">
                <a @click.prevent="$emit('link-pressed', mode)" class="font-bold cursor-pointer" :class="linkClass">
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
import AtButton from '../../atoms/AtButton/AtButton.vue';
import AtField from '../../atoms/AtField/AtField.vue';
import AtAuthInput from '../../atoms/AtAuthInput/AtAuthInput.vue';
import AtErrorBag from '../../atoms/AtErrorBag/AtErrorBag.vue';
import AtInput from '../../atoms/AtInput/AtInput.vue';

export default {
  components: { AtButton, AtAuthInput, AtField, AtErrorBag, AtInput },
  name: 'AuthForm',
  emits: {
      submit: null
  },
  props: {
      mode: {
        type: String,
        default: "login"
      },
      btnClass: {
          type: String,
          default: ""
      },
      linkClass: {
          type: String,
          default: ""
      },
      hideLink: {
          type: Boolean,
          default: false
      },
      appName: {
        type: String,
        default: "Atmosphere"
      },
      submitLabel: {
          type: String,
          default: ''
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      errors: {
          type: Object,
          default() {
              return {}
          }
      },
      isLoading: {
          type: Boolean,
          default: false
      },
      dark: {
          type: Boolean,
          default: false
      }
  },
  setup(props, { emit }) {
    const { mode, isLoading } = toRefs(props)
    const state = reactive({
        formData: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        currentYear: computed(() =>{
            const date = new Date();
            return date.getFullYear();
        }),

        modeLabel: computed(() => {
            if (props.submitLabel ) {
                return props.submitLabel
            }
            return mode.value == 'register' ? 'Sign Up' : 'Sign In';
        }),

        linkDescription: computed(() => {
            return mode.value == 'register' ? ' Already have an account?' : 'Dont have an account?';
        }),

        linkLabel: computed(() => {
            return mode.value == 'register' ? 'Login' : 'Create One';
        }),
          // validation
        isDirty: false,
        isConfirmationInvalid: computed(() => {
            return state.isDirty.value && mode.value == 'register' && state.formData.password != state.formData.confirmPassword;
        })
    })

    // auth manipulation

    const loginUser = () => {
        if (!validateRegistration()) {
            return
        }

        emit('submit', {...state.formData})
    }

    const validateRegistration = () => {
       if (mode.value == 'register' && state.formData.password != state.formData.confirmPassword) {

            return false
        }
        return true
    }

    provide('dark', props.dark)

    return {
        ...toRefs(state),
        mode,
        isLoading,
        loginUser,
    }
  }
}
</script>

<style lang="scss">
.form-group {
    margin: 15px 0;

    label {
        margin: 0.5rem 0;
    };

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
