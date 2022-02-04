import { computed , ref, Ref } from 'vue';
import { addMinutes, startOfDay } from "date-fns";
import exactMath from "exact-math";

const pixelMinuteUnit = 0.9;


export const minutesToPixelsFunc = (minutes: number, defaultUnit = pixelMinuteUnit) => {
    return exactMath.mul(minutes, defaultUnit);
}

export const pixelsToMinutesFunc = (pixels: number, day: Date, defaultUnit = pixelMinuteUnit) => {
    const minutes = exactMath.div(pixels,  defaultUnit);
    const firstHour = startOfDay(day);
    return addMinutes(firstHour, minutes);
}

export const useTimeGrid = (minutes: Ref<number>, day: Ref<Date>, defaultMinuteUnit = ref(pixelMinuteUnit)) => {
    const pixelMinutes = computed(() => {
        return exactMath.mul(minutes.value || 0, defaultMinuteUnit.value).toFixed(2);
    });
    
    const minutesPixels = computed(() => {
        const minutes = exactMath.div(pixelMinutes.value,  defaultMinuteUnit.value);
        const firstHour = startOfDay(day.value);
        return addMinutes(firstHour, minutes.value);
    });

    return {
        pixelMinutes,
        minutesPixels,
        offset: minutes
    }
}