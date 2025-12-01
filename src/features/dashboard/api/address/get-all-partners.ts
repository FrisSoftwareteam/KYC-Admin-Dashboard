import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';

export const getAllPartners = async (id: string) => {
  const response = await axios.get(
    `admin/verifications/addresses/${id}/partners`
  );
  return response.data;
};

type QueryFnType = typeof getAllPartners;

export const useGetAllPartnersApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-partners', id],
    queryFn: () => getAllPartners(id),
    ...config,
  });
};
