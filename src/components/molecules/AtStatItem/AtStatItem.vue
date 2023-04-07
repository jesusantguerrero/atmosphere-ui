<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  title: string;
  content: string;
  status: string;
}>();

const iconClass = computed(() => {
  const statusIcons = {
    success: "fas fa-angle-up",
    danger: "fas fa-angle-down",
  };
  return statusIcons[props.status] || "";
});
const iconColor = computed(() => {
  const statusIcons = {
    success: "#ABEA97",
    danger: "#FF8484",
  };
  return statusIcons[props.status] || "";
});
</script>

<template>
  <div ref="StatisticItem" class="statistic-item">
    <div class="statistic-item__title">
      {{ title }}
    </div>
    <div class="flex statistic-item__content status">
      {{ content }}

      <div v-if="status" class="ml-2 statistic-item__status" :class="iconColor">
        <i :class="iconClass" />
      </div>
    </div>
  </div>
</template>
s

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
    .footer-title {
      color: #8582d1;
      font-weight: 600;
    }
    max-width: 374px;
    color: #9b9b9b;
    font-size: 12px;
    text-align: center;
  }
}
</style>
