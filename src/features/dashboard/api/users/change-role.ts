import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface IChangeroleForm {
  user: string;
  role: string;
}

export const changeRole = async (data: IChangeroleForm) => {
  const response = await axios.post<ApiResponse<any>>(
    'admin/upsert-roles',
    data
  );
  return response.data;
};

type MutationFnType = typeof changeRole;

export const usechangeroleApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['create-role'],
    mutationFn: changeRole,
    ...config,
  });
};
