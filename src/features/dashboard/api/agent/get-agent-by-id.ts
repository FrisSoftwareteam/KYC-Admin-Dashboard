import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { IAgent } from '@/shared/interface/agent';
import { ApiResponse } from '@/shared/interface/api';

export const getAgentById = async (partnerId: string, agentId: string) => {
  const response = await axios.get<ApiResponse<IAgent>>(
    `admin/partners/${partnerId}/agents/${agentId}`
  );
  return response.data;
};

type QueryFnType = typeof getAgentById;

export const useGetAgentByIdApi = (
  id: { partnerId: string; agentId: string },
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-agent-by-id', id],
    queryFn: () => getAgentById(id.partnerId, id.agentId),
    ...config,
  });
};
