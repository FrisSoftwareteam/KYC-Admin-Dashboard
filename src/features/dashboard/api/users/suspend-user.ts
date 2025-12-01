import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export const suspendUser = async (user: string) => {
  const response = await axios.post<ApiResponse<any>>('admin/suspend-user', {
    user,
  });
  return response.data;
};

type MutationFnType = typeof suspendUser;

export const useSuspendUserApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['suspend-user'],
    mutationFn: suspendUser,
    ...config,
  });
};
