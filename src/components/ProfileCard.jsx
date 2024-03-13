import { userStore } from '../store';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DonutChart from './DonutChart';
import { LoadingButton } from '@/components/common/Button';
import fetchAchievement from '@/apis/fetchAchievement';
import { supabaseClient } from '../supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Refresh from '@/assets/refresh.svg?react';
import DefaultUser from '@/assets/defaultUser.svg?react';
import Spinner from './common/Spinner';
import { fromNow } from '@/utils/contribution';

const ProfileCard = () => {
  const { userInfo } = userStore();
  const params = useParams();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async baekjoonId => await fetchAchievement(baekjoonId),
    mutationKey: ['update', 'crawling', params.id],
  });
  const { data: baekjoonData, refetch } = useQuery({
    queryKey: ['solved', params.id],
    queryFn: async () =>
      await supabaseClient.from('baekjoon').select('*').eq('id', params.id),
    enabled: false,
  });
  const data = baekjoonData?.data?.[0];
  const updated_at = data?.updated_at;
  const solved_day = data?.solved_day;
  const solved_total_count = data?.solved_total_count;
  const solved_count = data?.solved_count;
  const review_count = data?.review_count;
  const review_ratio = Math.floor((review_count / solved_total_count) * 100);
  return (
    <section className="flex justify-between py-8">
      <article className="w-1/3">
        <picture>
          {userInfo?.avatar_url ? (
            <img
              src={userInfo?.avatar_url}
              alt="프로필 사진"
              className="rounded-full object-contain max-h-[100px] bg-gray-300"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-full">
              <DefaultUser />
            </div>
          )}
        </picture>
        <div className="">
          <h1 className="font-bold text-3xl mb-3">
            {params.id || userInfo.user_name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <LoadingButton
              isPending={isPending || !updated_at}
              onClick={e =>
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
                    // refetch();
                  },
                })
              }
              className={`bg-primary-600 w-10 h-8 text-white`}
            >
              <Refresh />
            </LoadingButton>
            <div className="flex">
              <p>마지막 업데이트 : </p>
              {isPending || !updated_at ? null : (
                <span className="ml-2">{fromNow(updated_at)}</span>
              )}
            </div>
          </div>
          {userInfo?.user_name ? null : (
            <div className="border border-solid rounded-xl p-3.5 text-base border-gray-300 w-full">
              <Link to="/login">카카오 연동하고 나만의 PT를 받아보세요.</Link>
            </div>
          )}
        </div>
      </article>
      <article className="w-1/3 h-60 bg-profileCard-study rounded-xl font-bold text-white p-8 mx-6">
        <p>학습일</p>
        <div className="flex justify-center items-center h-full">
          <p className="text-3xl">{solved_day || '-'}일 / 365일</p>
        </div>
      </article>
      <article className="w-1/3 h-60 bg-profileCard-review rounded-xl font-bold text-white p-8">
        <p>복습력</p>
        <div className="flex justify-around items-center h-full">
          <DonutChart
            width={100}
            height={100}
            value={review_ratio || 0}
            innerRadius={40}
            outerRadius={49}
          />
          <ul className="list-disc text-base">
            <li>문제 해결 {solved_total_count}문제</li>
            <li>복습 {review_count}문제</li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ProfileCard;
