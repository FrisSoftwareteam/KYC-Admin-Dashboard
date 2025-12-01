import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { buildUrlWithQueryParams } from '@/utils/built-url-query';

export type IGetAllCUsersResponse = Array<{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
  userType: string;
  status: string;
  mustChangePassword: boolean;
  isEmailVerified: boolean;
}>;

export const getAllUsers = async (filter?: Record<string, any>) => {
  const baseUrl = 'admin/users';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response = await axios.get<ApiResponse<IGetAllCUsersResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAllUsers;

export const useGetAllUsersApi = (
  filter?: Record<string, any>,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-users', filter],
    queryFn: () => getAllUsers(filter),
    ...config,
  });
};
