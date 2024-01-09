import {
  eachDayOfInterval,
  formatISO,
  nextDay,
  getDay,
  parseISO,
  subWeeks,
  differenceInCalendarDays,
  subDays,
  getMonth,
} from "date-fns";

// 지난 52주 날짜 구하기
export const generateDate = () => {
  const today = new Date();
  const days = eachDayOfInterval({
    start: subDays(today, 365),
    end: today,
  });

  return days.map((day) => formatISO(day, { representation: "date" }));
};

// 365일 배열 만들기
export const getAllActivities = () => {
  const weekStart = 0; // 시작은 sunday
  const normalizedActivities = generateDate();
  const firstDay = parseISO(normalizedActivities[0]);
  const firstCalendarDate =
    getDay(firstDay) === weekStart
      ? firstDay
      : subWeeks(nextDay(firstDay, weekStart), 1);
  const allActivities = [
    ...Array(differenceInCalendarDays(firstDay, firstCalendarDate)).fill(
      undefined
    ),
    ...normalizedActivities,
  ];
  return allActivities;
};

// 지난 52주 날짜 주차별 구분
export const groupDatesByWeeks = (array) => {
  const numberOfWeeks = Math.ceil(array.length / 7);
  return Array(numberOfWeeks)
    .fill(undefined)
    .map((_, weekIndex) => array.slice(weekIndex * 7, weekIndex * 7 + 7));
};

// 지난 52주 날짜 요일별 구분
export const groupByDays = (array) => {
  const arr = [];
  array.map((day, index) => {
    if (day === undefined) {
      arr[index] = Array(1).fill(undefined);
    } else {
      if (arr[getDay(day)] === undefined) {
        arr[getDay(day)] = [];
      }
      arr[getDay(day)].push(day);
    }
  });
  return arr;
};

// 월별 위치 파악 함수
export const getMonthLabels = (weeks, monthNames) => {
  const monthLabels = weeks
    .reduce((labels, week, weekIndex) => {
      const firstActivity = week.find((activity) => activity !== undefined);
      const month = monthNames[getMonth(firstActivity)];
      const prevLabel = labels[labels.length - 1];
      if (weekIndex === 0 || prevLabel.label !== month) {
        return [...labels, { weekIndex, label: month }];
      }
      return labels;
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      const minWeeks = 3;
      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
      }
      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }
      return true;
    });
  monthLabels.forEach((_, index) => {
    if (index > 0) {
      monthLabels[index - 1].weekIndex =
        monthLabels[index].weekIndex - monthLabels[index - 1].weekIndex;
    }
    if (index === monthLabels.length - 1) {
      monthLabels[index].weekIndex = 52 - monthLabels[index].weekIndex;
    }
  });
  return monthLabels;
};
