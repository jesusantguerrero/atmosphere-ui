import AuthForm from "../../organisms/AtAuthForm/AtAuthForm.vue";
import AuthFormGroup from "../../molecules/AtFormGroup/AtFormGroup.vue";
import AuthInput from "../../atoms/AtInput/AtInput.vue";
import AuthTemplate from "../../templates/AtAuthBox/AtAuthBox.vue";

export default {
  title: "Templates/AtAuthBox",
  component: AuthForm,
};

const Template = (args) => ({
  components: { AuthForm, AuthTemplate },
  setup() {
    return { args };
  },
  template:
    '<auth-template v-bind="args"><auth-form v-bind="args" /></auth-template>',
});

const TemplateLight = (args) => ({
  components: { AuthForm, AuthTemplate },
  setup() {
    return { args };
  },
  template: `
   <AuthTemplate v-bind="args">
    <AuthForm v-bind="args">
      <template #brand>
        <img src="/logo.svg" class="w-96" />
      </template>
    </AuthForm>
  </AuthTemplate>`,
});

export const Default = Template.bind({});
Default.args = {};

export const Register = Template.bind({});
Register.args = {
  appName: "Atmosphere",
  mode: "register",
  linkClass: "text-blue-500 hover:text-blue-600",
};

export const ForgotPassword = (args) => ({
  components: { AuthForm, AuthFormGroup, AuthInput, AuthTemplate },
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
    email: "",
  },
  linkClass: "text-blue-500 hover:text-blue-600",
  mode: "register",
  btnLabel: "Send email",
  hideLink: true,
};

export const WithBackgroundImage = Template.bind({});
WithBackgroundImage.args = {
  form: {
    email: "",
  },
  backgroundImage:
    "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/11/1030_Earth_atmosphere_explainer.jpg",
  linkClass: "text-blue-500 hover:text-blue-600",
  hideLink: true,
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  form: {
    email: "",
  },
  errors: {
    email: "Email is required",
  },
  backgroundImage:
    "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/11/1030_Earth_atmosphere_explainer.jpg",
  linkClass: "text-blue-500 hover:text-blue-600",
  hideLink: true,
};

export const LightColors = TemplateLight.bind({});
LightColors.args = {
  form: {
    email: "",
  },
  theme: "light",
  linkClass: "text-blue-500 hover:text-blue-600",
  hideLink: true,
  brandContainerClass: "",
};

export const BackgroundSide = TemplateLight.bind({});
BackgroundSide.args = {
  form: {
    email: "",
  },
  theme: "light",
  linkClass: "text-blue-500 hover:text-blue-600",
  hideLink: true,
  brandContainerClass: "",
  backgroundImage:
    "https://www.sciencenewsforstudents.org/wp-content/uploads/2020/11/1030_Earth_atmosphere_explainer.jpg",
  backgroundPlacement: "right",
  boxClass: "bg-white rounded-md",
};
