<template>
    <div
        class="flex px-5 py-10 mx-2 mb-5 bg-white rounded-md shadow-md">
        <div class="w-4/12">
            <div class="mx-auto">
                <div class="prose prose-xl">
                    <h5 class="mb-2"> Plan Details</h5>
                    <div class="text-3xl">
                        <span class="font-bold text-purple-600">
                            {{ name }}
                        </span>

                        <div class="text-2xl font-bold text-gray-400">
                            Your plan information
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-4/12 text-center">
            <div
                class="px-5 py-2 mx-auto my-2 prose prose-xl rounded-md"
            >
            <div v-if="trials_ends_at">
                <h4 > Days left </h4>
                <p>
                    {{ trials_ends_at }}
                </p>
            </div>

                <div class="mt-10 mb-2">
                    <h5 class="font-bold"> Plan Details</h5>
                    <p class="text-gray-400 text-2x1">
                        <span> <i class="fa fa-users"></i> 1 member(s) </span>
                        <span class="ml-2"> <i class="fa fa-users"></i> 1 team(s) </span>
                    </p>
                </div>
            </div>
        </div>

        <div class="w-4/12 space-x-3 text-center">
            <at-button
                type="secondary"
                class="font-bold"
                v-if="status == 'active'"
                @click="$emit('suspend')"
            >
                Suspend
            </at-button>
            <at-button
                type="success"
                class="font-bold"
                v-if="status == 'suspended'"
                @click="$emit('reactivate')"
            >
                Reactivate
            </at-button>
            <at-button
                type="danger"
                class="font-bold"
                v-if="['active', 'suspended'].includes(status)"
                @click="$emit('cancel')"
            >
                cancel
            </at-button>
        </div>
    </div>
</template>

<script setup>
import AtButton from "../../atoms/AtButton/AtButton.vue";

defineProps({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    trials_ends_at: {
        type: Number
    }
});

defineEmits(['cancel', 'reactivate', 'suspend'])
</script>
