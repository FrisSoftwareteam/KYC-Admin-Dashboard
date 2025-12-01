import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const restoreBusiness = async (data: string) => {
  const response = await axios.post('admin/restore-business', {
    business: data,
  });
  return response.data;
};

type MutFnType = typeof restoreBusiness;

export const useRestoreBusinessApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['restore-business'],
    mutationFn: restoreBusiness,
    ...config,
  });
};
