import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { VerificationsResponse } from '@/shared/interface/verification';
import { useRecoilValue } from 'recoil';
import {
  VerificationFilterState,
  VerificationsFilter,
} from '../../store/verifications/filter';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';

export interface IGetAllVerificationsResponse {
  meta: IMeta;
  tasks: Array<VerificationsResponse>;
}

export const getAllVerifications = async (filter: VerificationsFilter) => {
  const baseUrl = 'admin/verifications';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response =
    await axios.get<ApiResponse<IGetAllVerificationsResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAllVerifications;

export const useGetAllVerificationsApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(VerificationFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-verifications', filter],
    queryFn: () => getAllVerifications(filter),
    ...config,
  });
};
