<template>
    <div class="login-box" ref="loginBox" :style="{'background-image': coverImage}">
        <div class="z-10 w-full px-12 py-4 login-box__form md:w-1/2" :class="boxClass">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'

export default {
    props:{
        boxClass: {
            type: String,
            default: 'text-wite'
        },
        backgroundImage: {
            type: String,
        }
    },
    setup(props) {
        return {
            coverImage: computed(() => {
                return props.backgroundImage ? `url(${props.backgroundImage})` : '';
            })
        }
        
    },
}
</script>
<style lang="scss">

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
    background: linear-gradient(to left bottom,#3a4a73 0,#1b243f);
    background-position: center;
    background-size: cover;
    background-size: cover;
    filter: blur(5px), grayscale(70%);
    position: relative;

    &::after {
        content: "";
        background: linear-gradient(to left bottom,#3a4a73 0,#1b243f);
        display: block;
        position: absolute;
        width: 100%;
        top: 0;
        opacity: .65;
        left: 0;
        height: 100%;
    }

     &__form {
        color: white;
        max-width: 450px;
        border-radius: 4px;
        z-index: 2;
    }

    .btn-action {
        width: 100%;
        color: white;
        border: none;
        margin: 10px 0;
        transition: all ease 0.3s;
        border: 2px solid white;
        height: 47px;
        font-weight: bold;
    }
}
</style>