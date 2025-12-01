import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export const getAllAgents = async (partner: string, id: string) => {
  const response = await axios.get<ApiResponse<any>>(
    `/admin/partners/${partner}/addresses/${id}/agents`
  );
  return response.data;
};

type QueryFnType = typeof getAllAgents;

export const useGetAllAgentsApi = (
  partner: string,
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-agents', id, partner],
    queryFn: () => getAllAgents(partner, id),
    ...config,
  });
};
