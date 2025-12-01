import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';

export const getAddressById = async (id: string) => {
  const response = await axios.get(`/admin/verifications/addresses/${id}`);
  return response.data;
};

type QueryFnType = typeof getAddressById;

export const useGetAddressByIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-address-by-id', id],
    queryFn: () => getAddressById(id),
    ...config,
  });
};
