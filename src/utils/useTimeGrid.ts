import { computed , ref, Ref } from 'vue';
import { addMinutes, startOfDay } from "date-fns";
import { multiply, divide, unit } from "mathjs";

const pixelMinuteUnit = 0.9;

export const minutesToPixelsFunc = (minutes: number, defaultUnit = pixelMinuteUnit) => {
    return multiply(minutes, defaultUnit);
}

export const pixelsToMinutesFunc = (pixels: number, day: Date, defaultUnit = pixelMinuteUnit) => {
    const minutes = divide(pixels,  defaultUnit);
    const firstHour = startOfDay(day);
    return addMinutes(firstHour, minutes);
}

export const useTimeGrid = (minutes: Ref<number>, day: Ref<Date>, defaultMinuteUnit = ref(pixelMinuteUnit)) => {
    const pixelMinutes = computed(() => {
        return multiply(minutes.value || 0, defaultMinuteUnit.value).toFixed(2);
    });
    
    const minutesPixels = computed(() => {
        const minutes = divide(unit(pixelMinutes.value),  defaultMinuteUnit.value);
        const firstHour = startOfDay(day.value);
        return addMinutes(firstHour, minutes.toNumber());
    });

    return {
        pixelMinutes,
        minutesPixels,
        offset: minutes
    }
}