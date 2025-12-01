import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

type IGetServicesResponse = Array<{
  _id: string;
  name: string;
  slug: string;
  price: number;
  active: boolean;
}>;
export const getServices = async () => {
  const response =
    await axios.get<ApiResponse<IGetServicesResponse>>('services/all');
  return response.data;
};

type QueryFnType = typeof getServices;

export const useGetServicesApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-services'],
    queryFn: getServices,
    ...config,
  });
};
