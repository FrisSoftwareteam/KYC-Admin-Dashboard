import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { ICandidate } from '@/shared/interface/verification';

export const getAllCandidates = async () => {
  const response = await axios.get<ApiResponse<Array<ICandidate>>>(
    'businesses/candidates'
  );
  return response.data;
};

type QueryFnType = typeof getAllCandidates;

export const useGetAllCandidatesApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-candidates'],
    queryFn: getAllCandidates,
    ...config,
  });
};
