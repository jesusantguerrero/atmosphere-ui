<script lang="ts" setup>
import { computed, inject, ref } from "vue";
import { isSamePath } from "../../../utils";

const props = withDefaults(
  defineProps<{
    to: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    icon: string | Object;
    label: string;
    name: string;
    classes: string;
    itemClass?: string;
    itemActiveClass?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    isActiveFunction?: Function | null;
  }>(),
  {
    classes: "nav-link",
  }
);

const isExpanded = inject("isExpanded", true);
</script>

<template>
  <div v-if="isExpanded">
    <div  class="flex-col w-full text-left item group">
        <p> Cuentas</p>
        <ul class="hidden group-hover:flex-col group-hover:flex">
          <li>Cuenta 1</li>
          <li>Cuenta 2</li>
          <li>Cuenta 3</li>
          <li>Cuenta 4</li>
        </ul>  
    </div>
  </div>
</template>
