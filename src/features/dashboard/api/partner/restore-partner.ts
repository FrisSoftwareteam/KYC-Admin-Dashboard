import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const restorePartner = async (data: string) => {
  const response = await axios.post('admin/restore-partner', {
    partner: data,
  });
  return response.data;
};

type MutFnType = typeof restorePartner;

export const useRestorePartnerApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['restore-partner'],
    mutationFn: restorePartner,
    ...config,
  });
};
