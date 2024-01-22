import { useEffect, useState } from "react";
import { compareAsc, differenceInDays, formatISO } from "date-fns";
import { DEFAULT_MONTH_LABELS } from "@/assets/constants";
import {
  getAllActivities,
  getMonthLabels,
  groupByDays,
  groupDatesByWeeks,
} from "@/utils/contribution";

const Contribution = ({ fetchSolvedProblem }) => {
  const [newdayActivity, setnewdayActivity] = useState([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const allActivities = getAllActivities();
  const weeks = groupDatesByWeeks(allActivities);
  const monthLabel = getMonthLabels(weeks, DEFAULT_MONTH_LABELS);

  useEffect(() => {
    const checkSolvedTime = (arr, arr2) => {
      if (!Array.isArray(arr) || !Array.isArray(arr2)) {
        return arr; // 유효하지 않은 경우, 원래 배열 반환
      }
      for (let i = 0; i < arr.length; i++) {
        for (let k = 0; k < arr2.length; k++) {
          if (typeof arr[i] === "object" && arr[i].hasOwnProperty("date")) {
            const date = arr[i].date;
            const solvedTimeArray = arr2[k].solvedTime;
            solvedTimeArray.sort(compareAsc);
            const solvedTime = formatISO(arr2[k].solvedTime[0], {
              representation: "date",
            });
            if (date == solvedTime) {
              allActivities[i].count++;
              const daysSinceProblemSolved = differenceInDays(
                new Date(),
                solvedTime
              );
              allActivities[i].overdue = daysSinceProblemSolved;
              if (solvedTimeArray.length > 1) {
                allActivities[i].againCount++;
                const daysSinceAgainSolved = differenceInDays(
                  solvedTimeArray[1],
                  solvedTimeArray[0]
                );
                if (daysSinceAgainSolved < 3) {
                  allActivities[i].again = true;
                }
              }
            }
          }
        }
      }
      return arr;
    };
    const DataActivities = checkSolvedTime(allActivities, fetchSolvedProblem);
    setnewdayActivity(groupByDays(DataActivities));
  }, [fetchSolvedProblem]);

  return (
    <div className="relative py-5">
      <h2 className="font-bold mb-3 text-xl">Activities</h2>
      <div className="shadow-md sm:rounded-lg p-8">
        <table className="w-full border-spacing-1 border-separate">
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
            {newdayActivity.map((activities, index) => (
              <tr key={index}>
                <th className="text-xs w-8 text-left">{daysOfWeek[index]}</th>
                {activities.map((activity, index) => (
                  <td
                    key={index}
                    data-date={activity?.date}
                    className={`w-4 h-4 ${
                      activity == undefined && "opacity-0"
                    } ${
                      activity?.count == 0
                        ? "bg-empty-full after:text-empty-line"
                        : activity?.again && activity?.count >= 1
                        ? `bg-good-${activity.count}-full after:text-good-${activity.count}-line`
                        : `bg-bad-2-full after:text-bad-2-line`
                    } justify-self-center rounded-tl-full rounded-br-full relative after:content-['|'] after:absolute after:left-[30%] after:rotate-[45deg] after:top-[10%] after:font-thin  group`}
                  >
                    <span className="hidden rounded-md group-hover:inline-block absolute text-xs z-10 w-max px-2 py-1 origin-center translate-x-[-50%] translate-y-[-130%] ml-2 bg-slate-950 text-white cursor-default before:content-[''] before:w-2 before:h-2 before:bg-slate-950 before:inline-block before:absolute before:top-[100%] before:left-[50%] before:rotate-45 before:origin-center before:translate-x-[-50%] before:translate-y-[-50%] text-center">
                      You solved {activity?.count} problem on {activity?.date}
                      <br />
                      {activity?.count == 0
                        ? `OMG... You didn't even solve💥`
                        : activity?.again
                        ? `Great!😆 You reviewed ${activity.againCount}problem✨`
                        : `OMG... You didn't review🥲`}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-[3px] pt-3 justify-end items-center">
          <span className="text-gray-400 text-sm">Bad</span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-4-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-3-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-2-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-bad-1-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-empty-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-1-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-2-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-3-full inline-block"></span>
          <span className="w-4 h-4 rounded-tl-full rounded-br-full bg-good-4-full inline-block"></span>
          <span className="text-gray-400 text-sm">Good</span>
        </div>
      </div>
    </div>
  );
};

export default Contribution;
