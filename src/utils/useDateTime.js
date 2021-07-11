import { format, isToday, isTomorrow, formatRelative, isThisWeek, isThisYear, isDate, isYesterday } from "date-fns";
import { computed, ref} from "vue";

export function useDateTime(dateRef) {
    const date = dateRef || ref(null)
    
    const formattedDate = computed(() => {
        return date.value && typeof date.value == 'object' ? toISO(date.value) : date.value;
    })

    const humanDate = computed(() => {
        const isoDate = date.value && typeof date.value == 'object' ? date.value : date.value;
        if (!isDate(isoDate)) {
            return isoDate;
        }
        if (isToday(isoDate)) {
            return 'Today';
        } else if (isYesterday(isoDate)) {
            return 'Yesterday';
        } else if (isTomorrow(isoDate)) {
            return 'Tomorrow';
        } else if (isThisWeek(isoDate)) {
            return format(date.value, 'iiii');
        } else if (isThisYear(isoDate)) {
            return format(isoDate, 'MMM dd')
        } else {
            return format(isoDate, 'MMM dd yyyy')
        }
    })

    const formatDate = (date, format) => {
       return DateTime.fromJSDate(date || new Date()).toFormat(format || "yyyy-MM-dd");
    }

    const toISO = (date) => {
       return date ? DateTime.fromJSDate(date).toISODate() :  ""
    }


    const getDateFromString = (dateValue) => {
        const date = dateValue ? dateValue.split("-") : null;
        return date ? new Date(date[0], date[1] - 1, date[2]) : null;
    }

    return {
        formattedDate,
        toISO,
        formatDate,
        getDateFromString,
        date: date.value,
        humanDate
    }
}
