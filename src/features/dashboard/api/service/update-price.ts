import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const updatePrice = async (data: {
  price: string | number;
  active: boolean;
  id: string;
}) => {
  const payload = { price: data.price, active: data.active };
  const response = await axios.put(`services/${data?.id}/update`, payload);
  return response.data;
};

type MutFnType = typeof updatePrice;

export const useUpdatePriceApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['update-price'],
    mutationFn: updatePrice,
    ...config,
  });
};
