import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { IAddressVerification } from '@/shared/interface/verification';
import { useRecoilValue } from 'recoil';

import { buildUrlWithQueryParams } from '@/utils/built-url-query';
import { BusinessFilter } from '../../store/businesses/singlebusinessFilter';
import { PartnerFilterState } from '../../store/partner/filter';
import { IAgent } from '@/shared/interface/agent';

export interface IGetAllVerificationsResponse {
  meta: IMeta;
  addresses: Array<IAddressVerification>;
  agents: Array<IAgent>;
}

export const getSinglePartnerVerifications = async (
  id: string,
  filter: Partial<BusinessFilter>
) => {
  const payload = {
    size: filter.size,
    page: filter.page,
    // status: filter.status,
    search: filter.search,
    customStartDate: filter.customStartDate,
    customEndDate: filter.customEndDate,
  };
  const baseUrl = `admin/partners/${id}/${filter.name}`;
  const apiUrl = buildUrlWithQueryParams(baseUrl, payload);
  const response =
    await axios.get<ApiResponse<IGetAllVerificationsResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getSinglePartnerVerifications;

export const useGetSinglePartnerVerificationsApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(PartnerFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-single-partner-verifications', filter, id],
    queryFn: () => getSinglePartnerVerifications(id, filter),
    ...config,
  });
};
