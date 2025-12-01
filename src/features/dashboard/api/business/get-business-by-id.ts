import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IBusiness } from '@/shared/interface/business';

export const getBusinessById = async (id: string) => {
  const response = await axios.get<ApiResponse<IBusiness>>(
    `admin/businesses/${id}`
  );
  return response.data;
};

type QueryFnType = typeof getBusinessById;

export const useGetBusinessByIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-business-by-id', id],
    queryFn: () => getBusinessById(id),
    ...config,
  });
};
