import { defaultInstance } from '@/apis';
import { getBackjoonSolvedData } from '@/apis/crawling/backjoon';

const fetchAchievement = async baekjoon_id =>
  await defaultInstance.get(`achievement?id=${baekjoon_id}`).then(res => {
    return {
      data: [
        {
          ...res.data.data[0],
          solved_problem: getBackjoonSolvedData(
            res.data.data[0].solved_problem,
          ),
        },
      ],
    };
  });

export default fetchAchievement;
