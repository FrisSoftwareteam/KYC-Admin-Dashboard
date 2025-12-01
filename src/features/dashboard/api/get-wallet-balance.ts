import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface IGetWalletBalanceResponse {
  format: {
    balance: string;
    book: string;
    outstanding: string;
    totalVerificationCost: string;
  };
  balance: {
    book: number;
    balance: number;
    totalVerificationCost: number;
  };
}
export const getWalletBalance = async () => {
  const response = await axios.get<ApiResponse<IGetWalletBalanceResponse>>(
    'businesses/wallet-balance'
  );
  return response.data;
};

type QueryFnType = typeof getWalletBalance;

export const useGetWalletBalanceApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-wallet-balance'],
    queryFn: getWalletBalance,
    ...config,
  });
};
