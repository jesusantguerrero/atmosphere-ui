<template>
  <AtBareUpload
    v-slot="{ openModal, uploadFiles, list, uploading }"
    v-bind="$props"
    v-on="$props"
    :http-request="httpRequest"
    class="px-5"
    ref="fileInput"
  >
    <div>
      <AtButton @click="openModal()" type="primary">Upload file </AtButton>
      <ul v-if="list">
        <li v-for="file in list" :key="file.name">
          {{ file && file.name }}
        </li>
      </ul>
      <AtButton @click="uploadFiles()" :disabled="uploading" type="primary"
        >Submit {{ uploading }}
      </AtButton>
    </div>
  </AtBareUpload>
</template>

<script lang="ts" setup>
import { AtBareUpload } from "../../_core/AtBareUpload/AtBareUpload";
import AtButton from "../../atoms/AtButton/AtButton.vue";

import { PropType } from "vue";

import { uploadProps } from "../../../utils/useUpload";
import type { IUploadFile } from "../../../utils/useUpload";

defineProps({
  modelValue: {
    type: Array as PropType<IUploadFile[]>,
    required: true,
  },
  accept: {
    type: String,
    default: "image/*",
  },
  ...uploadProps,
});

defineEmits(["update:modelValue", "submit", "error", "update:isUploading"]);
</script>
