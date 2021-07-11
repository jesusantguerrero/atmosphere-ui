<template>
    <div class="px-5 py-5 text-left text-gray-600 border rounded">
        <h4 class="font-bold"> Recurrence Options</h4>
        <div class="flex mt-2 space-x-2">
            <span class="w-full mr-2 font-bold">Repeat</span> 
            <div class="w-40">
            </div>
            <simple-select 
                class="w-full focus:outline-none" 
                v-model="state.formData.frequency"
                :options="state.frequency"
            />
        </div>
        <div class="mt-2" v-if="state.formData.frequency == 'WEEKLY'">
            <span class="mt-5 font-bold">Repeat on:</span>
            <div class="flex space-x-2">
                <div 
                    v-for="day in state.days" 
                    :key="day"
                    class="px-2 py-1 text-xs border rounded-lg cursor-pointer"
                    :class="{'text-white bg-gray-700': state.formData.weekDays.includes(day)}"
                    @click="addDay(day)"
                >
                    {{ day }}
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="font-bold">
                Ends:
            </div>
            <at-date-picker
                class="mt-2 text-gray-400"
                v-model="state.formData.date"
            >
            </at-date-picker>
        </div>
        <div class="w-full space-x-3 text-right">
            <Button class="text-white bg-gray-400" @click="$emit('cancel')"> Cancel </Button>
            <Button class="text-white bg-green-400" @click="$emit('done', state.formData)"> Done </Button>
        </div>
    </div>
</template>

<script setup lang="ts" >
import { reactive } from "vue";
import Button from "../../atoms/AtButton/AtButton.vue";
import AtDatePicker from "../../organisms/AtDateSelect/AtDateSelect.vue";
import SimpleSelect from "../../third/SimpleSelect.vue";
    
const state = reactive({
    formData: {
        date: new Date(),
        interval: 1,
        frequency: 'DAILY',
        weekDays: []
        
    },
    frequency: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
    days: ['SU', 'MO','TU', 'WE', 'TH', 'FR' ,'SA'],
    endsOptions: ['date', 'occurrences']
})

const addDay = (day: string) => {
    const index = state.formData.weekDays.findIndex(weekDay =>weekDay == day);
    if (index == -1) {
        state.formData.weekDays.push(day);
    } else {
        state.formData.weekDays.splice(index, 1);
    }
}

</script>