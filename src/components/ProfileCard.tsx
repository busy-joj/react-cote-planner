import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Params } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import fetchAchievement from '@/apis/fetchAchievement';
import DefaultUser from '@/assets/defaultUser.svg?react';
import Refresh from '@/assets/refresh.svg?react';
import { LoadingButton } from '@/components/common/Button';
import { fromNow } from '@/utils/contribution';

import { userStore } from '../store';
import { supabaseClient } from '../supabase/client';
import DonutChart from './DonutChart';
import { IBaekjoonTable } from '@/types/common/supabase';
import { ResponseData } from '@/types/common/response';
import { ICustomBaekjoonCrawlingData } from '@/types/common/baekjoon';

const ProfileCard = () => {
  const { userInfo } = userStore();
  const params = useParams() as {id : string};

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (baekjoonId: string): Promise<ResponseData<ICustomBaekjoonCrawlingData[]>> => await fetchAchievement(baekjoonId),
    mutationKey: ['update', 'crawling', params.id],
  });
  const { data: baekjoonData } = useQuery({
    queryKey: ['solved', params.id],
    queryFn: async () =>
      await supabaseClient.from('baekjoon').select('*').eq('id', params.id),
    enabled: false,
  });
  const data: IBaekjoonTable = baekjoonData?.data?.[0];
  const updated_at = data?.updated_at;
  const solved_day = data?.solved_day;
  const solved_total_count = data?.solved_total_count;
  const solved_count = data?.solved_count;
  const review_count = data?.review_count;
  const review_ratio = Math.floor((review_count / solved_total_count) * 100);
  return (
    <section className="grid grid-rows-2 grid-cols-2 gap-2 lg:gap-4 lg:grid-rows-1 lg:grid-cols-3">
      <article className="col-start-1 col-end-3 lg:col-start-1 lg:col-end-2">
        <picture>
          {userInfo?.avatar_url ? (
            <img
              src={userInfo?.avatar_url}
              alt="프로필 사진"
              className="rounded-full object-contain max-h-[100px] bg-gray-300"
            />
          ) : (
            <div className="lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] bg-gray-300 rounded-full">
              <DefaultUser />
            </div>
          )}
        </picture>
        <div className="">
          <h2 className="font-bold lg:text-3xl text-md my-3">
            {params.id || userInfo?.user_name}
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <LoadingButton
              isPending={isPending || !updated_at}
              onClick={() =>
                mutate(params.id, {
                  onSuccess: async res => {
                    const crawlingData = res.data[0];
                    queryClient.setQueryData(
                      ['solved', params.id],
                      crawlingData,
                    );
                    await supabaseClient
                      .from('baekjoon')
                      .update([
                        {
                          solved_problem: crawlingData.solved_problem,
                          solved_count: crawlingData.solved_count,
                          solved_recent: crawlingData.solved_recent,
                          solved_total_count: crawlingData.solved_total_count,
                          solved_day: crawlingData.solved_day,
                          review_count: crawlingData.review_count,
                          updated_at: crawlingData.updated_at,
                        },
                      ])
                      .eq('id', params.id);
                  },
                })
              }
              className={`bg-primary-600 lg:w-10 lg:h-8 w-8 h-6 text-white lg:py-2 py-1`}
            >
              <Refresh />
            </LoadingButton>
            <div className="flex text-sm lg:text-base">
              <p>마지막 업데이트 : </p>
              {isPending || !updated_at ? null : (
                <span className="ml-2">{fromNow(updated_at)}</span>
              )}
            </div>
          </div>
          {userInfo?.user_name ? null : (
            <div className="border border-solid rounded-lg lg:rounded-xl p-2 lg:p-3.5 text-sm lg:text-base border-gray-300 w-full">
              <Link to="/login">
                🔔 카카오 연동하고 나만의 PT를 받아보세요.
              </Link>
            </div>
          )}
        </div>
      </article>
      <article className="col-start-1 col-end-2 bg-profileCard-study rounded-lg lg:rounded-xl font-bold text-white p-3 lg:p-8 flex flex-col lg:col-start-2 lg:col-end-3">
        <p className="text-base lg:text-lg">학습일</p>
        <div className="flex justify-center items-center h-full text-lg lg:text-3xl">
          {solved_day || '-'}일 / 365일
        </div>
      </article>
      <article className="col-start-2 col-end-3 bg-profileCard-review rounded-lg lg:rounded-xl font-bold text-white p-3 lg:p-8 flex flex-col lg:col-start-3 lg:col-end-4">
        <p className="text-base lg:text-lg">복습력</p>
        <div className="flex justify-around items-center h-full flex-col md:flex-row gap-1">
          <DonutChart
            width={100}
            height={100}
            value={review_ratio || 0}
            innerRadius={40}
            outerRadius={49}
          />
          <ul className="list-disc text-sm lg:text-base">
            <li>문제 해결 {solved_total_count}문제</li>
            <li>복습 {review_count}문제</li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ProfileCard;
