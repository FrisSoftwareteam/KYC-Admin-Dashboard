import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';
import { ICreateverification } from '../types/verifications/create-verification';

export const createVerification = async (data: ICreateverification) => {
  const response = await axios.post<ApiResponse<any>>(
    'businesses/verifications',
    data
  );
  return response.data;
};

type MutationFnType = typeof createVerification;

export const useCreateVerificationApi = (
  { onClose },
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
      onClose();
      window.location.href = '/verifications';
    },

    retry: false,
    mutationKey: ['create-verification'],
    mutationFn: createVerification,
    ...config,
  });
};
