import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const restoreAgent = async (data: { partner: string; agent: string }) => {
  const response = await axios.post('admin/restore-agent', data);
  return response.data;
};

type MutFnType = typeof restoreAgent;

export const useRestoreAgentApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['restore-agent'],
    mutationFn: restoreAgent,
    ...config,
  });
};
