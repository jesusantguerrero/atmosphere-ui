<template>
    <div class="divide-y w-72">
        <div class="flex flex-wrap">
            <at-field-date-time v-model="date" :include-time="includesTime" />
            <at-field-date-time v-model="date" :include-time="includesTime"  v-if="includesEndDate"/>
        </div>
        <div>
            The date is {{ date }}
        </div>
        <div class="py-1 mt-2">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"><i class="fa fa-clock"></i> Remind</div>
        </div>
        <div class="py-2">
            <at-field-check label="Include end" v-model="includesEndDate" />
            <at-field-check label="Include time" v-model="includesTime" />
        </div>
        <div class="py-1">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100"><i class="fa fa-cog"></i> Date format &amp; timezone</div>
        </div>
        <div class="py-1">
            <div class="px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100">Clear</div>
        </div>
        <div class="py-1">
            <small class="inline-block w-full px-2 py-1 text-gray-500 cursor-pointer hover:bg-gray-100">
            <i class="fa fa-question-circle"></i> Learn more about reminders</small>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import AtFieldCheck from '../../molecules/AtFieldCheck/AtFieldCheck.vue'
import AtFieldDateTime from '../../molecules/AtFieldDateTime/AtFieldDateTime.vue'

export default {
    components: { AtFieldCheck, AtFieldDateTime },
    setup() {
        const state = reactive({
            date: new Date(),
            includesTime: false,
            includesEndDate: false,
        })
        return {
            ...toRefs(state)
        }
    },
}
</script>