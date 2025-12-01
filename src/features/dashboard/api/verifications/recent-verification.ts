import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface RecentVerificationResponse {
  candidate: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    imageUrl: string;
  };
  address: {
    position: {
      latitude: string;
      longitude: string;
    };
    candidate: {
      _id: string;
    };
    formatAddress: string;
    details: any;
    status: string;
    notes: Array<any>;
    images: Array<any>;
    createdAt: string;
    _id: string;
  };
  status: string;
  createdAt: string;
  verificationType: string;
  _id: string;
}
export const getRecentVerifications = async () => {
  const response =
    await axios.get<ApiResponse<Array<RecentVerificationResponse>>>(
      `admin/trendings`
    );
  return response.data;
};

type QueryFnType = typeof getRecentVerifications;

export const useGetRecentVerificationApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-recent-verification'],
    queryFn: getRecentVerifications,
    ...config,
  });
};
