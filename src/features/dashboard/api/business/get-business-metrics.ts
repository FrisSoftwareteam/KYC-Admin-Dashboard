import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export const getBusinessMetrics = async (id: string) => {
  const response = await axios.get<
    ApiResponse<{
      totalCandidates: number;
      totalVerifications: number;
      totalPayments: number;
    }>
  >(`admin/businesses/${id}/business-metrics`);
  return response.data;
};

type QueryFnType = typeof getBusinessMetrics;

export const useGetBusinessMetricsIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-business-metrics-by-id', id],
    queryFn: () => getBusinessMetrics(id),
    ...config,
  });
};
