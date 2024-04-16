import { defaultInstance } from '@/apis';
import { getBaekjoonSolvedData } from '@/apis/crawling/baekjoon';
import {
  IBaekjoonCrawlingData,
  ICustomBaekjoonCrawlingData,
} from '@/types/common/baekjoon';
import { ICommonResponse, ResponseData } from '@/types/common/response';
import { AxiosResponse } from 'axios';

const fetchAchievement = async (
  baekjoon_id: string,
): Promise<ResponseData<ICustomBaekjoonCrawlingData[]>> =>
  await defaultInstance
    .get(`achievement?id=${baekjoon_id}`)
    .then((res: AxiosResponse<ICommonResponse<IBaekjoonCrawlingData[]>>) => {
      const crawlingData: IBaekjoonCrawlingData = res.data.data[0];
      // return crawlingData;
      const solvedData = getBaekjoonSolvedData(crawlingData.solved_problem);
      return {
        data: [
          {
            ...crawlingData,
            solved_problem: solvedData.solved_problem,
            review_count: solvedData.review_count,
            solved_total_count: solvedData.solved_problem.length,
            solved_day: solvedData.solved_day,
          },
        ],
      };
    });

export default fetchAchievement;
