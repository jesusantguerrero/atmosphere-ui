import LoginForm from '../../../components/organisms/auth/LoginForm.vue';
import AuthFormGroup from '../../../components/molecules/auth/AuthFormGroup.vue';
import AuthInput from '../../../components/molecules/auth/AuthInput.vue';
import AuthTemplate from '../../../components/templates/Auth.vue';

export default {
  title: 'Organisms/Auth/LoginForm',
  component: LoginForm,
};

const Template = (args) => ({
  components: { LoginForm, AuthTemplate },
  setup() {
    return { args };
  },
  template: '<auth-template><login-form v-bind="args" /></auth-template>',
});

export const Default = Template.bind({});
Default.args = {};

export const Register = Template.bind({});
Register.args = {
  appName: 'Atmosphere Ui',
  mode: 'register',
  btnClass: 'bg-blue-500 hover:bg-blue-600 text-white',
  linkClass: 'text-blue-500 hover:text-blue-600'
};

export const ForgotPassword = (args) => ({
  components: { LoginForm, AuthFormGroup, AuthInput, AuthTemplate},
  setup() {
    return { args };
  },
  template: `<auth-template>
      <login-form v-bind="args">
      <template #content>
        <p> {{ description }}</p>
        <auth-form-group label="Email">
            <auth-input v-model="args.form.email" required type="email" />
        </auth-form-group>
      </template>
    </login-form>
  </auth-template>`,
});

ForgotPassword.args = {
  form: {
    email: ''
  },
  btnClass: 'bg-blue-500 hover:bg-blue-600 text-white',
  linkClass: 'text-blue-500 hover:text-blue-600',
  mode: 'register',
  hideLink: true
}

