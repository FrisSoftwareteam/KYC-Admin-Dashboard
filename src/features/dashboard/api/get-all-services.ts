import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export type IGetAllSerbicesResponse = Array<{
  name: string;
  slug: string;
  _id: string;
  price: number;
}>;
export const getAllServices = async () => {
  const response = await axios.get<ApiResponse<IGetAllSerbicesResponse>>(
    'businesses/services'
  );
  return response.data;
};

type QueryFnType = typeof getAllServices;

export const useGetAllServicesApi = (config?: QueryConfigType<QueryFnType>) => {
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
