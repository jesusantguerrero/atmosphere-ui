import AuthForm from './AtAuthForm.vue';
import AuthFormGroup from '../../molecules/AtFormGroup/AtFormGroup.vue';
import AuthInput from '../../molecules/AtAuthInput/AtAuthInput.vue';
import AuthTemplate from '../../templates/AtAuthBox/AtAuthBox.vue';

export default {
  title: 'Organisms/AuthForm',
  component: AuthForm,
};

const Template = (args) => ({
  components: { AuthForm, AuthTemplate },
  setup() {
    return { args };
  },
  template: '<auth-template><auth-form v-bind="args" /></auth-template>',
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
  components: { AuthForm, AuthFormGroup, AuthInput, AuthTemplate},
  setup() {
    return { args };
  },
  template: `<auth-template>
      <auth-form v-bind="args">
      <template #content>
        <p> {{ description }}</p>
        <auth-form-group label="Email">
            <auth-input v-model="args.form.email" required type="email" />
        </auth-form-group>
      </template>
    </auth-form>
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