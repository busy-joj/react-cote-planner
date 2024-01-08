import {
  eachDayOfInterval,
  formatISO,
  nextDay,
  getDay,
  parseISO,
  subWeeks,
  differenceInCalendarDays,
} from "date-fns";
import { useEffect, useState } from "react";

const Contribution = () => {
  const [activities, setActivities] = useState([]);

  const weekStart = 0; // 시작은 sunday
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 지난 52주 날짜 구하기
  const generateDate = () => {
    const today = new Date();
    const days = eachDayOfInterval({
      start: subWeeks(today, 52),
      end: today,
    });

    return days.map((day) => formatISO(day, { representation: "date" }));
  };

  // 지난 52주 날짜 주차별 구분
  const groupByWeeks = () => {
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

    const numberOfWeeks = Math.ceil(allActivities.length / 7);
    return Array(numberOfWeeks)
      .fill(undefined)
      .map((_, weekIndex) =>
        allActivities.slice(weekIndex * 7, weekIndex * 7 + 7)
      );
  };

  useEffect(() => {
    const weeks = groupByWeeks();
    setActivities(weeks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative py-5">
      <h2 className="font-bold mb-3 text-xl">Activities</h2>
      <div className="grid grid-cols-[repeat(54, 1fr)] grid-flow-col-dense gap-1 m-auto shadow-md p-8 sm:rounded-lg">
        <div className="grid w-8 text-xs leading-4 grid-rows-[repeat(7,1fr)]">
          {daysOfWeek.map((week) => (
            <span key={week}>{week}</span>
          ))}
        </div>

        {activities.map((activity, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-rows-[repeat(7,1fr)] place-content-start"
          >
            {activity.map((activityValue, dayIndex) => (
              <span
                key={dayIndex}
                data-date={activityValue}
                className={`w-4 h-4 inline-block ${
                  activityValue == undefined ? "opacity-0" : "bg-[#F0F0EF]"
                } justify-self-center rounded-tl-full rounded-br-full relative after:content-['|'] after:absolute after:left-[30%] after:rotate-[45deg] after:top-[10%] after:text-[#e3e4e2] after:font-thin overflow-hidden`}
              >
                {/* {activityValue} */}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contribution;
