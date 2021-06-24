<template>
  <form @submit.prevent="loginUser()" @keydown.enter="loginUser()">
      <div class="w-full flex justify-center items-center mb-20 sm:pt-20">
          <div class="text-6xl text-center brand-font cursor-pointer" @click="$emit('home-pressed')">
            <slot name="brand">
              {{ appName }}
            </slot>
          </div>
      </div>

    <slot name="prependInput">

    </slot>
    <slot name="content">
        <div
            class="form-group text-left"
        >
            <label for="email" class="inline-block mb-2">Email</label>
            <p :class="{ control: true }">
                <input
                    v-model.trim="formData.email"
                    data-test-id="input-email"
                    class="form-control input text-gray-400"
                    :class="{ 'border-red-400 border-2': false }"
                    name="email"
                    type="text"
                    required
                />
            </p>
            <error-bag :errors="errors" field="email"></error-bag>
        </div>

        <div
            class="form-group"
        >
            <label for="password" class="password-label"><span>Password</span></label
            >
            <p :class="{ control: true }">
                <input
                    type="password"
                    data-test-id="input-password"
                    v-model="formData.password"
                    class="form-control input text-gray-400"
                    :class="{ 'border-red-400 border-2': false }"
                    name="password"
                    required
                />
            </p>
            <error-bag :errors="errors" field="password"></error-bag>
        </div>

        <div
            class="form-group"
            v-if="mode!='login'"
        >
            <label for="password" class="password-label">
                <span>Confirm Password</span>
            </label>
            <p class="true">
                <input
                    type="password"
                    data-test-id="input-confirm-password"
                    v-model="formData.confirmPassword"
                    class="form-control input text-gray-400"
                    @blur="isDirty=true"
                    :class="{ 'error-input': isConfirmationInvalid }"
                    name="confirm-password"
                    required
                />
                <small v-if="isConfirmationInvalid" class="text-red-200"> Passwords are not equal </small>
            </p>
            <error-bag :errors="errors" field="confirm_password"></error-bag>
        </div>
       </slot>

        <button
            class="btn btn-action capitalize rounded-sm"
            :class="btnClass"
            type="button"
            data-test-id="btn-submit"
            :disabled="isConfirmationInvalid"
            @click="loginUser()"
        >
            {{ modeLabel }}
            <i v-if="isLoading" class="fa fa-spinner fa-pulse ml-2"></i>
        </button>

        <div class="text-center" v-if="!hideLink">
                <div> {{ linkDescription }}
                <slot name="link">
                <a @click.prevent="$emit('link-pressed', mode)" class="font-bold cursor-pointer" :class="linkClass">
                    {{ linkLabel }}
                </a>
                </slot>
            </div>
        </div>

      <p class="copyrights pt-10">&copy; {{ currentYear }}</p>
  </form>
</template>

<script>
import { reactive, ref, computed, toRefs } from "vue";
import ErrorBag from '../../atoms/ErrorBag.vue';

export default {
  components: { ErrorBag },
  name: 'LoginForm',
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
      }
  },
  setup(props, { emit }) {
    const { mode, isLoading } = toRefs(props)
    const formData = reactive({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const currentYear = computed(() =>{
        const date = new Date();
        return date.getFullYear();
    })

    const modeLabel = computed(() => {
        if (props.submitLabel ) {
            return props.submitLabel
        }
        return mode.value == 'register' ? 'Sign Up' : 'Sign In';
    })

    const linkDescription = computed(() => {
        return mode.value == 'register' ? ' Already have an account?' : 'Dont have an account?';
    })

    const linkLabel = computed(() => {
        return mode.value == 'register' ? 'Login' : 'Create One';
    })

    // validation
    const isDirty = ref(false)
    const isConfirmationInvalid = computed(() => {
        return isDirty.value && mode.value == 'register' && formData.password != formData.confirmPassword;
    })

    // auth manipulation

    const loginUser = () => {
        if (!validateRegistration()) {
            return
        }

        emit('submit', {...formData})
    }

    const validateRegistration = () => {
       if (mode.value == 'register' && formData.password != formData.confirmPassword) {

            return false
        }
        return true
    }

    return {
      mode,
      modeLabel,
      formData,
      loginUser,
      isConfirmationInvalid,
      isLoading,
      currentYear,
      linkDescription,
      linkLabel
    }
  }
}
</script>
