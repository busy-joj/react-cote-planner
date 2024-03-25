import { defaultInstance } from '@/apis';
import { getBaekjoonSolvedData } from '@/apis/crawling/baekjoon';
import { IBaekjoonCrawlingData } from '@/types/common/baekjoon';
import { ICommonResponse } from '@/types/common/response';
import { AxiosResponse } from 'axios';

const fetchAchievement = async (baekjoon_id:string) =>
  await defaultInstance.get(`achievement?id=${baekjoon_id}`).then((res: AxiosResponse<ICommonResponse<IBaekjoonCrawlingData[]>>) => {
    const solvedData = getBaekjoonSolvedData(res.data.data[0].solved_problem);
    return {
      data: [
        {
          ...res.data.data[0],
          solved_problem: solvedData.solved_problem,
          review_count: solvedData.review_count,
          solved_total_count: solvedData.solved_problem.length,
          solved_day: solvedData.solved_day,
        },
      ],
    };
  });

export default fetchAchievement;
