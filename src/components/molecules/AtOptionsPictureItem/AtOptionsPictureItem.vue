<template>
    <div>
        <label for="" v-if="label" class="text-sm font-medium">
            {{ label }} #{{ index + 1 }}</label
        >
        <div
            class="flex flex-col justify-between px-2 bg-transparent border border-gray-200 rounded-md "
        >
            <div class="object-center pt-2 mb-2 overflow-hidden border border-red-500 rounded-md avatar-uploader">
                <img v-if="item.imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div class="flex items-center w-full">
                <i
                    class="mr-2 opacity-0 fa fa-arrows-alt checklist-item__move handle"
                    v-if="allowMove"
                ></i>
                <input
                    class="w-full h-8 bg-transparent border-none focus:outline-none"
                    :disabled="!allowEdit"
                    v-model="item.label"
                />
            </div>

            <button class="w-5">
                <i
                    class="text-gray-400 opacity-0 cursor-pointer fa fa-trash checklist-item__delete hover:text-red-300"
                    @click="deleteItem(index)"
                ></i>
            </button>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
export default {
    props: {
        item: Array,
        index: Number,
    },
    setup(props, { emit }) {
        const deleteItem = (index) => {
            props.items.splice(index, 1);
        };

        const formImages = inject('formImages', [])

        return {
            formImages,
            imageUrl: computed(() => {
                const savedImage = typeof props.item.image == 'string' && formImages.find(image => image.name == props.item.image);
                return  savedImage ? `/storage/${savedImage.url}` : props.item.imageUrl;
            }),
            deleteItem,
        };
    },
};
</script>

<style>
.avatar-uploader  {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: fit-content;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
