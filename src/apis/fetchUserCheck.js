import { defaultInstance } from '@/apis';
const fetchUserCheck = baekjoonID =>
  defaultInstance.get(`login?userId=${baekjoonID}`).then(({ data }) => data);

export default fetchUserCheck;
