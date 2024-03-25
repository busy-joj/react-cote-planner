import { defaultInstance } from '@/apis';
import { AxiosResponse } from 'axios';
import { ICommonResponse } from '@/types/common/response';

const fetchUserCheck = (baekjoonID: string) =>
  defaultInstance.get(`login?userId=${baekjoonID}`).then((res: AxiosResponse<ICommonResponse<number>>) => res.data);

export default fetchUserCheck;
