import { compareAsc, differenceInDays, formatISO } from 'date-fns';
import { getAllActivities, getLevel } from '@/utils/contribution';
/**
 * 같은 언어와 같은 문제 번호일 때, 문제를 푼 시간이 여러개일 경우
 * solvedTime으로 모아주는 역할
 * @param {[
 *  "problemNum": string,
 *  "problemLink": string,
 *  "language": string,
 *  "solvedTime": string
 * ]} data 외부에서 크롤링한 solved_problem
 * @returns {
 *  solved_problem: 해결한 문제 리스트(solvedTime에 동일한 문제를 다른 날에 푼 경우 배열로 담겨있음),
 *  review_count: 복습한 문제 개수(선정 기준은 solvedTime안에 값이 2개 이상일 경우 복습한걸로 간주),
 *  solved_day: 1년동안 코테 문제 푼 일수,
 * }
 */
export const getBackjoonSolvedData = data => {
  let reviewCount = 0;
  const solvedDays = new Set();
  const newData = data.reduce((acc, cur) => {
    let existingIndex = acc.findIndex(
      obj => obj.problemNum === cur.problemNum && obj.language === cur.language,
    );
    if (existingIndex >= 0) {
      acc[existingIndex].solvedTime.push(cur.solvedTime);
      if (
        !acc[existingIndex].isReview &&
        acc[existingIndex].solvedTime.length >= 2
      ) {
        acc[existingIndex].isReview = true;
        reviewCount++;
      }
    } else {
      solvedDays.add(cur.solvedTime.slice(0, 10));
      acc.push({
        problemNum: cur.problemNum,
        problemLink: cur.problemLink,
        language: cur.language,
        solvedTime: new Array(cur.solvedTime),
        isReview: false,
      });
    }
    return acc;
  }, []);
  const solvedProblem = Object.values(newData);
  const { solved_day } = checkSolvedTime(getAllActivities(), solvedProblem);
  return {
    solved_problem: solvedProblem,
    review_count: reviewCount,
    solved_day: solved_day,
  };
};

/**
 * 365일을 solvedTime의 값과 비교하여 문제를 푼 날이면 가중치를 더해주고
 * 가중치에 따라 Level이 주어지며 Level로 나뭇잎의 색을 결정한 배열을 반환
 * @param {*} oneYearFromNowArr 1년전부터 현재까지의 일자를 담은 배열
 * @param {*} fetchSolvedProblem 백준 ID로 조회 후 해결한 문제들이 담긴 배열
 * @returns {
 *   dataActivities: 365일에 코테를 푼 날에 가중치와 Level을 설정한 배열,
 *   solved_day: 중복날짜 제거하고 실제 푼 날의 일수,
 *   newdayActivity: ,
 * }
 */
export const checkSolvedTime = (oneYearFromNowArr, fetchSolvedProblem) => {
  const solvedDays = new Set();
  const newdayActivity = [];
  if (
    newdayActivity.length ||
    !Array.isArray(oneYearFromNowArr) ||
    !Array.isArray(fetchSolvedProblem)
  ) {
    return oneYearFromNowArr; // 유효하지 않은 경우, 원래 배열 반환
  }

  const oneYearFromNowArrLen = oneYearFromNowArr.length;
  const fetchSolvedProblemLen = fetchSolvedProblem.length;
  for (let i = 0; i < oneYearFromNowArrLen; i++) {
    for (let k = 0; k < fetchSolvedProblemLen; k++) {
      if (
        typeof oneYearFromNowArr[i] === 'object' &&
        oneYearFromNowArr[i].hasOwnProperty('date')
      ) {
        const date = oneYearFromNowArr[i].date;
        const solvedTimeArray = fetchSolvedProblem[k].solvedTime;
        solvedTimeArray.sort(compareAsc);
        const solvedTime = formatISO(fetchSolvedProblem[k].solvedTime[0], {
          representation: 'date',
        });

        if (date == solvedTime) {
          oneYearFromNowArr[i].count++;
          oneYearFromNowArr[i].level = getLevel(oneYearFromNowArr[i].count);
          const daysSinceProblemSolved = differenceInDays(
            new Date(),
            solvedTime,
          );
          solvedDays.add(solvedTime);

          oneYearFromNowArr[i].overdue = daysSinceProblemSolved;
          if (solvedTimeArray.length > 1) {
            oneYearFromNowArr[i].againCount++;
            oneYearFromNowArr[i].againLevel = getLevel(
              oneYearFromNowArr[i].againCount,
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
      oneYearFromNowArr[i] &&
      oneYearFromNowArr[i].againCount === oneYearFromNowArr[i].count
    ) {
      oneYearFromNowArr[i].again = true;
    }
  }
  return {
    dataActivities: oneYearFromNowArr,
    solved_day: solvedDays.size,
    newdayActivity: newdayActivity,
  };
};
