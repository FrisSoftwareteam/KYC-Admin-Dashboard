import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface IGetUserprofileResponse {
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
  permissions: Array<string>;
  role: {
    _id: string;
    name: string;
    entity: string;
    createdAt: string;
    permissions: Array<string>;
    updatedAt: string;
  };
}
export const getUserProfile = async () => {
  const response =
    await axios.get<ApiResponse<IGetUserprofileResponse>>(`admin/profile`);
  return response.data;
};

type QueryFnType = typeof getUserProfile;

export const useGetUserprofileApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-user-profile'],
    queryFn: getUserProfile,
    ...config,
  });
};
