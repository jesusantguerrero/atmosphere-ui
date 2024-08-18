<script lang="ts" setup>
import AtButton from "~atoms/AtButton/AtButton.vue";

withDefaults(
  defineProps<{
    iconClass: string;
    title: string;
    description: string;
    body: string;
    actionButtonText: string;
    footerNote: string;
  }>(),
  {
    iconClass: "fas fa-mobile-alt",
  }
);
</script>

<template>
  <div class="card-action">
    <p class="card-action__icon text-primary">
      <i :class="iconClass" />
    </p>
    <p class="card-action__title text-primary">
      {{ title }}
    </p>
    <p class="card-action__description">
      {{ description }}
    </p>
    <div class="card-action__body">
      {{ body }}
    </div>

    <AtButton
      class="text-white bg-primary card-action__action"
      rounded
      @click="$emit('action')"
    >
      {{ actionButtonText }}
    </AtButton>
    <div v-if="footerNote" class="card-action__footer">
      <span class="footer-title">Note:</span>
      {{ footerNote }}
    </div>
  </div>
</template>

<style lang="scss">
.card-action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  &__icon {
    margin: 100px 0 30px 0;
    padding: 0 0 0 0;
    font-size: 54px;
  }

  &__title {
    font-weight: 600;
    font-size: 26px;
    margin: 0;
  }

  &__description {
    color: #707070;
    font-weight: 500;
    font-size: 21px;
    margin: 0;
  }

  &__body {
    color: #cdcdcd;
    font-weight: 500;
    font-size: 18px;
    margin-top: 15px;
    width: 452px;
    text-align: center;
  }

  &__action {
    margin: 157px 0 40px 0;
    height: 49px;
    min-width: 177px;
  }

  &__footer {
    max-width: 374px;
    color: #9b9b9b;
    font-size: 12px;
    text-align: center;
    .footer-title {
      color: #8582d1;
      font-weight: 600;
    }
  }
}
</style>
