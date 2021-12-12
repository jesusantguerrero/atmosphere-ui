<template>
  <div>
    <input ref="fileInput" type="file" :accept="accept" hidden @change="onChange" />
    <slot
      :open-modal="openModal"
      :has-files="hasFiles"
      :on-removed="onRemoved"
      :list="list"
      :uploading="isUploadingLocal"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  provide,
  ref,
  toRefs,
  unref,
  watch,
} from 'vue';
import { useUpload, mergeConfig, uploadProps } from '../../../utils/useUpload';
const props = defineProps({
  value: {
      type: Array,
      required: true,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    ...uploadProps,
})

const emit = defineEmits(['input', 'submit', 'error', 'update:isUploading'])

const fileInput = ref<HTMLInputElement>();
const hasFiles = computed(() => {
  const hasFiles = props.value && props.value.length;
  return Boolean(hasFiles);
});

const openModal = () => {
  fileInput.value?.click();
};

const onChange = (e: any) => {
  addFile(e.target.files[0]);
};

const addFile = (newFiles: File[]) => {
  const files = [...props.value];
  newFiles.forEach((file: File) => {
    files.push({
      raw: file,
      url: URL.createObjectURL(file),
      name: file.name,
    });
  });
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  emit('input', files);
};

const onRemoved = (index: number) => {
  const files = [...props.value];
  files.splice(index, 1);
  emit('input', files);
};

const list = computed(() => {
  return props.value.map((file) => {
    return {
      id: file?.id,
      name: file?.raw?.name || file.name,
      url: file.url,
      localURL: file.localURL,
    };
  });
});

// Remote upload state
const { value, httpRequest } = toRefs(props);
const config = mergeConfig(props);
const { uploadFiles, progress, isUploadingLocal } = useUpload(
  value,
  config,
  unref(httpRequest),
  emit
);

// upload state
watch(
  () => isUploadingLocal.value,
  (isUploading) => {
    if (props.isUploading !== isUploading) {
      emit("update:isUploading", isUploading)
    }
  }
);

watch(
  () => props.isUploading,
  (isUploading) => {
    if (isUploading !== isUploadingLocal.value) {
      isUploadingLocal.value = isUploading;
    }
  }, 
  { immediate: true }
);

provide('addFile', addFile);
</script>
