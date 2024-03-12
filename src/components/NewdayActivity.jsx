import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { groupByDays, getLevel } from '@/utils/contribution';
import { compareAsc, differenceInDays, formatISO } from 'date-fns';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { supabaseClient } from '../supabase/client';
import { isOneDayPassed } from '../utils/contribution';
import fetchAchievement from '@/apis/fetchAchievement';
import Skeleton from '@/components/Skeleton';

const ActivityLoading = () => {
  return (
    <>
      <tr className="py-4 relative h-[136px]">
        <td>
          <Skeleton className="absolute w-full h-full rounded" />
        </td>
      </tr>
    </>
  );
};

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
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async baekjoonId => await fetchAchievement(baekjoonId),
  });
  const { data: baekjoonData } = useSuspenseQuery({
    queryKey: ['solved', params.id],
    queryFn: async () =>
      await supabaseClient.from('baekjoon').select('*').eq('id', params.id),
  });
  const data = baekjoonData.data?.[0];
  const fetchSolvedProblem = data?.solved_problem;

  const fetchSolvedCount = data?.solved_count;
  const fetchSolvedRecent = data?.solved_recent;
  const checkSolvedTime = useCallback(
    (arr, arr2) => {
      if (
        newdayActivity.length ||
        !Array.isArray(arr) ||
        !Array.isArray(arr2)
      ) {
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
            }
          }
        }
        if (
          allActivities[i] &&
          allActivities[i].againCount === allActivities[i].count
        ) {
          allActivities[i].again = true;
        }
      }
      return arr;
    },
    [allActivities],
  );

  useEffect(() => {
    // 하루 이상 지나면 데이터 업데이트
    if (data?.updated_at && isOneDayPassed(data?.updated_at)) {
      const updateOneDayPassed = async () => {
        mutate(params.id, {
          onSuccess: async res => {
            const crawlingData = res.data[0];
            queryClient.setQueryData(['solved', params.id], crawlingData);
            await supabaseClient
              .from('baekjoon')
              .update([
                {
                  solved_problem: crawlingData.solved_problem,
                  solved_count: crawlingData.solved_count,
                  solved_recent: crawlingData.solved_recent,
                  updated_at: crawlingData.updated_at,
                },
              ])
              .eq('id', params.id);
            // 하루 지난 데이터가 캐싱되어 있는 상태에서 새로운 데이터를 가져온 후
            // setQueryData를 통해 업데이트해줬지만 화면에서는 동기화가 이루어지지 않음
            // invalidateQueries를 통해 해당 queryKey 중 활성화(현재 페이지에서 사용중인 데이터) 된 애들만 강제 동기화
            // (invalidateQueries는 캐싱중이며 활성화 되어있는 query들을 무효화하고 다시 요청)
            await queryClient.invalidateQueries({
              queryKey: ['solved', params.id],
              refetchType: 'active',
            });
          },
        });
      };
      updateOneDayPassed();
    } else if (!fetchSolvedProblem) {
      const getNewData = async () => {
        const crawlingData = await fetchAchievement(params.id);
        queryClient.setQueryData(
          ['solved', params.id], // todo crawling 지우고 캐시 삭제 후 저장하는 형태로하기
          crawlingData,
        );
      };
      getNewData();
    }
    const DataActivities = checkSolvedTime(allActivities, fetchSolvedProblem);
    setnewdayActivity(groupByDays(DataActivities));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSolvedProblem, allActivities]);
  return (
    <>
      {fetchSolvedCount ? (
        newdayActivity.map((activities, index) => (
          <tr key={index}>
            <th className="text-xs w-8 text-left">{daysOfWeek[index]}</th>
            {activities.map((activity, index) => (
              <td
                key={index}
                data-date={activity?.date}
                className={`w-4 h-4 ${
                  activity == undefined && 'opacity-0'
                } ${`${
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
        ))
      ) : (
        <ActivityLoading />
      )}
    </>
  );
};

export default NewdayActivity;
