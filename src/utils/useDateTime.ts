import {
    format,
    isToday,
    isTomorrow,
    isThisWeek,
    isThisYear,
    isDate,
    isYesterday,
} from "date-fns";
import { computed, ref } from "vue";
import type { Ref } from "vue";

export function useDateTime(dateRef: Ref<Date | null>) {
    const date = dateRef || ref(null);

    const formattedDate = computed(() => {
        return date.value && typeof date.value == "object"
            ? toISO(date.value)
            : date.value;
    });

    const humanDate = computed(() => {
        const isoDate =
            date.value && typeof date.value == "object"
                ? date.value
                : date.value;
        if (!isDate(isoDate)) {
            return isoDate;
        }

        return isoDate && getHumanDate(isoDate);
    });

    const getHumanDate = (isoDate: Date) => {
        if (isToday(isoDate)) {
            return "Today";
        } else if (isYesterday(isoDate)) {
            return "Yesterday";
        } else if (isTomorrow(isoDate)) {
            return "Tomorrow";
        } else if (isThisWeek(isoDate)) {
            return format(isoDate, "iiii");
        } else if (isThisYear(isoDate)) {
            return format(isoDate, "MMM dd");
        } else {
            return format(isoDate, "MMM dd yyyy");
        }
    };

    const formatDate = (date: Date, formatString: string = "yyyy-MM-dd") => {
        return format(date || new Date(), formatString || "yyyy-MM-dd");
    };

    const toISO = (date?: Date) => {
        return date ? format(date, "yyyy-MM-dd") : "";
    };

    const getDateFromString = (dateValue: string): Date | null => {
        const date: number[] | null = dateValue
            ? dateValue.split("-").map((n) => Number(n))
            : null;
        return date ? new Date(date[0], date[1] - 1, date[2]) : null;
    };

    return {
        formattedDate,
        toISO,
        formatDate,
        getDateFromString,
        date: date.value,
        humanDate,
        getHumanDate,
    };
}
export const isSameDate = (date1: Date, date2: Date) => {
    try {
        return (
            date1 &&
            date2 &&
            format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd")
        );
    } catch (e) {
        return false;
    }
};
