import { isLastDayOfMonth } from "date-fns";
//@ts-ignore
import { computed, ref, watch } from "vue";

interface Props {
  nextMode: string,
  initialDate: Date
} 

export const useDatePager = (props: Props) => {
  const nextMode = ref(props.nextMode);

  // Utils
  const getWeekDays = (date: Date): Array<Date> => {
    const firstDate = new Date(date.setDate(date.getDate() - 4));
    const selectedSpan: Array<Date> = [];
    for (let i = 0; i < 7; i++) {
      firstDate.setDate(firstDate.getDate() + 1);
      selectedSpan.push(new Date(firstDate));
    }
    return selectedSpan;
  };

  // state
  const firstDayOfWeek = ref(0);

  // Week
  const selectedSpan = ref(getWeekDays(new Date));

  const setDateSpan = ( value: Array<Date>): void => {
    selectedSpan.value = value || selectedSpan.value;
  };

  const getCalendarWeek = (date: Date) => {
    const firstDate = new Date(
      date.setDate(date.getDate() - date.getDay() + firstDayOfWeek.value)
    );
    const week = [new Date(firstDate)];
    while (
      firstDate.setDate(firstDate.getDate() + 1) &&
      firstDate.getDay() !== firstDayOfWeek.value
    ) {
      week.push(new Date(firstDate));
    }
    return week;
  };

  const getCalendarMonth = (date: Date) => {
    const firstDate = new Date(date.setDate(date.getDate() - (date.getDate() - 1)));
    const month = [new Date(firstDate)];
    while (!isLastDayOfMonth(firstDate)) {
      firstDate.setDate(firstDate.getDate() + 1);
      month.push(new Date(firstDate));
    }
    return month;
  };

  const getCalendar = (date: Date): Array<Date> => {
    const controls: { [ key: string ] : Function } = {
      "day": getWeekDays,
      "week": getCalendarWeek,
      "month": getCalendarMonth
    };
    const mode = nextMode.value || "week";
    return controls[mode](date);
  };

  const checkDateSpan = () => {
    selectedSpan.value = getCalendar(new Date());
  };

  watch(nextMode, checkDateSpan, { immediate: true });

  // Day
  const selectedDay = ref(props.initialDate || new Date());
  const setDay = (value: Date) => {
    selectedDay.value = value || selectedDay.value;
  };

  watch(() => selectedDay.value, () => {
    selectedSpan.value = getCalendar(selectedDay.value);
  })

  // controls
  const next = () => {
    const dayIndex = nextMode.value == "day" ? 3 : selectedSpan.value.length - 1;
    const date = new Date(selectedSpan.value[dayIndex].setDate(selectedSpan.value[dayIndex].getDate() + 1));
    selectedDay.value = date;
  };

  const previous = () => {
    const dayIndex = nextMode.value == "day" ? 3 : 0;
    const date = new Date(selectedSpan.value[dayIndex].setDate(selectedSpan.value[dayIndex].getDate() - 1));
    selectedDay.value = date;
  };

  checkDateSpan();

  return {
    // state
    selectedDay,
    selectedSpan,    
    startDate: computed(() => selectedSpan.value[0]),
    endDate: computed(() => selectedSpan.value[selectedSpan.value.length - 1]),

    // methods
    controls: {
      setDateSpan,
      setDay,
      previous,
      next
    }
  };
};