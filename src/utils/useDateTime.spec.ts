import {
  addDays,
  format,
  isSunday,
  isWeekend,
  subDays,
  startOfDay,
  isSaturday,
  isFriday,
} from "date-fns";
import { ref } from "vue";
import { useDateTime } from "./useDateTime";
import { describe, it, expect } from "vitest";

describe("Test use date time", () => {
  const date = ref(new Date(2021, 6, 25));
  const {
    formattedDate,
    humanDate,
    formatDate,
    getDateFromString,
    getHumanDate,
  } = useDateTime(date);
  it("formats the date computed", () => {
    expect(formattedDate.value).toBe("2021-07-25");
  });

  it("formats date human readable computed", () => {
    expect(humanDate.value).toBe("Jul 25 2021");
  });

  it("formats human readable date function", () => {
    const date = startOfDay(new Date());
    const lastYear = new Date(2019, 11, 31);
    const thisWeek =
      !isFriday(date) && !isSaturday(date)
        ? addDays(date, 2)
        : subDays(date, 2);
    expect(getHumanDate(date)).toBe("Today");
    expect(getHumanDate(subDays(startOfDay(date), 1))).toBe("Yesterday");
    expect(getHumanDate(addDays(startOfDay(date), 1))).toBe("Tomorrow");
    expect(getHumanDate(thisWeek)).toBe(format(thisWeek, "iiii"));
    expect(getHumanDate(lastYear)).toBe(format(lastYear, "MMM dd yyyy"));
  });

  it("format date in ISO format", () => {
    expect(formatDate(date.value)).toBe("2021-07-25");
  });
  it("returns a date object from string", () => {
    const jsDate = getDateFromString("2021-07-25");
    expect(jsDate).toBeInstanceOf(Date);
    expect(formatDate(jsDate)).toBe("2021-07-25");
  });
});
