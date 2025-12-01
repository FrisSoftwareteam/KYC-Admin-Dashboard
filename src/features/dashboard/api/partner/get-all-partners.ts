import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { useRecoilValue } from 'recoil';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';
import { IPartner } from '@/shared/interface/partner';
import {
  PartnerVerificationsFilter,
  PartnerVerificationsFilterState,
} from '../../store/partner/partner-verification-filter';

export interface IGetAllPartnersResponse {
  meta: IMeta;
  partners: Array<IPartner>;
}

export const getAllPartners = async (filter: PartnerVerificationsFilter) => {
  const baseUrl = 'admin/partners';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response =
    await axios.get<ApiResponse<IGetAllPartnersResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAllPartners;

export const useGetAllPartnersApi = (config?: QueryConfigType<QueryFnType>) => {
  const filter = useRecoilValue(PartnerVerificationsFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-partners', filter],
    queryFn: () => getAllPartners(filter),
    ...config,
  });
};
