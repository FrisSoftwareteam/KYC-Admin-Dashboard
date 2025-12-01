import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface CreateBulkVerificationRequest {
  url: string;
  verificationType: string;
}
export const createBulkVerification = async (
  data: CreateBulkVerificationRequest
) => {
  const baseUrl = 'businesses/upload';
  const url =
    data.verificationType === 'address'
      ? `${baseUrl}/bulk-address`
      : data.verificationType === 'identity'
        ? `${baseUrl}/bulk-identity`
        : '';
  const response = await axios.post<ApiResponse<any>>(url, data);
  return response.data;
};

type MutationFnType = typeof createBulkVerification;

export const useCreateBulkVerificationApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['create-bulk-verification'],
    mutationFn: createBulkVerification,
    ...config,
  });
};
