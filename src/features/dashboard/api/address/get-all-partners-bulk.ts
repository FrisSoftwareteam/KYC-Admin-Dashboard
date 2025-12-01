import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';

export const getAllPartnersBulk = async () => {
  const response = await axios.get('admin/partners/all');
  return response.data;
};

type QueryFnType = typeof getAllPartnersBulk;

export const useGetAllPartnersBulkApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-partners-bulk'],
    queryFn: getAllPartnersBulk,
    ...config,
  });
};
