import AuthForm from '../../organisms/AtAuthForm/AtAuthForm.vue';
import AuthFormGroup from '../../molecules/AtFormGroup/AtFormGroup.vue';
import AuthInput from '../../atoms/AtInput/AtInput.vue';
import AuthTemplate from '../../templates/AtAuthBox/AtAuthBox.vue';

export default {
  title: 'Templates/AtAuthBox',
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
  linkClass: 'text-blue-500 hover:text-blue-600'
};

export const ForgotPassword = (args) => ({
  components: { AuthForm, AuthFormGroup, AuthInput, AuthTemplate},
  setup() {
    return { args };
  },
  template: `<auth-template v-bind="args">
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
  linkClass: 'text-blue-500 hover:text-blue-600',
  mode: 'register',
  hideLink: true
}

export const WithBackgroundImage = Template.bind({});
WithBackgroundImage.args = {
  form: {
    email: ''
  },
  backgroundImage: "http://neatlancer.test/images/background.jpg?9b8e89da443fac46097bbe70d87d01bc",
  linkClass: 'text-blue-500 hover:text-blue-600',
  hideLink: true
}