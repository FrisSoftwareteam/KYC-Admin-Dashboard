import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IPartner } from '@/shared/interface/partner';

export const getPartnerById = async (id: string) => {
  const response = await axios.get<ApiResponse<IPartner>>(
    `admin/partners/${id}`
  );
  return response.data;
};

type QueryFnType = typeof getPartnerById;

export const useGetPartnerByIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-partner-by-id', id],
    queryFn: () => getPartnerById(id),
    ...config,
  });
};
