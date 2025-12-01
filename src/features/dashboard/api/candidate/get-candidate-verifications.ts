import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IGetAllVerificationsResponse } from '../verifications/get-all-verifications';

export const getCandidateVerifications = async (
  id: string,
  businessId: string
) => {
  const response = await axios.get<ApiResponse<IGetAllVerificationsResponse>>(
    `admin/candidates/${id}/businesses/${businessId}/verifications`
  );
  return response.data;
};

type QueryFnType = typeof getCandidateVerifications;

export const useGetCandidateVerificationsApi = (
  id: string,
  businessId: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-candidate-verifications', id, businessId],
    queryFn: () => getCandidateVerifications(id, businessId),
    ...config,
  });
};
