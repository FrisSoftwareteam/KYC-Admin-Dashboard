import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { ICandidate } from '@/shared/interface/verification';
import { useRecoilValue } from 'recoil';

import { buildUrlWithQueryParams } from '@/utils/built-url-query';
import {
  CandidateFilter,
  CandidateFilterState,
} from '../../store/candidates/filter';

export interface IGetCandidatesPaginateResponse {
  meta: IMeta;
  candidates: Array<ICandidate>;
}

export const getCandidatesPaginate = async (filter: CandidateFilter) => {
  const baseUrl = 'admin/candidates/all';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response =
    await axios.get<ApiResponse<IGetCandidatesPaginateResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getCandidatesPaginate;

export const useGetCandidatePaginateApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(CandidateFilterState);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-candidates-paginate', filter],
    queryFn: () => getCandidatesPaginate(filter),
    ...config,
  });
};
