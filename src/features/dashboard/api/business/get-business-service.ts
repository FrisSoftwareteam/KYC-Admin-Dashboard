import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export const getBusinessServices = async (id: string) => {
  const response = await axios.get<ApiResponse<any>>(
    `admin/businesses/${id}/services`
  );
  return response.data;
};

type QueryFnType = typeof getBusinessServices;

export const useGetBusinessesServicesApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-business-services', id],
    queryFn: () => getBusinessServices(id),
    ...config,
  });
};
