import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';
import { IPasswordChangeForm } from '../formhandling/initialvalues/change-password';

export interface ICreatePaymentResponse {
  link: string;
  reference: string;
}

export const changePassword = async (data: IPasswordChangeForm) => {
  const response = await axios.put<ApiResponse<any>>(
    'admin/change-password',
    data
  );
  return response.data;
};

type MutationFnType = typeof changePassword;

export const useChangePasswordApi = (
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
    mutationKey: ['create-password'],
    mutationFn: changePassword,
    ...config,
  });
};
