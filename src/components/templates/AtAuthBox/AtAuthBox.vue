<template>
  <div class="auth-box">
    <div
      class="login-box"
      ref="loginBox"
      :style="{ 'background-image': coverImage }"
    >
      <div
        class="z-10 w-full px-12 py-4 login-box__form md:w-1/2"
        :class="boxClass"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    boxClass: {
      type: String,
      default: "text-wite",
    },
    backgroundImage: {
      type: String,
    },
    theme: {
      type: String,
    },
  },
  setup(props) {
    const themes = {
      dark: {
        backgroundStart: "#3a4a73",
        backgroundEnd: "#1b243f",
        formText: "white",
        actionText: "white",
        actionBorder: "white",
      },
      light: {
        backgroundStart: "#ffffff",
        backgroundEnd: "#ffffff",
        formText: "#333",
        actionText: "#333",
        actionBorder: "#333",
      },
    };

    const currentTheme = themes[props.theme] ?? themes.dark;

    return {
      currentTheme,
      coverImage: computed(() => {
        return props.backgroundImage ? `url(${props.backgroundImage})` : "";
      }),
    };
  },
};
</script>
<style lang="scss" scoped>
.auth-box {
  --at-login-background-start: v-bind("currentTheme.backgroundStart");
  --at-login-background-end: v-bind("currentTheme.backgroundEnd");
  --at-login-form-text: v-bind("currentTheme.formText");
  --at-login-action-text: v-bind("currentTheme.actionText");
  --at-login-action-border: v-bind("currentTheme.actionBorder");
}

.login-body {
  background: #fdfdff;
  background-size: cover;
}

.login-box {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to left bottom,
    var(--at-login-background-start) 0,
    var(--at-login-background-end)
  );
  background-position: center;
  background-size: cover;
  background-size: cover;
  filter: blur(5px), grayscale(70%);
  position: relative;

  &::after {
    content: "";
    background: linear-gradient(
      to left bottom,
      var(--at-login-background-start) 0,
      var(--at-login-background-end)
    );
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    opacity: 0.65;
    left: 0;
    height: 100%;
  }

  &__form {
    color: var(--at-login-form-text);
    max-width: 450px;
    border-radius: 4px;
    z-index: 2;
  }

  .btn-action {
    width: 100%;
    color: var(--at-login-action-text);
    border: none;
    margin: 10px 0;
    transition: all ease 0.3s;
    border: 2px solid var(--at-login-action-border);
    height: 47px;
    font-weight: bold;
  }
}
</style>
