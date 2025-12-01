import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface IGetBusinessProfileRespopnse {
  _id: string;
  name: string;
  email: string;
  address: string;
  cacNumber: string;
  directorBvn: string;
  mainUser: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: {
      countryCode: string;
      number: string;
    };
    userType: string;
    mustChangePassword: boolean;
    isEmailVerified: boolean;
  };
  country: {
    code: string;
    name: string;
  };
}
export const getBusinessProfile = async () => {
  const response =
    await axios.get<ApiResponse<IGetBusinessProfileRespopnse>>(
      'businesses/profile'
    );
  return response.data;
};

type QueryFnType = typeof getBusinessProfile;

export const useGetbusinessProfileApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-business-profile'],
    queryFn: getBusinessProfile,
    ...config,
  });
};
