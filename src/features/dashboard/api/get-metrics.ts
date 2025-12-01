import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';

export interface IAdminMetricsResponse {
  totalVerifications: number;

  totalBusinesses: number;
  totalPartners: number;
  totalAgents: number;
  completed: string;
  revenue: number;
}
export const getMetrics = async (filter: any) => {
  const baseUrl = 'admin/dashboard-metrics';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);

  const response = await axios.get<ApiResponse<IAdminMetricsResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getMetrics;

export const useAdminMetricsApi = (
  filter = {},
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-admin-metrics', filter],
    queryFn: () => getMetrics(filter),
    ...config,
  });
};
