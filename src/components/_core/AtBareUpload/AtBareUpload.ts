import type { PropType } from "vue";
import {
  computed,
  provide,
  ref,
  toRefs,
  unref,
  watch,
  reactive,
  defineComponent,
  h,
} from "vue";

import { useUpload, mergeConfig, uploadProps } from "../../../utils/useUpload";
import type { IUploadFile } from "../../../utils/useUpload";

export const AtBareUpload = defineComponent({
  name: "AtBareUpload",
  emits: ["update:modelValue", "submit", "error", "update:isUploading"],
  props: {
    modelValue: { type: Array as PropType<IUploadFile[]>, required: true },
    accept: { type: String, default: "image/*" },
    ...uploadProps,
  },
  setup(props, { emit, slots }) {
    const fileInput = ref<HTMLInputElement>();

    // Remote upload state
    const { modelValue, httpRequest } = toRefs(props);
    const config = mergeConfig(props);
    const { isUploadingLocal, uploadFiles, progress } = useUpload(
      modelValue,
      config,
      unref(httpRequest),
      emit
    );

    const state = reactive({
      list: computed(() => {
        const list: IUploadFile[] = props.modelValue || [];
        return list.map((file: IUploadFile) => {
          return {
            id: file?.id,
            name: file?.raw?.name || file.name,
            url: file.url,
            localURL: file.localURL,
          };
        });
      }),
      hasFiles: computed(() => {
        const hasFiles = props.modelValue && props.modelValue.length;
        return Boolean(hasFiles);
      }),
      progress,
      uploading: isUploadingLocal,
    });

    const api = {
      openModal() {
        fileInput.value?.click();
      },

      addFile(newFiles: FileList) {
        const files = [...props.modelValue];
        Object.values(newFiles).forEach((file: File) => {
          files.push({
            raw: file,
            url: URL.createObjectURL(file),
            name: file.name,
          });
        });
        if (fileInput.value) {
          fileInput.value.value = "";
        }
        emit("update:modelValue", files);
      },

      onChange(e: any) {
        api.addFile(e.target.files);
      },

      onDropFile(e: DragEvent) {
        e.preventDefault();
        if (!props.multiple && state.list.length === 1) {
          return;
        }

        const files = e.dataTransfer?.files;
        if (files && files.length) {
          api.addFile(files);
        }
      },

      onRemoved(index: number) {
        const files = [...props.modelValue];
        files.splice(index, 1);
        emit("update:modelValue", files);
      },

      uploadFiles,
    };

    // upload state
    watch(
      () => isUploadingLocal.value,
      (isUploading) => {
        if (props.isUploading !== isUploading) {
          emit("update:isUploading", isUploading);
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

    provide("addFile", api.addFile);
    provide("uploadFiles", api.uploadFiles);
    provide("onDropFile", api.onDropFile);

    return () =>
      h("div", [
        h("input", {
          onChange: (e: Event) => api.onChange(e),
          hidden: true,
          ref: fileInput,
          type: "file",
        }),
        slots.default &&
          slots.default({
            ...api,
            list: state.list,
            hasFiles: state.hasFiles,
            progress: state.progress,
            uploading: state.uploading,
          }),
      ]);
  },
});