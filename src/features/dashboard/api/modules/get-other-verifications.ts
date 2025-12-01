import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { useRecoilValue } from 'recoil';
import { ModulesFilter, ModulesFilterState } from '../../store/modules/filter';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';

export type IGetAllSerbicesResponse = {
  meta: IMeta;
  verifications: Array<{
    [key: string]: any;
    name: string;
    slug: string;
    _id: string;
    price: number;
  }>;
};

export const getOtherModules = async (filter: ModulesFilter) => {
  const baseUrl = 'admin/verifications/others';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response =
    await axios.get<ApiResponse<IGetAllSerbicesResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getOtherModules;

export const useGetOtherModulesApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(ModulesFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-other-modules', filter],
    queryFn: () => getOtherModules(filter),
    ...config,
  });
};
