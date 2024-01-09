import { useEffect, useState } from "react";
import { DEFAULT_MONTH_LABELS } from "@/assets/constants";
import {
  getAllActivities,
  getMonthLabels,
  groupByDays,
  groupDatesByWeeks,
} from "@/utils/contribution";

const Contribution = () => {
  const [datesByWeeks, setDatesByWeeks] = useState([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const allActivities = getAllActivities();
  const dayActivity = groupByDays(allActivities);
  const monthLabel = getMonthLabels(datesByWeeks, DEFAULT_MONTH_LABELS);

  useEffect(() => {
    const weeks = groupDatesByWeeks(allActivities);
    setDatesByWeeks(weeks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative py-5">
      <h2 className="font-bold mb-3 text-xl">Activities</h2>
      <table className="w-full p-8 border-spacing-1 border-separate shadow-md sm:rounded-lg">
        <thead className="text-xs text-gray-700">
          <tr>
            <th className="text-transparent text-left opacity-0">요일</th>
            {monthLabel.map(({ weekIndex, label }) => {
              return (
                <th
                  scope="col"
                  colSpan={weekIndex}
                  key={label}
                  className="text-left"
                >
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dayActivity.map((activities, index) => (
            <tr key={index}>
              <th className="text-xs w-8 text-left">{daysOfWeek[index]}</th>
              {activities.map((activity, index) => (
                <td
                  key={index}
                  data-date={activity}
                  className={`w-4 h-4 ${
                    activity == undefined ? "opacity-0" : "bg-[#F0F0EF]"
                  } justify-self-center rounded-tl-full rounded-br-full relative after:content-['|'] after:absolute after:left-[30%] after:rotate-[45deg] after:top-[10%] after:text-[#e3e4e2] after:font-thin  group`}
                >
                  <span className="hidden rounded-md group-hover:inline-block absolute text-xs z-10 w-max px-2 py-1 origin-center translate-x-[-50%] translate-y-[-130%] ml-2 bg-slate-950 text-white cursor-default before:content-[''] before:w-2 before:h-2 before:bg-slate-950 before:inline-block before:absolute before:top-[100%] before:left-[50%] before:rotate-45 before:origin-center before:translate-x-[-50%] before:translate-y-[-50%]">
                    {activity}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contribution;
