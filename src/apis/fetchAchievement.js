import { defaultInstance } from '@/apis';
import { getBackjoonSolvedData } from '@/apis/crawling/backjoon';

const fetchAchievement = async baekjoon_id =>
  await defaultInstance.get(`achievement?id=${baekjoon_id}`).then(res => {
    const solvedData = getBackjoonSolvedData(res.data.data[0].solved_problem);
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
