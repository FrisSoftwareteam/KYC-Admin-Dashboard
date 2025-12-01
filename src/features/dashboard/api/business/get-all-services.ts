import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export const getAllServices = async () => {
  const response = await axios.get<ApiResponse<any>>(`services/all`);
  return response.data;
};

type QueryFnType = typeof getAllServices;

export const useGetAllSystemServicesApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-services'],
    queryFn: getAllServices,
    ...config,
  });
};
