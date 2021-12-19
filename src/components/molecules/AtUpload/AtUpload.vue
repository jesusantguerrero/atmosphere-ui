<template>
     <Upload 
        v-slot="{ openModal, hasFiles, uploadFiles, onRemoved, list, uploading }"
        v-bind="$props" 
        v-on="$props" 
        :http-request="httpRequest" class="px-5" ref="fileInput" 
      >
    
        <div>
          <AtButton @click="openModal" type="primary">Upload file </AtButton>
          <ul v-if="list">
            <li v-for="file in list"> {{ file && file.name }} </li>
          </ul>
           <AtButton @click="uploadFiles()" :disabled="uploading" type="primary">Submit {{ uploading }}</AtButton>
        </div>
      </Upload>
</template>

<script lang="ts" setup>
import { Upload } from "../../_core/AtBareUpload/AtBareUpload";
import AtButton from "../../atoms/AtButton/AtButton.vue";

import {
  computed,
  provide,
  ref,
  toRefs,
  unref,
  watch,
  PropType,
} from 'vue';

import { uploadProps, IUploadFile } from '../../../utils/useUpload';
const props = defineProps({
  modelValue: {
    type: Array as PropType<IUploadFile[]>,
    required: true,
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  ...uploadProps,
});

const emit = defineEmits(['update:modelValue', 'submit', 'error', 'update:isUploading'])

</script>
