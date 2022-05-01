import axios from 'axios';
import { watch, reactive, toRefs, unref, inject, Ref, PropType } from 'vue';
import { toFormData} from './useFormData';

type EmitFn = (...args: any[]) => void;

export type ProcessPayloadFunction = (data: Record<string, any>) => FormData;
export type HttpRequest = (files: File[], config?: UploadConfig) => Promise<any>;
export interface UploadConfig {
  headers: Record<string, string>;
  url?: string;
  isUploading: boolean;
  processPayload?: ProcessPayloadFunction;
  auto: boolean;
}

export interface IUploadProps {
  url?: string;
  headers: Record<string, string>;
  isUploading: boolean;
  httpRequest?: HttpRequest; 
  processPayload?: ProcessPayloadFunction;
  auto: boolean;
  multiple: boolean;
}

export type AddFileFunction = (files: FileList) => void;
export interface IUploadFile {
  raw: File;
  id?: string;
  url?: string;
  name?: string;
  localURL?: string;
}

const uploadRequest = (data: Record<string, any>, config: UploadConfig) => {
  let formData = toFormData({ files: data });
  // allow parent to format payload before sending the request
  if (config.processPayload) {
    formData = config.processPayload(data);
  }

  return axios({
    url: config.url,
    method: 'POST',
    data: formData,
    headers: {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadProps = {
  url: {
    type: String,
    default: '',
  },
  headers: {
    type: Object,
    default() {
      return {};
    },
  },
  isUploading: {
    type: Boolean,
    default: false,
  },
  httpRequest: {
    type: Function as PropType<HttpRequest>,
    default: null,
  },
  processPayload: {
    type: Function as PropType<ProcessPayloadFunction>,
    default: null,
  },
  auto: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
};

export const uploadConfig: UploadConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  processPayload: undefined,
  url: '',
  isUploading: false,
  auto: false,
};

const isValidConfigKey = (value: string, config: UploadConfig): value is keyof UploadConfig => {
  return value in config;
}

export const mergeConfig = (propsData: Record<string, any>) => {
  return Object.keys(uploadConfig).reduce((config, key) => {
    if (isValidConfigKey(key, config) && (propsData[key] !== undefined || propsData[key] !== null)) {
      /* @ts-expect-error */
      config[key] = propsData[key];
    }
    return config;
  }, uploadConfig);
};

export const useUpload = (value: Ref, config = uploadConfig, httpRequestMethod: HttpRequest, emit: EmitFn) => {
  const httpRequest = inject('httpFileRequest', httpRequestMethod  || uploadRequest);
  const state = reactive({
    progress: 0,
    isUploadingLocal: uploadConfig.isUploading,
  });

  watch(
    () => unref(value),
    (files) => {
      if (config.auto && files.length) {
        uploadFiles();
      }
    }
  );

  const updateIsUploading = (value: boolean) => {
    state.isUploadingLocal = value;
  };

  /**
   * Merge local urls with server one to prevent glitch
   * @param {*} localFiles - local generated url
   * @param {*} files - server generated url
   * @returns
   */
  const mergeResults = (localFiles: IUploadFile[], files: IUploadFile[]) => {
    return files.map((file, index) => {
      return {
        ...file,
        localURL: localFiles[index].url,
      };
    });
  };

  const uploadFiles = async () => {
    const files = unref<IUploadFile[]>(value);
    const filesToUpload = files.filter((file) => file.raw).map((file) => file);
    const rawFiles = filesToUpload.map((file) => file.raw);
    const uploadedFiles = files.filter((file) => file.id);

    if (!state.isUploadingLocal && rawFiles.length) {
      updateIsUploading(true);
      return await httpRequest(rawFiles, config)
        .then(({ data }) => {
          const results = [...uploadedFiles, ...mergeResults(filesToUpload, data)];
          emit && emit('submit', results);
          emit && emit('update:modelValue', results);
          updateIsUploading(false);
          return true;
        })
        .catch((error) => {
          emit && emit('error', error, rawFiles, files);
          updateIsUploading(false);
          return false;
        });
    }
    return false;
  };

  return {
    ...toRefs(state),
    uploadFiles,
  };
};

export const uploadTemplateProps = {
  label: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  buttonLabel: {
    type: String,
    default: '',
  },
  buttonMoreLabel: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
  hasFiles: {
    type: Boolean,
    default: false,
  },
  onRemoved: {
    type: Function,
    default: () => {},
  },
  openModal: {
    type: Function,
    default: () => {},
  },
  uploading: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
  errors: {
    type: Object,
    default() {
      return {};
    },
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  showAddMore: {
    type: Boolean,
    default: false,
  },
};

