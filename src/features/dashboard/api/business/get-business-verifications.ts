import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { VerificationsResponse } from '@/shared/interface/verification';
import { useRecoilValue } from 'recoil';

import { buildUrlWithQueryParams } from '@/utils/built-url-query';
import {
  BusinessFilter,
  SingleBusinessFilterState,
} from '../../store/businesses/singlebusinessFilter';

export interface IGetAllVerificationsResponse {
  meta: IMeta;
  tasks: Array<VerificationsResponse>;
}

export const getSingleBusinessVerifications = async (
  id: string,
  filter: BusinessFilter
) => {
  const baseUrl = `admin/businesses/${id}/verifications`;
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response =
    await axios.get<ApiResponse<IGetAllVerificationsResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getSingleBusinessVerifications;

export const useGetSingleBusinessVerificationsApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(SingleBusinessFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-single-business-verifications', filter, id],
    queryFn: () => getSingleBusinessVerifications(id, filter),
    ...config,
  });
};
