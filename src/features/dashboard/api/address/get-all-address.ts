import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { useRecoilValue } from 'recoil';
import {
  AddressesFilter,
  AddressesFilterState,
} from '../../store/verifications/address-filter';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';

export const getAllAddresses = async (filter: AddressesFilter) => {
  const baseUrl = 'admin/verifications/addresses';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response = await axios.get(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAllAddresses;

export const useGetAllAddressesApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(AddressesFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-addresses', filter],
    queryFn: () => getAllAddresses(filter),
    ...config,
  });
};
