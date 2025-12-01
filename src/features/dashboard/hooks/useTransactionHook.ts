import { useGetAllTransactionsApi } from '../api/get-all-transactions';
import { ITransaction } from '@/shared/interface/transaction';

export const useTransactionsHook = () => {
  const { data, isLoading } = useGetAllTransactionsApi();
  //   console.log('Data is ', data);

  const arrayData: Array<Partial<ITransaction>> | undefined =
    data?.data?.transactions?.map((item) => ({
      status: item?.status,
      _id: item?._id,
      date: item?.createdAt,
      type: item.type,
      verificationType: item?.task?.verificationType,
      name: `${item?.task?.candidate?.firstName} ${item?.task?.candidate?.lastName}`,
      amount: item.amount,
      initiatedBy: `${item?.user?.firstName} ${item?.user?.lastName}`,
    }));
  // console.log({arrayData});

  return {
    data,
    isLoading,
    arrayData,
  };
};
