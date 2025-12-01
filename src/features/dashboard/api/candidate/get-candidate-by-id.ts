import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { ICandidate } from '@/shared/interface/verification';

export const getCandidateById = async (id: string) => {
  const response = await axios.get<ApiResponse<ICandidate>>(
    `admin/candidates/${id}/profile`
  );
  return response.data;
};

type QueryFnType = typeof getCandidateById;

export const useGetCandidateByIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-candidate-by-id', id],
    queryFn: () => getCandidateById(id),
    ...config,
  });
};
