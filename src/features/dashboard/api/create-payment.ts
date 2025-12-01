import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface ICreatePaymentRequest {
  businessId: string;
  userId: string;
  amount?: number;
  allowedChannel?: string;
}

export interface ICreatePaymentResponse {
  link: string;
  reference: string;
}

export const createPayment = async (data: ICreatePaymentRequest) => {
  const response = await axios.post<ApiResponse<ICreatePaymentResponse>>(
    'businesses/payment-link',
    data
  );
  return response.data;
};

type MutationFnType = typeof createPayment;

export const useCreatePaymentApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: (data) => {
      window.open(data.data.link, '_blank');
    },

    retry: false,
    mutationKey: ['create-payment-link'],
    mutationFn: createPayment,
    ...config,
  });
};
