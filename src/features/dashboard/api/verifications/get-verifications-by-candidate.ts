import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IGetAllVerificationsResponse } from './get-all-verifications';

export const getVerificationbyCandidate = async (id: string) => {
  const response = await axios.get<ApiResponse<IGetAllVerificationsResponse>>(
    `businesses/candidates/${id}/get-verifications`
  );
  return response.data;
};

type QueryFnType = typeof getVerificationbyCandidate;

export const useGetVerificatioByCandidateApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-verification-by-candidate', id],
    queryFn: () => getVerificationbyCandidate(id),
    ...config,
  });
};
