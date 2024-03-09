import { useEffect, useState } from 'react';
import { groupByDays, getLevel } from '@/utils/contribution';
import useGetData from '@/hooks/useGetData';
import { defaultInstance } from '@/apis';
import { getBackjoonSolvedData } from '@/apis/crawling/backjoon';
import { compareAsc, differenceInDays, formatISO } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';
import { supabaseClient } from '../supabase/client';
import { isOneDayPassed } from '../utils/contribution';

const activityBgColor = {
  good: {
    0: 'bg-[#F0F0EF] after:text-[#E6E6E6]',
    1: 'bg-[#D0E7D2] after:text-[#B9D8BC]',
    2: 'bg-[#B0D9B1] after:text-[#8AB989]',
    3: 'bg-[#79AC78] after:text-[#5F975E]',
    4: 'bg-[#416241] after:text-[#235F23]',
  },
  bad: {
    0: 'bg-[#F0F0EF] after:text-[#E6E6E6]',
    1: 'bg-[#F4DFBA] after:text-[#E3CBA0]',
    2: 'bg-[#EEC373] after:text-[#DFAA46]',
    3: 'bg-[#CA965C] after:text-[#B27A3C]',
    4: 'bg-[#876445] after:text-[#75563B]',
  },
};

const NewdayActivity = props => {
  const { allActivities, params } = props;
  const [newdayActivity, setnewdayActivity] = useState([]);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const { data: query } = useSuspenseQuery({
    queryKey: ['solved', params.id],
    queryFn: async () =>
      await supabaseClient.from('baekjoon').select('*').eq('id', params.id),
  });
  const data = query.data?.at(0);
  const fetchSolvedProblem = data.solved_problem;
  const fetchSolvedCount = data.solved_count;
  const fetchSolvedRecent = data.solved_recent;
  useEffect(() => {
    // 하루 이상 지나면 데이터 업데이트
    if (isOneDayPassed(data.updated_at)) {
      (async () => {
        const crawlingData = await defaultInstance
          .get(`achievement?id=${params.id}`)
          .then(res => {
            return {
              ...res.data,
              solved_problem: getBackjoonSolvedData(res.data.solved_problem),
            };
          });

        if (
          data.id &&
          (!fetchSolvedRecent ||
            fetchSolvedRecent != crawlingData.solved_recent)
        ) {
          const { data, error } = await supabase
            .from('baekjoon')
            .insert([
              {
                solved_problem: crawlingData.solved_problem,
                solved_count: crawlingData.solved_count,
                solved_recent: crawlingData.solved_recent,
              },
            ])
            .select();
          console.log('업데이트', data);
        }
      })();
    }
    const checkSolvedTime = (arr, arr2) => {
      if (!Array.isArray(arr) || !Array.isArray(arr2)) {
        return arr; // 유효하지 않은 경우, 원래 배열 반환
      }
      const arrLen = arr.length;
      const arr2Len = arr2.length;
      for (let i = 0; i < arrLen; i++) {
        for (let k = 0; k < arr2Len; k++) {
          if (typeof arr[i] === 'object' && arr[i].hasOwnProperty('date')) {
            const date = arr[i].date;
            const solvedTimeArray = arr2[k].solvedTime;
            solvedTimeArray.sort(compareAsc);
            const solvedTime = formatISO(arr2[k].solvedTime[0], {
              representation: 'date',
            });
            if (date == solvedTime) {
              allActivities[i].count++;
              allActivities[i].level = getLevel(allActivities[i].count);
              const daysSinceProblemSolved = differenceInDays(
                new Date(),
                solvedTime,
              );
              allActivities[i].overdue = daysSinceProblemSolved;
              if (solvedTimeArray.length > 1) {
                allActivities[i].againCount++;
                allActivities[i].againLevel = getLevel(
                  allActivities[i].againCount,
                );
                const daysSinceAgainSolved = differenceInDays(
                  solvedTimeArray[1],
                  solvedTimeArray[0],
                );
              }
              if (allActivities[i].againCount == allActivities[i].count) {
                allActivities[i].again = true;
              }
            }
          }
        }
      }
      return arr;
    };
    const DataActivities = checkSolvedTime(allActivities, fetchSolvedProblem);
    setnewdayActivity(groupByDays(DataActivities));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSolvedProblem]);

  return (
    <>
      {newdayActivity.map((activities, index) => (
        <tr key={index}>
          <th className="text-xs w-8 text-left">{daysOfWeek[index]}</th>
          {activities.map((activity, index) => (
            <td
              key={index}
              data-date={activity?.date}
              className={`w-4 h-4 ${activity == undefined && 'opacity-0'} ${`${
                activity?.again
                  ? activityBgColor['good'][activity?.level]
                  : activityBgColor['bad'][activity?.level]
              }`} justify-self-center rounded-tl-full rounded-br-full relative after:content-['|'] after:absolute after:left-[30%] after:rotate-[45deg] after:top-[10%] after:font-thin  group`}
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
    </>
  );
};

export default NewdayActivity;
