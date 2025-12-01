import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';

interface IPartnerMetrics {
  totalVerifications: number;
  totalCompletedVerifications: number;
  totalVerificationInProgress: number;
  totalPendingVerification: number;
  totalUnassignVerification: number;
  totalAssignedVerification: number;
  totalAgents: number;
}

export interface DateFilter {
  customStartDate: string;
  customEndDate: string;
}

export const getPartnerMetrics = async ({ filter, id }: any) => {
  const baseUrl = `admin/partners/${id}/partner-metrics`;
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);

  const response = await axios.get<ApiResponse<IPartnerMetrics>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getPartnerMetrics;

export const useGetPartnerMetricsApi = (
  id: string,
  filter = {},
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-partner-metrics', filter, id],
    queryFn: () => getPartnerMetrics({ id, filter }),
    ...config,
  });
};
