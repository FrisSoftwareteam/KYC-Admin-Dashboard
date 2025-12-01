import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { ITransaction } from '@/shared/interface/transaction';

export interface IGetAllTransactionsresponse {
  meta: IMeta;
  transactions: Array<ITransaction>;
}

export const getAllTransactions = async () => {
  const response = await axios.get<ApiResponse<IGetAllTransactionsresponse>>(
    'businesses/transactions'
  );
  return response.data;
};

type QueryFnType = typeof getAllTransactions;

export const useGetAllTransactionsApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-transactions'],
    queryFn: getAllTransactions,
    ...config,
  });
};
