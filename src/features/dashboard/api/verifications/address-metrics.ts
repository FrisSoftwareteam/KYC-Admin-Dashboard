import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';

export const getAddressMetrics = async () => {
  const apiUrl = `/admin/verifications/addresses/metrics`;
  const response = await axios.get(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAddressMetrics;

export const useGetAddressMetricsQuery = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-address-verifications-metrics'],
    queryFn: getAddressMetrics,
    ...config,
  });
};
