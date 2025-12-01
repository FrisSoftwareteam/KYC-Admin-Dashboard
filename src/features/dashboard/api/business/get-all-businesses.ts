import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { useRecoilValue } from 'recoil';

import { buildUrlWithQueryParams } from '@/utils/built-url-query';
import {
  BusinessFilter,
  BusinessFilterState,
} from '../../store/businesses/filter';
import { IBusiness } from '@/shared/interface/business';
export interface IGetAllBusinessesResponse {
  meta: IMeta;
  businesses: Array<IBusiness>;
}

export const getAllBusinesses = async (filter: BusinessFilter) => {
  const baseUrl = 'admin/businesses';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response =
    await axios.get<ApiResponse<IGetAllBusinessesResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAllBusinesses;

export const useGetAllBusinessesApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(BusinessFilterState);
  const query = useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-business', filter],
    queryFn: () => getAllBusinesses(filter),
    ...config,
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};
