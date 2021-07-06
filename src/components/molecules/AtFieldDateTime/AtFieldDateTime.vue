<template>
    <div class="">
        <input v-model="date" :time="includesTime" type="date"/>
        <input v-model="time" v-if="includeTime" :time="includesTime" type="time"/>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            required: true
        },
        includeTime: {
            type: Boolean,
            default: false,
        },
        time: {
            type: Date,
            required: false,
        },
    },
    emits: ['update:modelValue', 'update:time'],
    setup() {
        
    },
}
</script>