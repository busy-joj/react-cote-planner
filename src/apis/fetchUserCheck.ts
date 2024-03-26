import { defaultInstance } from '@/apis';
import { AxiosResponse } from 'axios';
import { ICommonResponse } from '@/types/common/response';

type ResponseCode = 200 | 404 | 403 | 401 | 402;

const fetchUserCheck = (baekjoonID: string) =>
  defaultInstance
    .get(`login?userId=${baekjoonID}`)
    .then((res: AxiosResponse<ICommonResponse<ResponseCode>>) => res.data);

export default fetchUserCheck;
