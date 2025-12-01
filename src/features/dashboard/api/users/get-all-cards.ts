import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export type IGetAllCardsResponse = Array<{
  _id: string;
  bin: string;
  lastFourDigit: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: string;
  reusable: boolean;
}>;
export const getAllCards = async () => {
  const response =
    await axios.get<ApiResponse<IGetAllCardsResponse>>('businesses/cards');
  return response.data;
};

type QueryFnType = typeof getAllCards;

export const useGetAllCardsApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-cards'],
    queryFn: getAllCards,
    ...config,
  });
};
